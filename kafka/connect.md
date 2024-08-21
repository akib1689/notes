# Kafka connect

Apache Kafka Connect is a tool for scalably and reliably streaming data between Apache Kafka and other systems. It makes it simple to quickly define connectors that move large collections of data into and out of Kafka. Kafka Connect can ingest entire databases or collect metrics from all your application servers into Kafka topics, making the data available for stream processing with low latency.

From kafka's perspective connect is a producer or a consumer or both. It is a producer because it produces the data from the source system to the kafka topic. It is a consumer because it consumes the data from the kafka topic and writes it to the sink system.

Say if we want to move data from kafka to elastic search, then we just need to write a json file and start the connect. Kafka connect will take care of the rest.

Thus Kafka Connect is a framework that provides scalable and reliable streaming of data between Apache Kafka and other systems.
