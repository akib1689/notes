# Deploy Kafka Cluster on Kubernetes

In this article, we will deploy a Kafka cluster on Kubernetes. We will host cloud native Kafka on Kubernetes using Confluent Platform using Confluent.

## Prerequisites

- Kubernetes cluster

## Service Access

When we deploy a regular application, we manage it with a standard deployment. Once up and running, we couple the deployment with a `service` to expose it to the outside world. But, when running kafka, clients need to directly talk to a specific kafka broker, as a particular broker manages the topic and partition that the client (producer or consumer) is interested in. While kafka replicates data to other brokers, producers and consumers must talk to a specific broker to ensure that the data is written and read from the correct partition.

A regular Kubernetes service does not allow for that. Since it acts as a load balancer, it forwards requests in a round-robin pattern so access to a specific broker is not guaranteed. To solve this, we use a `headless service`. A headless service does not have a cluster IP and does not load balance requests. Instead, it returns the IP addresses of all the pods that are part of the service. This way, clients can directly talk to the kafka broker.

## Typical Kafka Component Interaction

A typical Kafka cluster consists of the following components:

- Zookeeper: Manages the Kafka cluster
- Kafka Broker: Manages the partitions
- Kafka Topic: A stream of records

## Hosting options

There are many ways to host Kafka on Kubernetes. Some of the popular ways are:

- Confluent Operator
- Confluent Platform (More modern and cloud native approach of confluent operator)
- Strimzi
- Helm Charts

In this article, we will use Strimzi to host Kafka on Kubernetes.

## Hosting Kafka on Kubernetes using Strimzi

The documentation for this section is taken from the Medium blog post. Later, we will update this section with the official documentation. This is a 4 part blog series and each part can be found in the following links:

