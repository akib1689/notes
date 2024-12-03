---
head:
  - - meta
    - property: og:title
      content: Auto Unseal Hashicorp Vault
  - - meta
    - property: og:description
      content: Tutorial on how to auto unseal Hashicorp Vault.
  - - meta
    - property: og:image
      content: https://akib1689.github.io/Notes/images/vault-on-kubernetes.png
    - property: og:url
      content: https://akib1689.github.io/Notes/vault/auto-unseal/
  - - meta
    - name: twitter:card
      content: summary
---

# Auto Unseal Hashicorp Vault

In this section, we will learn how to auto unseal Hashicorp Vault. By default, Vault is sealed when it is started. To unseal Vault, we need to provide the unseal key. In production, we need to automate the unsealing process. In this tutorial, we will learn how to auto unseal Hashicorp Vault using the official Helm chart.

## Available Auto Unseal Options

Vault requires a KMS (Key Management Service) provider for **auto unsealing** the Vault. The following are the available options for auto unsealing Vault:

- AWS KMS
- Azure Key Vault
- GCP Cloud KMS
- HashiCorp's own Transit Secrets Engine. (This is used like a KMS-like solution)

In this tutorial, we will use the **Azure Key Vault** for auto unsealing Vault.

## Prerequisites

- A Kubernetes cluster
- Azure Key Vault instance
- Helm installed on the Kubernetes cluster
- kubectl CLI installed on your local machine

If you can't find how to provision the `Azure Key Vault` instance, you can refer to the [Azure Key Vault](/azure/azure-key-vault) section.

In the next section, we will learn how to auto unseal Hashicorp Vault using the official Helm chart.

## Auto Unsealing Vault

To auto unseal Vault, we need to override the `values.yaml` file of the Helm chart. The `values.yaml` file contains the configuration for the Vault deployment. To auto unseal Vault, follow the steps below:

### Step 1: Create a `override-values.yaml` file

Create a `override-values.yaml` file with the following content:

```yaml
server:
  standalone:
    enabled: true
    config: |
      ui = true
      listener "tcp" {
        tls_disable = 1
        address = "[::]:8200"
        cluster_address = "[::]:8201"
      }
      storage "file" {
        path = "/vault/data"
      }
      seal "azurekeyvault" {
        tenant_id = "AZURE_TENANT_ID"
        client_id = "AZURE_CLIENT_ID"
        client_secret = "AZURE_CLIENT_SECRET"
        vault_name = "VAULT_NAME"
        key_name = "KEY_NAME"
      }
```

In the `override-values.yaml` file above, we are enabling the standalone mode of Vault. We are configuring the Vault to use the `file` storage backend. We are configuring the Vault to use the `azurekeyvault` seal for auto unsealing. We are providing the `tenant_id`, `client_id`, `client_secret`, `vault_name`, and `key_name` for the Azure Key Vault. You need to replace the placeholders with the actual values.

### Step 2: Install Vault with Auto Unseal

To install Vault with auto unseal, run the following command:

```bash
helm install vault hashicorp/vault -f override-values.yaml
```

In the command above, we are installing Vault on Kubernetes using the Hashicorp Helm chart. We are enabling the standalone mode and configuring the Vault to use the `azurekeyvault` seal for auto unsealing.

### Step 3: Verify Auto Unseal

- First check the status of the Vault pod:

```bash
kubectl get pods
```

The output should look like this:

```bash
NAME                                    READY   STATUS    RESTARTS   AGE
vault-0                                 0/1     Running   0          30s
vault-agent-injector-XXXXXXXXXX-XXXXX   1/1     Running   0          30s
```

- Also check the status by running the following command:

```bash
kubectl exec -it vault-0 -- vault status
```

The output should look like this:

```bash
Key                Value
---                -----
Seal Type          shamir
Initialized        false
Sealed             true
Total Shares       0
Threshold          0
Unseal Progress    0/0
Unseal Nonce       n/a
Version            n/a
HA Enabled         false
```

In the output above, the `Sealed` status should be `true`. This means that the Vault is sealed. The `Seal Type` should be `shamir`. The `Initialized` status should be `false`.

- To initialize the Vault, run the following command:

```bash
kubectl exec -it vault-0 -- vault operator init -format=json
```

The output should look like this:

```json
{
  "unseal_keys_b64": [],
  "unseal_keys_hex": [],
  "unseal_shares": 1,
  "unseal_threshold": 1,
  "recovery_keys_b64": [
    "7PtO9Z+aJXD4VsRxzTsFgOK32Zli1cmveiW4ATiv/pNa",
    "gH6bv7mExjG+zFJsYhyYUvgtiLI0f3OY73rzwfv7vp/Q",
    "Vhp/9rRLiPlqLZ+soa5RTRVXAIzhkoPc/i+3Ru1PD32U",
    "NnHp6BcXfXnTwATgdF5fHRpcv82f1q0iUF1LxTgXb6P5",
    "MT//wchIJ2//4eP8/OTTRy0QTNpGYifKFV5PaTz7qja5"
  ],
  "recovery_keys_hex": [
    "ecfb4ef59f9a2570f856c471cd3b0580e2b7d99962d5c9af7a25b80138affe935a",
    "807e9bbfb984c631becc526c621c9852f82d88b2347f7398ef7af3c1fbfbbe9fd0",
    "561a7ff6b44b88f96a2d9faca1ae514d1557008ce19283dcfe2fb746ed4f0f7d94",
    "3671e9e817177d79d3c004e0745e5f1d1a5cbfcd9fd6ad22505d4bc538176fa3f9",
    "313fffc1c848276fffe1e3fcfce4d3472d104cda466227ca155e4f693cfbaa36b9"
  ],
  "recovery_keys_shares": 5,
  "recovery_keys_threshold": 3,
  "root_token": "s.p3L38qZwmnHUgIHR1MBmACfd"
}
```

In the output above, the `unseal_keys_b64` and `unseal_keys_hex` should be empty. The `unseal_shares` and `unseal_threshold` should be `1`. The `recovery_keys_b64` and `recovery_keys_hex` should have the recovery keys. The `recovery_keys_shares` and `recovery_keys_threshold` should be `5` and `3` respectively. The `root_token` should have the root token.

- If we now check the status of the Vault server, it should be unsealed:

```bash
kubectl exec -it vault-0 -- vault status
```

The output should look like this:

```bash
Key                     Value
---                     -----
Seal Type               azurekeyvault
Recovery Seal Type      shamir
Initialized             true
Sealed                  false
Total Recovery Shares   5
Threshold               3
Version                 1.8.1
Build Date              2021-03-31T20:00:00Z
Storage Type            file
Cluster Name            vault-cluster-XXXXXXX
Cluster ID              XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
HA Enabled              false
```

In the output above, the `Seal Type` should be `azurekeyvault`. The `Recovery Seal Type` should be `shamir`. The `Initialized` status should be `true`. The `Sealed` status should be `false`. The `Total Recovery Shares` and `Threshold` should be `5` and `3` respectively.

## Conclusion

In this tutorial, we learned how to auto unseal Hashicorp Vault using the official Helm chart. We used the Azure Key Vault for auto unsealing Vault. We initialized and unsealed the Vault server. We verified the auto unseal process. We also learned how to check the status of the Vault server.
