---
head:
  - - meta
    - property: og:title
      content: Hashicorp Vault in Standalone Mode
  - - meta
    - property: og:description
      content: A brief introduction to deploying Hashicorp Vault in Standalone Mode.
  - - meta
    - property: og:image
      content: https://akibur-rahman.com/notes/images/vault-on-kubernetes.png
    - property: og:url
      content: https://akibur-rahman.com/notes/vault/deploy-standalone/
  - - meta
    - name: twitter:card
      content: summary
---

# Hashicorp Vault in Standalone Mode

In this section, we will learn how to deploy Hashicorp Vault in standalone mode. We will use the official helm chart to deploy Vault in standalone mode.

> [!WARNING]
> Though this setup is an upgrade from running Vault in development mode, it is not recommended for production use. For production use, it is recommended to use the setup. But it is good enough for staging and testing environments.

## Main drawbacks of running Vault in Development Mode

- **Data Loss**: Data stored in the Vault is not persisted across pod restarts.
- **No Security**: The Vault is unsealed automatically and the root token is displayed in the logs.

The major drawback of running Vault in development mode is that the data stored in the Vault is not persisted across pod restarts. This means that if the pod is restarted, the data stored in the Vault is lost. This is not acceptable even in a staging environment.

## Prerequisites

- A Kubernetes cluster
- Helm installed on the Kubernetes cluster
- kubectl CLI installed on your local machine

In the next section, we will learn how to deploy Hashicorp Vault in standalone mode using the official Helm chart.

## Installing Vault in Standalone Mode

To install Vault in standalone mode, we will use the official Helm chart. The Helm chart provides a simple way to deploy Vault in standalone mode. The Helm chart provides a way to configure Vault using the `override-values.yml` file.

To install Vault in standalone mode, follow the steps below:

### Step 1: Add the Hashicorp Helm repository

To install Vault using Helm, you need to add the Hashicorp Helm repository. To add the Hashicorp Helm repository, run the command below:

```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
```

To verify that the Hashicorp Helm repository has been added, run the command below:

```bash
helm repo list
```

You can also search for the Hashicorp Helm chart by running the command below:

```bash
helm search repo hashicorp/vault
```

### Step 2: Install Vault in Standalone Mode using Helm

First create a file named `override-values.yml` with the following content:

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
```

To install Vault in standalone mode on Kubernetes using Helm, run the command below:

```bash
helm install vault hashicorp/vault --values override-values.yml
```

In the command above, we are installing Vault in standalone mode on Kubernetes using the Hashicorp Helm chart. We are enabling the standalone mode and setting the configuration using the `override-values.yml` file.

Description of the configuration:

- `server.standalone.enabled`: Enables the standalone mode. (The default value is `true` in theory we can omit this, but for the sake of clarity, we are setting it to `true`).
- `server.standalone.config`: The configuration for the standalone mode. The configuration is written in `HCL` language. In the configuration we have done this:
  - `ui = true`: Enables the Vault UI.
  - `listener "tcp"`: Configures the listener for the Vault server.
    - `tls_disable = 1`: Disables TLS.
    - `address = "[::]:8200"`: The address on which the Vault server listens.
    - `cluster_address = "[::]:8201"`: The address on which the Vault server listens for cluster communication.
  - `storage "file"`: Configures the storage backend for the Vault server.
    - `path = "/vault/data"`: The path where the data is stored.

### Step 3: Verify the Installation

To verify that the Vault has been installed successfully, run the command below:

```bash
kubectl get pods
```

The command above will list all the pods in the current namespace. You should see something like this:

```bash
NAME                                    READY   STATUS    RESTARTS   AGE
vault-0                                 0/1     Running   0          30s
vault-agent-injector-XXXXXXXXXX-XXXXX   1/1     Running   0          30s
```

We can see that the `vault-0` pod is running. This is the Vault server pod. But the pod is not ready yet. The pod is not ready because the Vault server is not unsealed yet.

By default when the Vault server is started, it is sealed. This is a security feature.

> [!TIP]
> To learn more about seal and unseal, refer to the [official documentation](https://developer.hashicorp.com/vault/docs/concepts/seal).

Retrieve ths status of the Vault server by running the command below:

```bash
kubectl exec -it vault-0 -- vault status
```

The command above will show the status of the Vault server. The output will look like this:

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

The output shows that the Vault server is `not initialized` and `sealed`. For Vault to authenticate with kubernetes and manage secrets requires the Vault server to be unsealed.

### Step 4: Unseal the Vault Server

#### UI Method

- First verify that the Vault-UI service is running by running the command below:

```bash
kubectl get svc vault-ui
```

- Now port-forward the Vault-UI service to your local machine by running the command below:

```bash
kubectl port-forward service/vault-ui 8200:8200
```

- To access the Vault UI, open your browser and navigate to `http://localhost:8200`. You will be given this screen:

![Vault UI](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fvault%252Fvault-gs-ui-initialize.png%26width%3D781%26height%3D576&w=1920&q=75&dpl=dpl_8cXWu9Dvoq36bms1GCUGFePCesg3)

- Enter 5 in the `Key Shares` field and 3 in the `Key Threshold` field. Click on the `Initialize` button. You will be given 5 keys and a root token. **Download** and **Save** the keys and the root token in a secure place. The screen should look like this:

