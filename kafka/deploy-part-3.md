---
head:
  - - meta
    - property: og:title
      content: Attaching persistent storage to Kafka cluster on Kubernetes
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

# Attaching persistent storage to Kafka cluster on Kubernetes

In this guide, we will learn how to attach persistent storage to a Kafka cluster on Kubernetes. We will use the Strimzi Kafka Operator to deploy a Kafka cluster on Kubernetes.

## Prerequisites

- A Kubernetes cluster

## Available Options

There are multiple ways to attach persistent storage to a Kafka cluster on Kubernetes. Most of the guide will focus on attaching persistent storage to the Kafka brokers or zookeeper nodes in a dynamic way. However, in this guide, we will attach persistent storage to the Kafka brokers in a static way. That is we will create `persistent volumes` and `persistent volume claims` on a specific storage disk that was previously created.

This guide is not taken from anywhere I believe, However, If you think this guide is taken from somewhere, please let me know. I'll give the proper credits.

## Creating storage disk

Before attaching persistent storage to the Kafka brokers, we need to create a storage disk. We will use the `Azure Disk` as the storage disk. You can use any other storage disk as well. Below is the `Azure Disk` resource definition of `OpenTofu`. However you can create the storage disk using the Azure portal as well.

```hcl
# Azure Managed Disk for Kafka Broker volumes
resource "azurerm_managed_disk" "kafka_disk" {
    count = var.kafka_broker_count
    name = "kafka-disk-${count.index}"
    resource_group_name = azurerm_kubernetes_cluster.util_aks.node_resource_group
    location = azurerm_kubernetes_cluster.util_aks.location
    storage_account_type = "Standard_LRS"
    create_option = "Empty"
    disk_size_gb = 8

    tags = {
        environment = "stage"
    }
}

# Azure Managed Disk for Zookeeper volumes
resource "azurerm_managed_disk" "zookeeper_disk" {
    name = "zookeeper-disk"
    resource_group_name = azurerm_kubernetes_cluster.util_aks.node_resource_group
    location = azurerm_kubernetes_cluster.util_aks.location
    storage_account_type = "Standard_LRS"
    create_option = "Empty"
    disk_size_gb = 8

    tags = {
        environment = "stage"
    }
}
```

## Creating a storage class for using previously created disk

After creating the storage disk, we need to create a `storage class` that uses the previously created disk. Below is the `storage class` resource definition given in `yaml` format.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: "kafka-storage-class"
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
```

> [!NOTE]
> The `provisioner` field is set to `kubernetes.io/no-provisioner` because we are not using any dynamic provisioner to create the persistent volumes. We are creating the persistent volumes manually.

## Creating persistent volumes and persistent volume claims

After creating the storage disk, we need to create the `persistent volumes` and `persistent volume claims` for the Kafka brokers. Below is the `persistent volume` and `persistent volume claim` resource definition given in `yaml` format.

### Persistent Volume

```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-broker-0
  labels:
    type: broker-0
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 2Gi
  persistentVolumeReclaimPolicy: Retain
  azureDisk:
    diskURI: /subscriptions/<YOUR-SUBSCRIPTION-ID>/resourceGroups/util-cluster-rg/providers/Microsoft.Compute/disks/kafka-disk-0
    diskName: kafka-disk-0
    kind: Managed
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-zookeeper-3
  labels:
    type: zookeeper
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 8Gi
  persistentVolumeReclaimPolicy: Retain
  azureDisk:
    diskURI: /subscriptions/<YOUR-SUBSCRIPTION-ID>/resourceGroups/util-cluster-rg/providers/Microsoft.Compute/disks/zookeeper-disk
    diskName: zookeeper-disk
    kind: Managed
```

### Persistent Volume Claim

```yaml
# persistent volume claims
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-kafka-0
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi
  selector:
    matchLabels:
      type: broker-0
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-zookeeper-0
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 8Gi
  selector:
    matchLabels:
      type: zookeeper
```

> [!WARNING]
> Important thing to consider here is that the name of the persistent volume claim should match the name expected by the `Strimzi Kafka Operator`. For example, the name of the persistent volume claim for the Kafka broker should be `data-kafka-0` and the name of the persistent volume claim for the zookeeper should be `data-zookeeper-0`. You can use your chosen name for the persistent volume but the claim name should match the expected name.

## Attaching persistent storage to Kafka brokers

After creating the `persistent volumes` and `persistent volume claims`, we need to attach the persistent storage to the Kafka brokers. Below is the `Kafka` resource definition that attaches the persistent storage to the Kafka brokers.

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: kafka-cluster
spec:
  kafka:
    # ... other configurations
    storage:
      type: persistent-claim
      size: 2Gi
      deleteClaim: false
    # ...
  zookeeper:
    # ... other configurations
    storage:
      type: persistent-claim
      size: 8Gi
      deleteClaim: false
    # ... 
```

In the above resource definition, we have set the `storage` type to `persistent-claim` and the `size` to `2Gi` for the Kafka brokers and `8Gi` for the zookeeper nodes. We have also set the `deleteClaim` to `false` so that the persistent volume claim is not deleted when the Kafka cluster is deleted.

> [!NOTE]
> remember to apply the `persistent volume` and `persistent volume claim` resource definitions before applying the `Kafka` resource definition.

## Conclusion

In this guide, we learned how to attach persistent storage to a Kafka cluster on Kubernetes. We created a storage disk using `Azure Disk` and then created the `persistent volumes` and `persistent volume claims` for the Kafka brokers. We attached the persistent storage to the Kafka brokers in a static way. In the next guide, we will learn how to access a Kafka cluster on Kubernetes from outside the cluster.
