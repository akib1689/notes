---
head:
  - - meta
    - property: og:title
      content: Attaching Storage to Hashicorp Vault
  - - meta
    - property: og:description
      content: Tutorial on how to attach storage to Hashicorp Vault.
  - - meta
    - property: og:image
      content: 
    - property: og:url
      content: https://akib1689.github.io/Notes/vault/attach-storage/
  - - meta
    - name: twitter:card
      content: summary
---

# Attaching Storage to Hashicorp Vault

In this section, we will learn how to attach storage to Hashicorp Vault. By default, Vault stores its data in-memory. But in production, we need to store the data in a persistent storage. In this tutorial, we will learn how to attach storage to Hashicorp Vault using the official Helm chart.

## Prerequisites

- A Kubernetes cluster
- Helm installed on the Kubernetes cluster
- kubectl CLI installed on your local machine

In the next section, we will learn how to attach storage to Hashicorp Vault using the official Helm chart.

## Types of storage supported by Vault

Vault has 2 of storage. They are:

- Data storage
- Audit storage

### Data storage

Data storage is where Vault stores its data. Vault supports the following data storage backends:

- Consul
- Filesystem
- In-Memory

### Audit storage

Audit storage is where Vault stores its audit logs. Vault supports the same storage backends for audit storage as it does for data storage.

## Attaching storage to Vault

To attach storage to Vault, we need to configure the `values.yaml` file of the Helm chart. The `values.yaml` file contains the configuration for the Vault deployment. To attach storage to Vault, follow the steps below:

### Step 1: Create a `override-values.yaml` file

Create a `override-values.yaml` file with the following content:

```yaml
server:
  dataStorage:
    enabled: true
    size: "10Gi"
    mountPath: "/vault/data"
    storageClass: "standard"
    accessMode: "ReadWriteOnce"
```

To install vault with attached storage, run the following command:

```bash
helm install vault hashicorp/vault -f override-values.yaml
```

In the command above, we are installing Vault on Kubernetes using the Hashicorp Helm chart. We are enabling the data storage and setting the size, mount path, storage class, and access mode. By default, The vault server is configured to start in the stand alone mode. with this config:

```yaml
standalone:
    enabled: "-"

    # config is a raw string of default configuration when using a Stateful
    # deployment. Default is to use a PersistentVolumeClaim mounted at /vault/data
    # and store data there. This is only used when using a Replica count of 1, and
    # using a stateful set. Supported formats are HCL and JSON.

    # Note: Configuration files are stored in ConfigMaps so sensitive data
    # such as passwords should be either mounted through extraSecretEnvironmentVars
    # or through a Kube secret. For more information see:
    # https://developer.hashicorp.com/vault/docs/platform/k8s/helm/run#protecting-sensitive-vault-configurations
    config: |-
      ui = true

      listener "tcp" {
        tls_disable = 1
        address = "[::]:8200"
        cluster_address = "[::]:8201"
        # Enable unauthenticated metrics access (necessary for Prometheus Operator)
        #telemetry {
        #  unauthenticated_metrics_access = "true"
        #}
      }
      storage "file" {
        path = "/vault/data"
      }

      # Example configuration for using auto-unseal, using Google Cloud KMS. The
      # GKMS keys must already exist, and the cluster must have a service account
      # that is authorized to access GCP KMS.
      #seal "gcpckms" {
      #   project     = "vault-helm-dev"
      #   region      = "global"
      #   key_ring    = "vault-helm-unseal-kr"
      #   crypto_key  = "vault-helm-unseal-key"
      #}

      # Example configuration for enabling Prometheus metrics in your config.
      #telemetry {
      #  prometheus_retention_time = "30s"
      #  disable_hostname = true
      #}
```

Here we can see that the storage is configured to use the file storage backend. The path is set to `/vault/data`. This is where Vault will store its data. In the `override-values.yaml` file, we are enabling the data storage and setting the size, mount path, storage class, and access mode. from this default values.

### Step 2: Verify the storage

To verify the storage, we need to check the PVC created by the Helm chart. To check the PVC, run the command below:

```bash
kubectl get pvc
```

It should show the PVC created by the Helm chart. The PVC should have the size, mount path, storage class, and access mode set in the `override-values.yaml` file.

Now, first we need to initialize and unseal the vault server. Follow this guide to initialize and unseal the vault server: [Initializing and Unsealing Vault](./deploy-standalone/#installing-vault-in-standalone-mode)

After you have initialized and unsealed the vault server, you should put some secrets in the vault server. Follow this guide to put secrets in the vault server: [Putting Secrets in Vault](./deploy-standalone/#step-5-put-secrets-in-the-vault)

Now After you have put some secrets in the vault server, you can verify that the data is stored in the PVC. To verify that the data is stored in the PVC, run the command below:

```bash
kubectl exec -it vault-0 -- sh
```

This will open a shell in the `vault-0` pod. To check the data stored in the PVC, run the command below:

```bash
ls /vault/data
```

It should show the data stored in the PVC.

>[!NOTE]
> There is another funny way to verify that data is stored in the PVC. You can delete the vault pod. If the data is stored in the PVC, the data should be available after the pod is recreated by the `statefulset`. Though keep in mind you need to unseal the vault server again after the pod is recreated.

In this section, we learned how to attach storage to Hashicorp Vault using the official Helm chart. We learned how to configure the `override-values.yaml` file to attach storage to Vault. We also learned how to verify the storage by checking the PVC created by the Helm chart.
