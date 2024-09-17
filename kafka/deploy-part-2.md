---
head:
  - - meta
    - property: og:title
      content: Accessing Kafka Cluster on Kubernetes from Outside
  - - meta
    - property: og:description
      content: Learn how to access a Kafka cluster on Kubernetes from outside the cluster.
  - - meta
    - property: og:image
      content: https://akib1689.github.io/Notes/images/kafka-on-kubernetes.png
  - - meta
    - property: og:url
      content: https://akib1689.github.io/Notes/kafka/deploy-part-2
  - - meta
    - name: twitter:card
      content: summary
---

# Accessing Kafka Cluster on Kubernetes from Outside

In this guide, we will learn how to access a Kafka cluster on Kubernetes from outside the cluster. We will use the Strimzi Kafka Operator to deploy a Kafka cluster on Kubernetes.

## Prerequisites

- A Kubernetes cluster
- Kafka cluster deployed using Strimzi Kafka Operator. Follow the guide [Deploying Kafka Cluster on Kubernetes using Strimzi Kafka Operator](/kafka/deploy-part-1) to deploy a Kafka cluster on Kubernetes.

## Available Options

There are multiple ways to access a Kafka cluster on Kubernetes from outside the cluster. Some of the available options are:

1. **NodePort Service**: Expose the Kafka cluster using a NodePort service.
1. **LoadBalancer Service**: Expose the Kafka cluster using a LoadBalancer service.
1. **Ingress**: Expose the Kafka cluster using an Ingress resource.
1. **Route**: Expose the Kafka cluster using a Route resource. (For OpenShift only).

This guide is taken from the following a article series on [Strimzi.io](https://strimzi.io/). The first part of the series can be found [here](https://strimzi.io/blog/2019/04/17/accessing-kafka-part-1/).

## Ingress Resource

In this guide, we will use an Ingress resource to expose the Kafka cluster. Strimzi is tested with the NGINX Ingress Controller. You can use any other Ingress controller as well.

With the Ingress resource, we can expose the Kafka cluster using a domain name. The Ingress resource will route the traffic to the Kafka cluster.

We, need to enable the ssl-passthrough in the Ingress controller. The ssl-passthrough will pass the TLS traffic directly to the backend without decrypting it.

To enable the ssl-passthrough in the NGINX Ingress Controller, set the `--enable-ssl-passthrough` flag in the controller during deployment. As I manage the infrastructure using `OpenTofu`, I have set the flag in the `values.yaml` file.

```hcl
resource "helm_release" "ingress_nginx" {
  name        = "ingress-nginx"
  repository  = "https://kubernetes.github.io/ingress-nginx"
  chart       = "ingress-nginx"
  namespace   = kubernetes_namespace.ns_nginx.metadata[0].name

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/azure-load-balancer-resource-group"
    value = var.resource_group_name
  }

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/azure-load-balancer-ipv4"
    value = var.load_balancer_ip
  }

  set {
    name = "controller.service.externalTrafficPolicy"
    value = "Local"
  }

  # Enable TLS passthrough # [!code highlight]
  values = [
    <<EOF
controller:
  extraArgs:
    enable-ssl-passthrough: ""
EOF
  ]
}
```

> [!CAUTION]
> Don't try to use ingress without the tls portion. It will not work. I have wasted one day to figure out why it is not working.

### Configuring Kafka Cluster using Ingress

1. Follow the guide [Deploying Kafka Cluster on Kubernetes using Strimzi Kafka Operator](/kafka/deploy-part-1) to deploy a Kafka cluster on Kubernetes.

1. In the listener configuration of the Kafka cluster, set this configuration:

  ```yaml
  listeners:
    # Configuration for internal listener
    - name: plain
      port: 9092
      type: internal
      tls: false
    - name: tls
      port: 9093
      type: internal
      tls: true
    - name: external                          # [!code focus]
      port: 9094                              # [!code focus]
      type: ingress                           # [!code focus]
      tls: true                               # [!code focus]
      configuration:                          # [!code focus]
        bootstrap:                            # [!code focus] 
          host: bootstrap.my-domain.com       # [!code focus]
        brokers:                              # [!code focus]
          - broker: 0                         # [!code focus]
            host: broker-0.my-domain.com      # [!code focus]
          - broker: 1                         # [!code focus]
            host: broker-1.my-domain.com      # [!code focus]
          - broker: 2                         # [!code focus]
            host: broker-2.my-domain.com      # [!code focus]
        class: nginx                          # [!code focus]
  ```

**Explanation**:

- The `external` listener is used to expose the Kafka cluster using an Ingress resource.
- In the ingress resouce the `configuration` section is a required field. If we use `ingress` type.
- The `bootstrap` host is the domain name that will be used to connect to the Kafka cluster.
- The `brokers` section contains the list of brokers with their domain names.
- The `class` field specifies the Ingress controller class. In this case, we are using the NGINX Ingress Controller.

### Connecting to Kafka Cluster

- After applying the changes, There should be an Ingress resource created in the Kubernetes cluster. Check the Ingress resource using the following command:

```bash
kubectl get ingress -n kafka
```

- The Obtaining of certificates can be done using the following [process](./deploy-part-1.md#obtaining-certificates).

- To connect to the Kafka cluster, use the following command:

```bash
kafka-console-producer.sh --broker-list bootstrap.my-domain.com:443 --topic my-topic --producer-property security.protocol=SSL --producer-property ssl.truststore.location=/path/to/truststore.jks --producer-property ssl.truststore.password=truststore-password
```

- To consume messages from the Kafka cluster, use the following command:

```bash
kafka-console-consumer.sh --bootstrap-server bootstrap.my-domain.com:443 --topic my-topic --consumer-property security.protocol=SSL --consumer-property ssl.truststore.location=/path/to/truststore.jks --consumer-property ssl.truststore.password=truststore-password
```

## Conclusion

In this guide, we learned how to access a Kafka cluster on Kubernetes from outside the cluster using an Ingress resource. We configured the Kafka cluster to expose it using an Ingress resource and connected to the Kafka cluster using the domain name.