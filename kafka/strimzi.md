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

### Part 1: Simplified Kafka on Kubernetes

In this part, we will deploy a Kafka cluster on Kubernetes using Strimzi. We will deploy a Kafka cluster with a single broker and a single zookeeper.

#### Step 1: Create a namespace (Optional)

Create a namespace to deploy the Kafka cluster:

```bash
kubectl create namespace kafka
```

- Set this namespace to default for kubernetes context:

```bash
kubectl config set-context --current --namespace=kafka
```

#### Step 2: Install Strimzi

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

#### Step 3: Deploy Kafka Cluster

As metioned, we will keep things simple and start of with the following configuration:

- A single node Kafka cluster
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
    replicas: 1
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
```

In this configuration, we have defined a Kafka cluster with a single broker and a single zookeeper. The Kafka cluster is available internally to clients in the same kubernetes cluster. We have not enabled encryption, authentication or authorization. We have also not enabled persistence and are using `emptyDir` volumes. The file can be found at this [link](https://github.com/strimzi/strimzi-kafka-operator/blob/0.43.0/examples/kafka/kafka-ephemeral.yaml)

#### Step 4: Connect to Kafka Cluster

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

#### Step 5: Connect to kafka Cluster using TLS

- Obtain the CA certificate:

```bash
kubectl get secret kafka-cluster-cluster-ca-cert -n kafka -o jsonpath='{.data.ca\.crt}' | base64 --decode > ca.crt
```

- Create a user:

```bash
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaUser
metadata:
  name: test-user
  labels:
    strimzi.io/cluster: kafka-cluster
spec:
  authentication:
    type: tls
  authorization:
    type: simple
    acls:
      # Example consumer Acls for topic my-topic using consumer group my-group
      - resource:
          type: topic
          name: test-topic
          patternType: literal
        operations:
          - Describe
          - Read
        host: "*"
      - resource:
          type: group
          name: test-group
          patternType: literal
        operations:
          - Read
          - Describe
        host: "*"
      # Example Producer Acls for topic my-topic
      - resource:
          type: topic
          name: test-topic
          patternType: literal
        operations:
          - Create
          - Describe
          - Write
        host: "*"
```

- Obtain the client certificate:

```bash
kubectl get secret test-user -n kafka -o jsonpath='{.data.user\.crt}' | base64 --decode > client.crt
kubectl get secret test-user -n kafka -o jsonpath='{.data.user\.key}' | base64 --decode > client.key
```

### Part 2: Exposing Kafka

In this part, we will do the following things:

- Expose Kafka cluster to external application.
- Apply `TLS` encryption to the Kafka cluster.

#### Step 1: Expose Kafka Cluster

To achieve this, we just need to tweak the `Kafka` resource configuration. We need to add a `LoadBalancer` service to expose the Kafka cluster to external applications. The following is the configuration for the Kafka cluster:

```yaml {14-18}
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
      - name: external
        port: 9094
        type: loadbalancer
        tls: false
```
