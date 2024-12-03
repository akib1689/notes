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
      content: 
    - property: og:url
      content: https://akib1689.github.io/Notes/vault/
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
