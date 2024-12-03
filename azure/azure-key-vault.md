---
head:
  - - meta
    - property: og:title
      content: Azure Key Vault
  - - meta
    - property: og:description
      content: Tutorial on how to provision an azure key vault using Open Tofu.
  - - meta
    - property: og:image
      content: 
    - property: og:url
      content: https://akib1689.github.io/Notes/azure/azure-key-vault/
  - - meta
    - name: twitter:card
      content: summary
---

# Azure Key Vault

Azure Key Vault is a cloud service for securely storing and accessing secrets. It provides a centralized cloud service for storing application secrets, such as passwords, connection strings, and certificates. Azure Key Vault helps to safeguard cryptographic keys and secrets used by cloud applications and services.

## Prerequisites

- An Azure account with an active subscription.
- OpenTofu installed on your local machine.

In the next section, we will learn how to provision an Azure Key Vault using OpenTofu.

## Provisioning Azure Key Vault

The `hcl` code below provisions an Azure Key Vault using OpenTofu:

```hcl
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "vault" {
  name = "vault-${var.environment}"
  resource_group_name = azurerm_resource_group.default.name
  location = azurerm_resource_group.default.location
  tenant_id = data.azurerm_client_config.current.tenant_id

  sku_name = "standard"

  enabled_for_deployment = true
  enable_rbac_authorization = false
  enabled_for_template_deployment = true
  

  tags = {
    environment = "stage"
    associated_cluster = azurerm_kubernetes_cluster.default_aks.name
  }

  lifecycle {
    ignore_changes = [
      access_policy
    ]
  }
}

resource "azurerm_key_vault_access_policy" "vault_owner_policy" {
  key_vault_id = azurerm_key_vault.vault.id
  tenant_id = data.azurerm_client_config.current.tenant_id
  object_id = data.azurerm_client_config.current.object_id

  key_permissions = [
    "Backup",
    "Create",
    "Decrypt",
    "Delete",
    "Encrypt",
    "Get",
    "Import",
    "List",
    "Purge",
    "Recover",
    "Restore",
    "Sign",
    "UnwrapKey",
    "Update",
    "Verify",
    "WrapKey",
    "Release",
    "Rotate",
    "GetRotationPolicy",
    "SetRotationPolicy"
  ]

  secret_permissions = [
    "Get",
    "List",
    "Set",
    "Delete",
    "Backup",
    "Restore",
    "Recover",
  ]
}

resource "azurerm_key_vault_key" "vault_seal_key" {
  name = "vault-seal-key"
  key_vault_id = azurerm_key_vault.vault.id

  key_type = "RSA"
  key_size = 4096

  key_opts = [
    "wrapKey",
    "unwrapKey"
  ]

  depends_on = [
    azurerm_key_vault_access_policy.vault_owner_policy
  ]
}
```

The code above provisions an Azure Key Vault with the following configurations:

- The name of the Azure Key Vault is `vault-${var.environment}`.
- The SKU name is `standard`.
- The Azure Key Vault is enabled for deployment and template deployment.
- The access policy is set to the current user.
- The key vault access policy is set to the current user.
- A key named `vault-seal-key` is created with the key type `RSA` and key size `4096`. The key is enabled for `wrapKey` and `unwrapKey` operations.

All the available configuration options can be found from the providers documentation.