![Vault UI](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fvault%252Fvault-gs-ui-initialize-download-keys.png%26width%3D1166%26height%3D619&w=3840&q=75&dpl=dpl_8cXWu9Dvoq36bms1GCUGFePCesg3)

Example of the keys and the root token:

```json
{
  "unseal_keys_b64": [
    "7PtO9Z+aJXD4VsRxzTsFgOK32Zli1cmveiW4ATiv/pNa",
    "gH6bv7mExjG+zFJsYhyYUvgtiLI0f3OY73rzwfv7vp/Q",
    "Vhp/9rRLiPlqLZ+soa5RTRVXAIzhkoPc/i+3Ru1PD32U",
    "NnHp6BcXfXnTwATgdF5fHRpcv82f1q0iUF1LxTgXb6P5",
    "MT//wchIJ2//4eP8/OTTRy0QTNpGYifKFV5PaTz7qja5"
  ],
  "unseal_keys_hex": [
    "ecfb4ef59f9a2570f856c471cd3b0580e2b7d99962d5c9af7a25b80138affe935a",
    "807e9bbfb984c631becc526c621c9852f82d88b2347f7398ef7af3c1fbfbbe9fd0",
    "561a7ff6b44b88f96a2d9faca1ae514d1557008ce19283dcfe2fb746ed4f0f7d94",
    "3671e9e817177d79d3c004e0745e5f1d1a5cbfcd9fd6ad22505d4bc538176fa3f9",
    "313fffc1c848276fffe1e3fcfce4d3472d104cda466227ca155e4f693cfbaa36b9"
  ],
  "unseal_shares": 5,
  "unseal_threshold": 3,
  "recovery_keys_b64": [],
  "recovery_keys_hex": [],
  "root_token": "s.p3L38qZwmnHUgIHR1MBmACfd"
}
```

Click on the `Continue to Unseal` button.

- Enter the `keys` not the `keys_base64` in the `Key` field and click on the `Unseal` button. You will be given this screen:

![Vault UI](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fvault%252Fvault-gs-ui-unseal.png%26width%3D879%26height%3D438&w=1920&q=75&dpl=dpl_8cXWu9Dvoq36bms1GCUGFePCesg3)

- After the unsealing process you will be prompted to Sign in. From the method choose `Token` and paste the `root_token` in the `Token` field. Click on the `Sign in` button.

#### CLI Method

- To initialize the Vault server, run the command below:

```bash
kubectl exec -it vault-0 -- vault operator init -key-shares=5 -key-threshold=3 -format=json
```

The command above will initialize the Vault server. The output will look like this:

```json
{
  "unseal_keys_b64": [
    "7PtO9Z+aJXD4VsRxzTsFgOK32Zli1cmveiW4ATiv/pNa",
    "gH6bv7mExjG+zFJsYhyYUvgtiLI0f3OY73rzwfv7vp/Q",
    "Vhp/9rRLiPlqLZ+soa5RTRVXAIzhkoPc/i+3Ru1PD32U",
    "NnHp6BcXfXnTwATgdF5fHRpcv82f1q0iUF1LxTgXb6P5",
    "MT//wchIJ2//4eP8/OTTRy0QTNpGYifKFV5PaTz7qja5"
  ],
  "unseal_keys_hex": [
    "ecfb4ef59f9a2570f856c471cd3b0580e2b7d99962d5c9af7a25b80138affe935a",
    "807e9bbfb984c631becc526c621c9852f82d88b2347f7398ef7af3c1fbfbbe9fd0",
    "561a7ff6b44b88f96a2d9faca1ae514d1557008ce19283dcfe2fb746ed4f0f7d94",
    "3671e9e817177d79d3c004e0745e5f1d1a5cbfcd9fd6ad22505d4bc538176fa3f9",
    "313fffc1c848276fffe1e3fcfce4d3472d104cda466227ca155e4f693cfbaa36b9"
  ],
  "unseal_shares": 5,
  "unseal_threshold": 3,
  "recovery_keys_b64": [],
  "recovery_keys_hex": [],
  "root_token": "s.p3L38qZwmnHUgIHR1MBmACfd"
}
```

- To unseal the Vault server, run the command below:

```bash
kubectl exec -it vault-0 -- vault operator unseal <key1>
kubectl exec -it vault-0 -- vault operator unseal <key2>
kubectl exec -it vault-0 -- vault operator unseal <key3>
```

Replace `<key1>`, `<key2>`, and `<key3>` with the keys you received when you initialized the Vault server.

Not you have successfully installed and unsealed the vault.

### Step 5: Put Secrets in the Vault

To put secrets in the Vault, first you need to start the secret engine. To start the secret engine, run the command below:

```bash
kubectl exec -it vault-0 -- vault secrets enable -path=secret kv
```

The command above will enable the `kv` secret engine at the path `secret`. You can also do this from the Vault UI.

To put a secret in the Vault, run the command below:

```bash
kubectl exec -it vault-0 -- vault kv put secret/hello foo=world
```

The command above will put a secret in the Vault. The secret is stored at the path `secret/hello` with the key `foo` and the value `world`.

Now you have successfully started a **key-value** secret engine and put a **secret** in the Vault.

## Conclusion

In this section, we learned how to deploy Hashicorp Vault in standalone mode. We used the official Helm chart to deploy Vault in standalone mode. We also learned how to initialize and unseal the Vault server. We also learned how to put secrets in the Vault.
