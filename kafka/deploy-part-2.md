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
  - - meta
    - name: twitter:title
      content: Accessing Kafka Cluster on Kubernetes from Outside
  - - meta
    - name: twitter:description
      content: Learn how to access a Kafka cluster on Kubernetes from outside the cluster.
  - - meta
    - name: twitter:image
      content: https://akib1689.github.io/Notes/images/kafka-on-kubernetes.png
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
