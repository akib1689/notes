# Deploy Kafka Cluster on Kubernetes

In this article, we will deploy a Kafka cluster on Kubernetes.

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

There are two ways to host a Kafka cluster on Kubernetes:

1. Using the helm chart. Popular helm charts are `bitnami`, `strimzi` and `confluent`. (At the time of writing this article, the confluent helm chart repository is archived and no longer maintained.)
2. Using the Strimzi operator.
