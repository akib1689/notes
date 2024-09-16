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

> [!CAUTION]
> Don't try to use ingress without the tls portion. It will not work. I have wasted one day to figure out why it is not working.
