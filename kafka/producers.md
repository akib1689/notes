# Kafka Producers

The producer is the process that publishes records (messages) to a topic. The producer is responsible for choosing which record to assign to which partition within the topic. The producer can also choose to receive acknowledgements from the broker when a record is successfully published.

Producer and the broker communicate using the **Producer API**. The producer sends a record to the broker using the **send()** method. The send() method is an asynchronous method. This means that the producer does not wait for the broker to acknowledge the record. The producer sends the record and moves on to the next record. This is called **fire-and-forget**.

> [!Tip]
> As an application developer, we mostly work with the Producer and the Consumer API. We don't need to worry about the internals of the producer and the consumer. Mostly, we need to know how to configure the producer and the consumer.

Natie Language of Kafka is Java. By default, kafka producer api gives us these classes:

- KafkaProducer
- ProducerRecord

## `KafkaProducer` Class

The `KafkaProducer` class is given a configuration object. This configuration object is a key-value pair. The configuration object is used to configure the producer. The configuration object is used to configure the following things:

- **bootstrap servers**: The list of brokers that the producer uses to establish a connection to the kafka cluster. We don't need to give all the brokers. We can give 2 or 3 brokers.

- **key and value serializer**: The class that is used to serialize the key and value. The key and value can be of any type. But the producer is type-safe. So, we need to serialize the key and value. The key and value can be serialized using **JSON**, **Avro**, **Protobuf**, etc.

- **acks**: The number of acknowledgements that the producer requires from the broker. The acks can be 0, 1, or all. If the acks is 0, then the producer does not wait for the broker to acknowledge the record. This is called **fire-and-forget**. If the acks is 1, then the producer waits for the leader to acknowledge the record. If the acks is all, then the producer waits for the leader and all the followers to acknowledge the record. This is called **acknowledgement**.

- **retries**: The number of retries that the producer does if the record is not published to the broker. The default number of retries is 0. This means that the producer does not retry if the record is not published to the broker. We can increase the number of retries to 1, 2, or 3. This means that the producer retries 1, 2, or 3 times if the record is not published to the broker.

- **batch size**: The number of records that the producer sends to the broker in a single batch. The default batch size is 16384 bytes. This means that the producer sends 16384 bytes of records to the broker in a single batch. We can increase the batch size to 32768 bytes, 65536 bytes, etc. This means that the producer sends 32768 bytes, 65536 bytes, etc. of records to the broker in a single batch.

- **linger time**: The time that the producer waits before sending the records to the broker. The default linger time is 0 milliseconds. This means that the producer sends the records to the broker immediately. We can increase the linger time to 100 milliseconds, 200 milliseconds, etc. This means that the producer waits 100 milliseconds, 200 milliseconds, etc. before sending the records to the broker.

- **buffer memory**: The total amount of memory that the producer uses to buffer the records before sending them to the broker. The default buffer memory is 33554432 bytes. This means that the producer uses 33554432 bytes of memory to buffer the records before sending them to the broker. We can increase the buffer memory to 67108864 bytes, 134217728 bytes, etc. This means that the producer uses 67108864 bytes, 134217728 bytes, etc. of memory to buffer the records before sending them to the broker.

## `ProducerRecord` Class

The `ProducerRecord` class is used to create a record. The record is a key-value pair. The key is optional, but the value is mandatory. The key and value can be of any type. But the producer is type-safe. So, we need to serialize the key and value. The key and value can be serialized using **JSON**, **Avro**, **Protobuf**, etc.

The `ProducerRecord` class is given the following parameters:

- **topic**: The name of the topic to which the record is published.

- **key**: The key of the record. The key is optional.

- **value**: The value of the record. The value is mandatory.

## Spring boot Kafka support

Standard way to use Kafka in sending messages is to use the KafkaTemplate class. The KafkaTemplate class is a high-level abstraction of the producer API. The KafkaTemplate class is given a configuration object.

The KafkaTemplate class is used to send a record to a topic. The KafkaTemplate class is given the following parameters:

> [!Warning]
> This need funthur study to continue
