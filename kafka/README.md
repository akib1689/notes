# Kafka Introduction

Apache Kafka is a distributed streaming platform that is used publish and subscribe to streams of records. It is designed to be fault-tolerant and scalable. Kafka is used for building real-time data pipelines and streaming applications. It is horizontally scalable, fault-tolerant, and fast.

> [!Tip]
> So, What is an Event?

An event is a record of something that happened in the past. It is a fact. Events are immutable. So, an event is basically a record of 2 things:

- What happened? - Notification
- Description of what happened? - State of the event

In terms of Kafka, an event is a record that is published to a Kafka topic. An event is a key-value pair. The key is optional, but the value is mandatory. In Kafka, the key and value is loosely typed. The key and value can be of any type. But our application (say, producer or consumer is a Java application) is type-safe. This type conversion is known as serialization and deserialization in Kafka. This serialized schema can be **JSON**, **Avro**, **Protobuf**, etc.

Here, we will discuss the following topics:

- [Kafka Architecture](#kafka-architecture)
- [Kafka Components](#kafka-components)
- [Kafka Topics](./topics.md)
- [Kafka Producers](./producers.md)
- [Kafka Consumers](./consumers.md)
- [Kafka Brokers](#kafka-brokers)
- [Kafka Zookeeper](#kafka-zookeeper)
- [Kafka Cluster](#kafka-cluster)
- [Kafka Manager](#kafka-manager)
- [Confluentic Schema Registry](#confluent-schema-registry)
- [Kafka Topics UI](#kafka-topics-ui)

## Kafka Architecture

Our finished architecture will look like this:

![Kafka Architecture](../public/images/kafka-architecture.png)

## Kafka Components

## Kafka Brokers

Kafka is a distributed system. It is a distributed system because it is designed to run on multiple nodes. These nodes are called brokers. A broker is a node in the kafka cluster

So the physical architecture of a kafka cluster is a set of brokers. A broker is a node in the kafka cluster

> [!Important]
> So, kafka brokers are single node (which can be physical or virtual machines) in the kafka cluster running the kafka broker process.

Broker does the following things:

- Manage partitions
- Handle write and read requests
- Manage the replication of the partitions

> [!Tip]
> This broker is kept such simple by design.

## Kafka Zookeeper

## Kafka Cluster

## Kafka Manager

## Confluent Schema Registry

## Kafka Topics UI

## Conclusion