- [Part 1](https://itnext.io/kafka-on-kubernetes-the-strimzi-way-part-1-bdff3e451788)
- [Part 2](https://itnext.io/kafka-on-kubernetes-the-strimzi-way-part-2-43192f1dd831)
- [Part 3](https://itnext.io/kafka-on-kubernetes-the-strimzi-way-part-3-19cfdfe86660)
- [Part 4](https://itnext.io/kafka-on-kubernetes-the-strimzi-way-part-4-bf1e651e25b8)

### Pre-requisites

- Kubernetes cluster. (I'm using minikube)
- kubectl
- helm

### Simplified Kafka on Kubernetes

In this part, we will deploy a Kafka cluster on Kubernetes using Strimzi. We will deploy a Kafka cluster with a single broker and a single zookeeper.

#### Create a namespace (Optional)

Create a namespace to deploy the Kafka cluster:

```bash
kubectl create namespace kafka
```

- Set this namespace to default for kubernetes context:

```bash
kubectl config set-context --current --namespace=kafka
```

#### Install Strimzi

To install Strimzi, we will use the helm chart. Add the Strimzi helm chart repository:

```bash
helm repo add strimzi https://strimzi.io/charts/
```

Update the helm chart repository:

```bash
helm repo update
```

Install Strimzi using the helm chart:

```bash
helm install strimzi-operator strimzi/strimzi-kafka-operator
```

#### Deploy Kafka Cluster

As metioned, we will keep things simple and start of with the following configuration:

- A 3 node Kafka cluster
- Available internally to clients in the same kubernetes cluster.
- No encryption, authentication or authorization.
- No persistence (uses `emptyDir` volumes).

To deploy a kafka cluster all we need to do is create a `strimzi` `Kafka` resource. The following is the configuration for the Kafka cluster:

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: kafka-cluster
spec:
  kafka:
    version: 3.8.0
    replicas: 3
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
      default.replication.factor: 1
      min.insync.replicas: 1
      inter.broker.protocol.version: "3.8"
    storage:
      type: ephemeral
  zookeeper:
    replicas: 3
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
```

In this configuration, we have defined a Kafka cluster with a single broker and a single zookeeper. The Kafka cluster is available internally to clients in the same kubernetes cluster. We have not enabled encryption, authentication or authorization. We have also not enabled persistence and are using `emptyDir` volumes. The file can be found at this [link](https://github.com/strimzi/strimzi-kafka-operator/blob/0.43.0/examples/kafka/kafka-ephemeral.yaml)

#### Connect to Kafka Cluster Using Plain Text

For quick testing to play around with Kafka, we can use the following producer and consumer:

```bash
export KAFKA_CLUSTER_NAME=kafka-cluster

kubectl -n kafka run kafka-producer -ti --image=quay.io/strimzi/kafka:0.43.0-kafka-3.8.0 --rm=true --restart=Never -- bin/kafka-console-producer.sh --bootstrap-server $KAFKA_CLUSTER_NAME-kafka-bootstrap:9092 --topic my-topic
```

In a separate terminal, run the following command to start a consumer:

```bash
export KAFKA_CLUSTER_NAME=kafka-cluster

kubectl -n kafka run kafka-consumer -ti --image=quay.io/strimzi/kafka:0.43.0-kafka-3.8.0 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server $KAFKA_CLUSTER_NAME-kafka-bootstrap:9092 --topic my-topic --from-beginning
```

### Securing kafka Cluster using TLS

#### Enable TLS

Add the following configuration to the `Kafka` resource to enable `TLS`. The listener configuration should be present in the following block `spec.kafka.listeners`:

```yaml
listeners:
  - name: plain
    port: 9092
    type: internal
    tls: false
  - name: tls       # [!code highlight]
    port: 9093      # [!code highlight]
    type: internal  # [!code highlight]
    tls: true       # [!code highlight]
```

This configuration will enable the Kafka cluster to listen on port `9093` for `TLS` connections. Now the clients from the same kubernetes cluster can connect to the Kafka cluster using `TLS`.

#### Connect to Cluster using TLS

To connect to the Kafka cluster using `mTLS`, we need to obtain the CA certificate of the cluster and the client certificate. The following are the steps to obtain the certificates:

- Make a separate directory to store the certificates:

```bash
mkdir certs
cd certs
```

- Obtain the CA certificate of the cluster

```bash
kubectl get secret kafka-cluster-cluster-ca-cert -n kafka -o jsonpath='{.data.ca\.crt}' | base64 --decode > ca.crt
```

- Create a `truststore` with the CA certificate:

```bash
keytool -keystore truststore.jks -storepass <YOUR_SECURE_PASSWORD> -alias CARoot -import -file ca.crt -noprompt
```

- Create a `kubernetes` secret with the client certificate:

```bash
kubectl create secret generic test-user-tls \
--from-file=truststore.jks \
--from-literal=password=<YOUR_SECURE_PASSWORD> \
-n kafka
```

#### Configuring Kafka UI to use TLS

To allow kafka UI to access the kafka cluster with TLS, we need to use the client certificate that we generated in the previous step.

- We need to mount a secret in a volume.
- Use the certificate from this volume to connect to the Kafka cluster.

The following is the configuration for the Kafka UI:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kafka-ui
  namespace: kafka
  labels:
    app: kafka-ui
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kafka-ui
  template:
    metadata:
      labels:
        app: kafka-ui
    spec:
      volumes:
        - name: test-user-tls
          secret:
            secretName: test-user-tls
      containers:
        - name: ui
          image: provectuslabs/kafka-ui:latest
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
          resources:
            limits:
              cpu: 500m
              memory: 256Mi
            requests:
              cpu: 100m
              memory: 128Mi
          volumeMounts:
            - name: test-user-tls
              mountPath: "/tmp"
              readOnly: true
          env:
            - name: KAFKA_CLUSTERS_0_NAME
              value: kafka-cluster
            - name: KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS
              value: kafka-cluster-kafka-bootstrap:9093
            - name: KAFKA_CLUSTERS_0_PROPERTIES_SECURITY_PROTOCOL
              value: SSL
            - name: KAFKA_CLUSTERS_0_PROPERTIES_SSL_TRUSTSTORE_LOCATION
              value: /tmp/truststore.jks
            - name: KAFKA_CLUSTERS_0_PROPERTIES_SSL_TRUSTSTORE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: test-user-tls
                  key: password
                  optional: false

```

In this configuration, we have mounted the secret `test-user-tls` in the volume `/tmp`. We have used the client certificate from this volume to connect to the Kafka cluster.

Add this configuration to a file `kafka-ui.yaml` and apply it to the cluster:

```bash
kubectl apply -f kafka-ui.yaml
```

Connect to the Kafka UI using the following command:

```bash
kubectl port-forward deployment/kafka-ui 8080:8080 -n kafka
```

Now you can access the Kafka UI at `http://localhost:8080`.

### Exposing Kafka

In this part, we will do the following things:

- Expose Kafka cluster to external application.
- Apply `TLS` encryption to the Kafka cluster.

#### Expose Kafka Cluster

To achieve this, we just need to tweak the `Kafka` resource configuration. We need to add a `Nodeport` service to expose the Kafka cluster to external applications. The following is the configuration for the Kafka cluster:

```yaml
spec:
  kafka:
    version: 3.8.0
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
      - name: tls
        port: 9093
        type: internal
        tls: true
      - name: external      # [!code highlight]
        port: 9094          # [!code highlight]
        type: nodeport      # [!code highlight]
        tls: false          # [!code highlight]
```

In this configuration, we have added a new listener `external` to the Kafka cluster. This listener listens on port `9094` and is of type `Nodeport`. This listener is not `TLS` enabled.

#### Connect to Kafka Cluster

In this example we will see the docker container way to connect to the Kafka cluster. The following is the configuration for the producer:

- First find the bootstrap server address:

```bash
kubectl get kafka kafka-cluster -o=jsonpath='{.status.listeners[?(@.name=="external")].bootstrapServers}{"\n"}'
```

- Run the producer:

```bash
docker run -ti --rm --network host quay.io/strimzi/kafka:0.43.0-kafka-3.8.0 bin/kafka-console-producer.sh --bootstrap-server <LIST_OF_BOOTSTRAP_SERVERS> --topic my-topic
```

In a separate terminal, run the following command to start a consumer:

```bash
docker run -ti --rm --network host quay.io/strimzi/kafka:0.43.0-kafka-3.8.0 bin/kafka-console-consumer.sh --bootstrap-server <LIST_OF_BOOTSTRAP_SERVERS> --topic my-topic --from-beginning
```

### Enable TLS Encryption for External Access
