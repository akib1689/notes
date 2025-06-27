---
head:
  - - meta
    - property: og:title
      content: Hashicorp Vault
  - - meta
    - property: og:description
      content: A brief introduction to Hashicorp Vault.
  - - meta
    - property: og:image
      content: https://akibur-rahman.com/notes/images/vault-on-kubernetes.png
    - property: og:url
      content: https://akibur-rahman.com/notes/vault/
  - - meta
    - name: twitter:card
      content: summary
---

# Hashicorp Vault

Vault by HashiCorp is a secrets management and data protection tool designed for securing, storing and controlling access to sensitive data. It provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.

## Features

- **Secure**: Centralized secrets management. At rest the data is encrypted and the security is enforced using access control policies.
- **Dynamic Secrets**: Vault can generate secrets on-demand for some systems, such as AWS or SQL databases.
- **Integrated Authentication**: Vault can integrate with existing identity systems to control access to secrets.
- **Audit Logging**: Detailed audit logs are recorded for all access and changes to secrets.

In this section, we will learn how to deploy Hashicorp Vault on Kubernetes using the official Helm chart. In all the available options. We will use the Helm chart to deploy Vault on Kubernetes.

> [!NOTE]
> **So what are the use cases of Hashicorp Vault?**
>
>
> The main use case for the beginners can be said like this:
>
> - Say our application needs to access a database. We need to store the database credentials (`database_url`, `username`, `password`) right!
>   - We can't store these credentials in the application code right? Cause from `Git` or `Docker` image, anyone can see the credentials.
>   - Then we can store them as an environment variable in the `Docker` image. But still, the credentials are in the `Docker` image. Another drawback to this approach is say we have not configured the system component properly and the `Docker` image is exposed to the internet. Or More realistically the container is compromised. Then the credentials are exposed.

In such cases, we can use Hashicorp Vault to store the credentials. The application can request the credentials from the Vault when it needs to access the database. The Vault will authenticate the application and provide the credentials. The only environment variable that is exposed when the container is compromised is the `VAULT_TOKEN`. The application can use this token to authenticate with the Vault and get the credentials. But the intruder can't get the database credentials directly.

## Prerequisites

- A Kubernetes cluster
- Helm installed on the Kubernetes cluster
- kubectl CLI installed on your local machine

In the next section, we will learn how to deploy Hashicorp Vault on Kubernetes using the official Helm chart.

## Installating Vault on Kubernetes

To install Vault on Kubernetes, we will use the official Helm chart. The Helm chart provides a simple way to deploy Vault on Kubernetes. The Helm chart provides a way to configure Vault using the `values.yaml` file.

To install Vault on Kubernetes, follow the steps below:

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

### Step 2: Install Vault using Helm

To install Vault on Kubernetes using Helm, run the command below:

```bash
helm install vault hashicorp/vault --set "server.dev.enabled=true" --set "server.dev.devRootToken=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
```

In the command above, we are installing Vault on Kubernetes using the Hashicorp Helm chart. We are enabling the development mode and setting the development root token.

### Step 3: Accessing the Vault UI

To access the Vault UI, you need to port-forward the Vault service to your local machine. To port-forward the Vault service, run the command below:

```bash
kubectl port-forward service/vault 8200:8200
```

To access the Vault UI, open your browser and navigate to `http://localhost:8200`. You will be prompted to enter the root token. Enter the root token you set in the previous command.

> [!CAUTION]
> This is the development mode of Vault. The development mode is not recommended for production use. The development mode is meant for testing and development purposes only.

In the next section, we will learn how to deploy Vault in production mode on Kubernetes.

## Conclusion

In this section, we learned how to deploy Hashicorp Vault on Kubernetes using the official Helm chart. We also learned how to access the Vault UI and set the root token. In the next section, we will learn how to deploy Vault in production mode on Kubernetes.
