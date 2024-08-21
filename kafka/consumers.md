# Kafka Consuemrs

The consumer is the process that reads records (messages) from a topic. The consumer is responsible for reading records from the broker. The consumer can also choose to commit the offset of the record. The consumer can also choose to receive acknowledgements from the broker when a record is successfully read.

Consumer and the broker communicate using the **Consumer API**. The consumer receives a record from the broker using the **poll()** method. The poll() method is a synchronous method. This means that the consumer waits for the broker to send the record. The consumer receives the record and processes it. This is called **pull-based**.

> [!Tip]
> As an application developer, we mostly work with the Producer and the Consumer API. We don't need to worry about the internals of the producer and the consumer. Mostly, we need to know how to configure the producer and the consumer.

Natie Language of Kafka is Java. By default, kafka consumer api gives us these classes:

- KafkaConsumer
- ConsumerRecord

## `KafkaConsumer` Class

The `KafkaConsumer` class is given a configuration object. This configuration object is a key-value pair. The configuration object is used to configure the consumer. The configuration object is used to configure the following things:

- **bootstrap servers**: The list of brokers that the consumer uses to establish a connection to the kafka cluster. We don't need to give all the brokers. We can give 2 or 3 brokers.

- **key and value deserializer**: The class that is used to deserialize the key and value. The key and value can be of any type. But the consumer is type-safe. So, we need to deserialize the key and value. The key and value can be deserialized using **JSON**, **Avro**, **Protobuf**, etc.

- **group id**: The id of the consumer group. The consumer group is a group of consumers that read records from the same topic. The consumer group is used to balance the load of the records. The consumer group is used to ensure that each record is read by only one consumer in the group. The consumer group is used to ensure that the order of the records is maintained.

- **enable auto commit**: The flag that is used to enable or disable the auto commit of the offset. If the enable auto commit is true, then the consumer automatically commits the offset of the record. If the enable auto commit is false, then the consumer does not commit the offset of the record. This is called **manual commit**.

- **auto commit interval**: The interval at which the consumer commits the offset of the record. The default auto commit interval is 5000 milliseconds. This means that the consumer commits the offset of the record every 5000 milliseconds. We can increase the auto commit interval to 10000 milliseconds, 20000 milliseconds, etc. This means that the consumer commits the offset of the record every 10000 milliseconds, 20000 milliseconds, etc.

- **session timeout**: The time that the consumer waits before declaring the consumer dead. The default session timeout is 10000 milliseconds. This means that the consumer waits 10000 milliseconds before declaring the consumer dead. We can increase the session timeout to 20000 milliseconds, 30000 milliseconds, etc. This means that the consumer waits 20000 milliseconds, 30000 milliseconds, etc. before declaring the consumer dead.

- **max poll records**: The maximum number of records that the consumer reads from the broker in a single poll. The default max poll records is 500 records. This means that the consumer reads 500 records from the broker in a single poll. We can increase the max poll records to 1000 records, 2000 records, etc. This means that the consumer reads 1000 records, 2000 records, etc. from the broker in a single poll.

> [!Important]
> The consumer then subscribes to the topic. The consumer subscribes to the topic using the **subscribe()** method. The subscribe() method is given the name of the topic. Then the consumer reads gets the records from the broker as a collection of records.

## `ConsumerRecord` Class

The `ConsumerRecord` class is used to read a record. The record is a key-value pair. The key is optional, but the value is mandatory. The key and value can be of any type. But the consumer is type-safe. So, we need to deserialize the key and value. The key and value can be deserialized using **JSON**, **Avro**, **Protobuf**, etc.

> [!Important]
> The `ConsumerRecord` class is instances of records of each message.

As a subscriber, we can do whatever we want with the record. We can process the record, store the record in a database, send the record to another topic, etc.

## Consumer Scaling

> [!Caution]
> Lets say we have multiple producers producing the records. Then Kafka has no problem in distributing the records to the consumers. But, if we have multiple consumers consuming the records, then we need to be careful. In short, consumers need to **scale**.

Say, we have 1 consumer listening from 3 partitions of a topic. Then, if one consumer (same application in a different pod) is added then kafka will automatically try to rebalance the partitions. This is called **rebalancing**. This is done to ensure that each consumer reads from all the consumer is distributed evenly. if we add another instance of the consumer, then kafka will again **rebalance** the partitions, and now each consumer will read from 1 partitions of the topic. Now consider, if we add 4th consumer, then kafka will again **rebalance** the partitions, and the new consumer will be idle. This is because, the topic has only 3 partitions. So, the 4th consumer will be idle. This is called **over partitioning**. Thus kafka and the consumers will talk to each other and decide how to distribute the partitions.

> [!Tip]
> As a developer we don't need to know the internal mechanism of how kafka and the consumers talk to each other. We just need to know how to configure the consumer and to configure the consumer we only need to set the group id and the topic name. Rest of the thins are taken care by kafka.

## Spring boot Kafka support

Standard way to use Kafka in receiving messages is to use the `@KafkaListener` annotation. The `@KafkaListener` annotation is a high-level abstraction of the consumer API. The `@KafkaListener` annotation is given the name of the topic. The `@KafkaListener` annotation is used to receive a record from a topic.

The `@KafkaListener` annotation is given the following parameters:

- **topic**: The name of the topic from which the record is read.
- **groupId**: The id of the consumer group. The consumer group is a group of consumers that read records from the same topic. The consumer group is used to balance the load of the records. The consumer group is used to ensure that each record is read by only one consumer in the group. The consumer group is used to ensure that the order of the records is maintained.

There is also another annotation called `@Retryable` which is used to retry the method if the method fails. The `@Retryable` annotation is given the following parameters:

- **attempts**: The number of attempts that the method is retried. The default number of attempts is 3. This means that the method is retried 2 times if the method fails.

- **backoff**: The time that the method waits before retrying. The default backoff is 1000 milliseconds.

The last annotation is `@dltHandler` which is used to handle the dead letter topic. The `@dltHandler` annotation mostly used for logging the error messages.

## Conclusion

In this portion we have learned about the Kafka Consumers. We have learned about the `KafkaConsumer` class and the `ConsumerRecord` class. We have also learned about the consumer scaling and the Spring boot Kafka support. We have also learned about the `@KafkaListener` annotation, the `@Retryable` annotation, and the `@dltHandler` annotation. We have also learned about the dead letter topic.
