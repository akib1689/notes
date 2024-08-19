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
- [Kafka Topics](#kafka-topics)
- [Kafka Producers](#kafka-producers)
- [Kafka Consumers](#kafka-consumers)
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

## Kafka Topics

Kafka's fundamental unit of organizing and storing event is topic. As a developer we create topics to store events. Different type of events are stored in different topics. A topic is a category or feed name to which records are published. Some of us may call the topic as a queue. But, it is not a queue. First reason not to call a kafka topic as a queue is that, queue is highly structured and kafka topic is not. Second reason is that, in a queue, a message is consumed by only one consumer. But in kafka, a message can be consumed by multiple consumers. So, a topic can be thought of as a feed or log. A topic is a category or feed name to which records are published.

Another thing about topic is, they are immutable and durable. Once a record is published to a topic, it cannot be changed. It is immutable. And, once a record is published to a topic, it is stored in the topic for a configurable amount of time. This is called **retention period**. The default retention period is **7 days**. After 7 days, the record is deleted from the topic. But, we can configure the retention period to be infinite. This means that the record will never be deleted from the topic. This will obviously lead to disk space issues. So, we need to be careful while configuring the retention period.

> [!Tip]
> Topics are always multi-subscriber; that is, a topic can have zero, one, or many consumers that subscribe to the data written to it.

### Topic Partitions

As kafka is designed to function as a distributed system, it makes sense to divide the topics into different partitions.

### Topic Replication

## Kafka Producers

## Kafka Consumers

## Kafka Brokers

## Kafka Zookeeper

## Kafka Cluster

## Kafka Manager

## Confluent Schema Registry

## Kafka Topics UI

## Conclusion
