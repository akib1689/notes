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
- [Kafka Echo System](#kafka-echo-system)
- [Kafka Topics](./topics.md)
- [Kafka Producers](./producers.md)
- [Kafka Consumers](./consumers.md)
- [Kafka Brokers](#kafka-brokers)

## Kafka Architecture

Our finished architecture will look like this:

![Kafka Architecture](../public/images/kafka-architecture.png)

## Installation

To install Kafka, for dev and test environments, it is recommended to use the docker compose file provided by the Kafka team.

```yaml
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.7.0
    container_name: zookeeper
    ports:
      - "22181:2181"
    environment:
      - ZOOKEEPER_CLIENT_PORT=2181
      - ZOOKEEPER_TICK_TIME=2000
      - ZOOKEEPER_SYNC_LIMIT=2
    restart: unless-stopped
    
  kafka:
    image: confluentinc/cp-kafka:7.7.0
    container_name: kafka
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      - KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT
      - KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1

  kafka-ui:
    container_name: kafka-ui
    image: provectuslabs/kafka-ui:latest
    depends_on:
      - kafka
      - zookeeper
    ports:
      - 8090:8080
    environment:
      DYNAMIC_CONFIG_ENABLED: 'true'
    volumes:
      - ./config.yml:/etc/kafkaui/dynamic_config.yaml
```

This docker compose file will start a Kafka cluster with a single broker and a single zookeeper. It will also start a Kafka UI to manage the Kafka cluster.

To start the Kafka cluster, run the following command:

```bash
docker-compose up -d
```

To stop the Kafka cluster, run the following command:

```bash
docker-compose down
```

To access the Kafka UI, open the browser and go to `http://localhost:8090`.

> [!Tip]
> For application running in same network, use `kafka:9092` as the broker address. For application running outside the docker network, use `localhost:29092` as the broker address. For application running in the same network, use `<server-ip>:29092` as the broker address.

## Kafka Echo System

If all we do is produce and consume messages, then its completely fine for our use case. But often we need more than that. We might say that our topics would some specific format or other business requirement. This is where the Kafka Echo System comes into play. The Kafka Echo System is a set of tools that are used to manage the Kafka cluster. The Kafka Echo System is used to manage the topics, the producers, the consumers, the brokers, the zookeeper, etc. These are the tools that has evolved over time to manage the Kafka cluster.

Some of the tools in the Kafka Echo System are:

- Kafka Connect
- Kafka Streams
- Schema Registry or Confluent Schema Registry

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

## Conclution

In this article, we have discussed the introduction of Kafka, what is and event and how it is related to Kafka, Kafka architecture, Kafka Echo System, and Kafka Brokers. In the next article, we will discuss Kafka Topics.
