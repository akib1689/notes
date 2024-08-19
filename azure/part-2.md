# Azure Fundamentals Part 2: Describe Azure architecture and services

## Module 1: Describe Core Architectural components of Azure

**Azure Account Hierarchies:**

In a single Azure account, you can create multiple subscriptions. Each subscription can have multiple resource groups. Each resource group can have multiple resources.

![Azure Account Hierarchies](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/account-scope-levels-9ceb3abd.png)

This hierarchy allows you to manage access, billing, and resources at different levels.

### Task 1: Explore Learn sandbox

- **Azure Sandbox:** A free, temporary Azure environment that you can use to complete exercises in Microsoft Learn.

- Create the sandbox and complete the exercises in the sandbox.

- Get-date equivalent command in bash

  ```bash
  date
  ```

- Get-date equivalent command in PowerShell

  ```powershell
  Get-Date
  ```

- Then run the azure in interactive mode to get the version and upgrade command.

Core components of Azure can be divided into 2 categories:

- Physical infrastructure
- Management infrastructure

### Lesson 1: Describe Azure physical infrastructure

- Datacenters - same as large corporate datacenters.
- Regions - Areas within a geography containing one or more datacenters. This is also known as **Azure Regions**. The datacenters are networkid together with low-latency network connections.

  > [!NOTE]
  > Virtual machine features are only available in certain regions. There are also some global Azure services that don't require a region to be specified. such as Azure DNS and Azure Traffic Manager.

- Availability Zones - Physically separate datacenters within an Azure region. Each availability zone is made up of one or more datacenters equipped with independent power, cooling, and networking. Availability Zones in a region are connected through high-speed, private fiber-optic networks. 

  ![Azure Regions and Availability Zones](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/availability-zones-c22f95a3.png)

  > To ensure resiliency, a minimum of three separate availability zones are present in all availability zone-enabled regions.

  Azure services that support Availability Zones fall into three categories:

  - Zonal services: These are services that you pin to a specific zone. For example, virtual machines and managed disks and IP addresses.

  - Zone-redundant services: These are services that replicate automatically across zones. For example, zone-redundant storage, SQL Database, and Cosmos DB.

  - Non-regional services: Services that are available from Azure geographies and are relilient to zone-wide outages as well as region-wide outages. For example, Azure DNS.

- Region Pairs: Examples Such pairing is West US and East US and South-East Asia with East Asia. These pairs are set up for disaster recovery and data residency requirements.

    ![Azure Region Pairs](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/region-pairs-7c495a33.png)

- Sovereign Regions: These are regions that are dedicated to the government or military. These regions are isolated from the rest of Azure. Such as US DoD Central.

### Lesson 2: Describe Azure management infrastructure

- **Azure Resource and Resource Group:** Resource groups are containers that hold related resources for an Azure solution. A resource group can include resources that are located in different regions.

> [!NOTE]
> Resource groups are not nested. A resource can only belong to one resource group.

- **Azure Subscriptions:** A subscription groups together user accounts and the resources that have been created by those user accounts. Each subscription can have resource groups and resources. This is the billing boundary of the Azure account.

> [!NOTE]
> A Azure account can have multiple subscriptions. A subscription can have multiple resource groups. A resource group can have multiple resources.

- **Azure Management Groups:** A management group is a container that helps you manage access, policy, and compliance for multiple subscriptions. Azure management group provide a lovel of scope above subscriptions.

  > [!NOTE]
  > Management groups are nested.

  > [!NOTE]
  > 10,000 management groups can be created in a single directory.

  > [!NOTE]
  > Management group tree can support up to six level of depth.

  > [!NOTE]
  > Management group and subscription can support only one parent.

  This is useful to create a hierarchy that applies a policy.

## Module 2: Describe Zaure compute and network services

### Lesson 1: Describe Azure virtual machines

This is Infrastructure as a Service (IaaS) offering. You can create and manage virtual machines in Azure.

Ideal choice when we need:

- Total control over the operating system.
- Need to run custom software.
- To use custom hosting configurations.

Scale VMs on Azure:

There are two ways to scale VMs on Azure:

- Scale sets
- Availability sets

**Scale sets:**

Use case: if we simply create multiple VMs with the same purpose we'd need to ensure they were all configured identically and then setup network routing to distribute traffic between them.

Scale sets allow you to create and manage a group of identical, load balanced VMs. You can scale the number of VMs in the scale set manually or automatically (based on the demand or on a defined schedule).

**Availability sets:**

Use case: if we need to ensure that our application is always available.

VM availability sets are designed to ensure that VMs stagger updates and have varied power and network connectivity, preventing from losing all Vms with a single network or power failure.

Availability sets do this by grouping VMs in two ways:

- Update domains
- Fault domains

**Update domains:** The update domain groups VMs that can be rebooted at the same time. This ensures that not all VMs are rebooted at the same time. An update process is given a 30-minute window to complete.

**Fault domains:** The fault domain groups VMs that share a common power source and network switch. This ensures that if a hardware failure occurs, not all VMs are affected. By default, an availability set will split VMs across 3 fault domains.

> [!NOTE]
> There is no additional cost for configuring an availability set. Customer only pay for the VM instances that are created.

**Example scenario of using VMs:**

- During testing and Development: Easily create and manage VMs to test and develop applications (different OS and configurations).

- Running application in the cloud: Better than having an on-premises server. You can scale up or down based on demand.

- Moving to the cloud: Migrate existing (on-premises) applications to Azure VMs. This can be done by creating a Virtual Network and connecting it to the on-premises network.

- Disaster recovery: Create a VM in Azure and replicate the data from on-premises to Azure. In case of a disaster, you can failover to the Azure VM.

- Lift and shift: Migrate existing applications to Azure VMs without changing the code.

#### Task 1: Create a VM in Azure

- Run the following command to create a VM in Azure:

```bash
az vm create --resource-group <Your_Resource_Group> --name <Your_Prefered_name> --image Ubuntu2204 --generate-ssh-keys --admin-username azureuser
```

- Configure Nginx on the VM:

```bash
az vm extension set \
  --resource-group <Your_Resource_Group> \
  --vm-name <Your_VM_Name> \
  --name customScript \
  --publisher Microsoft.Azure.Extensions \
  --version 2.1 \
  --settings '{"fileUris":["https://raw.githubusercontent.com/MicrosoftDocs/mslearn-welcome-to-azure/master/configure-nginx.sh"]}' \
  --protected-settings '{"commandToExecute": "./configure-nginx.sh"}'
```

- By default the VM has all teh port forwarded to the virtual network for that vm. To allow traffic to the VM, you need to open the port in the network security group. Do this step from the azure portal.
Then access the network.

### Lesson 2: Describe Azure virtual desktop

Azure Virtual Desktop is a desktop and app virtualization service that runs on the cloud. It is the only virtual desktop infrastructure (VDI) that delivers simplified management, multi-session Windows 10, optimizations for Office 365 ProPlus, and support for Remote Desktop Services (RDS) environments.

### Lesson 3: Describe Azure containers

VMs has a basic limitation that is Single OS per VM. Containers are a solution to this problem. Containers are a lightweight, portable, and consistent way to run applications across different environments.

Unlike virtual machine the user don't need to manage the host OS the containers are running on. The container image contains the application and all the dependencies.

Container is also rapid to start and stop. This is because the container shares the host OS kernel. This makes the container lightweight and fast.

> [!NOTE]
> The Virtual machine virtualizes the hardware, while the container virtualizes the OS.

**Azure Container Instances (ACI):** Azure Container Instances is the fastest and simplest way to run a container in Azure. This is an exmple of PaaS offering.

**Azure Container Apps:** Difference with ACI is that Azure Container Apps remove the container management piece. They are also PaaS offering. Container apps has an extra benifit such as the ability to incorporate load balancing and auto-scaling.

**Azure Kubernetes Service (AKS):** Azure Kubernetes Service (AKS) is a container orchestration service that simplifies the deployment, management, and operations of Kubernetes. Kubernetes is an open-source system for automating the deployment, scaling, and management of containerized applications.

**Example scenario of using containers:**

- Microservices architecture.
- CI/CD pipeline.

### Lesson 4: Describe Azure functions

Azure Functions is a serverless compute service that lets you run event-triggered code without having to explicitly provision or manage infrastructure.

**Benefits of Azure Functions:**

- Pay only for the time your code runs.
- Automatically scale based on demand.
- Integrate with other Azure services.

> [!Tip]
> One major drawback of Azure Functions is that it has a 5-minute timeout. If your function takes longer than 5 minutes to run, you'll need to use a different service.

> [!Note]
> Another drawback is Cost. Azure Functions are billed based on the number of executions and the execution time. If you have a function that runs frequently and takes a long time to execute, the cost can add up quickly.

**Example scenario of using Azure Functions:**

- When only want to focus on the code and not the infrastructure.

- When you want to run code in response to an event.

- When you want to run code on a schedule.

### Lesson 5: Describe application hosting options

There are multiple ways to host applications in Azure:

- VMs.
- Containers.
- Azure Serverless Functions.

There are also other options such as:

- **Azure App Service:** Azure App Service is a fully managed platform for building, deploying, and scaling web apps. You can build web apps using .NET, .NET Core, Java, Ruby, Node.js, PHP, or Python. This doesn't require you to manage the underlying infrastructure.

> [!NOTE]
> Azure App Service is an HTTP-based service for hosting web applications, REST APIs etc.

Types of Azure App Service:

- Web Apps.
- Mobile Apps.
- API Apps.
- WebJobs.

App service handles most of the infrastructure decisions for the customer. Like: 

- Deployment and management are integrated into the platform.
- Endpoinsts can be secured. 
- Sites can be scaled quickly to handle high traffic loads.
- The built-in load balancing and traffic manager.

### Lesson 6: Describe Azure virtual networking

Azure Virtual Network (VNet) is the fundamental building block for your private network in Azure. VNet enables many types of Azure resources, such as Azure Virtual Machines (VM), to securely communicate with each other, the internet, and on-premises networks.

Provides following networking capabilities:

- Isolation and segmentation.
- Internet connectivity.
- Communication with on-premises networks.
- Communication between resources in the same VNet.
- Traffic filtering and routing.
- Connect virtual networks.

Azure Virtual networking supports both public and private endpoints.

- **Public endpoint:** A public endpoint is an IP address that is accessible over the internet. This is used to access the resources from the internet.

- **Private endpoint:** A private endpoint is an IP address that is accessible only within a VNet. This is used to access the resources within the VNet.

> [!NOTE]
> We can enable incomint connections from the internet by assigning a pulic IP address to an Azure resource, or putting the resource behind a public load balancer.

**Communicate with on-premises resources:**

Azure virtual network can be connected to on-premises network using:

- Point to site virtual private network. In this case the client computer connects to the Azure virtual network using a VPN client.

- Site to site virtual private network. In this case the on-premises VPN devie or gateway connects to the Azure virtual network.

- Azure ExpressRoute. This is a dedicated private connection between the on-premises network and Azure.

**Route network traffic:**

By default Azure routes traffic between the subnets on any connected virtual networks, on-premises networks. We can also control routing and override those settings. as follows:

- User can create custom routing tables that control the flow of traffic between subnets, VNets, and on-premises networks.

- Border Gateway Protocol (BGP) can be used to exchange routes between Azure and on-premises networks.

**Connect Virtual networks:** User can link virtual networks together by using virtual network peering. This allows resources in different virtual networks to communicate with each other. 

### Task 2: Create a virtual network in Azure

- List all available VMs in your resource group:

```bash
az vm list
```

- Get the public IP address of the VM:

```bash
IPADDRESS=$(az vm list-ip-addresses --resource-group <Your_Resource_Group> --name <Your_VM_Name> --query "[].virtualMachine.network.publicIpAddresses[*].ipAddress" --output tsv)
```

- Verify that outside network can't connect to the VM:

```bash
curl --connect-timeout 5 http://$IPADDRESS
```

This will fail showing the connection timeout. We can also verify this by trying to view the VM in the browser.

- List the available network security groups:

```bash
az network nsg list --resource-group <Your_Resource_Group> --query '[].name' --output tsv
```

- Get the network security rules for the network security group:

```bash
az network nsg rule list --resource-group <Your_Resource_Group> --nsg-name <Your_NSG_Name>
```

Easier way to do view this is to run the following command.

```bash
az network nsg rule list --resource-group <Your_Resource_Group> --nsg-name <Your_NSG_Name> --query '[].{Name:name, Priority:priority, Port:destinationPortRange, Access:access}' --output table
```

- Now we will create a network security group rule to allow HTTP traffic to the VM:

```bash
az network nsg rule create --resource-group <Your_Resource_Group> --nsg-name <Your_NSG_Name> --name allow-http --protocol tcp --priority 100 --destination-port-range 80 --access Allow
```

- Verify that the rule is added run the previous command to list the network security group rules.

- Now verify that the outside network can connect to the VM:

```bash
curl --connect-timeout 5 http://$IPADDRESS
```

This will show the HTML content of the default web page.

### Lesson 7: Describe Azure Virtual Private Network (VPN)

A VPN uses an encrypted within another network. This is typically deployed to connect two or more trusted private networks to one another over an untrusted network.

**VPN Gateways:**

A VPN gateway is a specific type of virtual network gateway that is used to send encrypted traffic between an Azure virtual network and an on-premises location over the public internet. This allows following connectivity:

- Site-to-Site VPN: Connect on-premises datacenters to virtual networks.

- Point-to-Site VPN: Connect individual computers to virtual networks.

- Network-to-Network VPN: Connect virtual networks to other virtual networks.

> [!NOTE]
> We can use one VPN gateway in each virtual network. We can also use one gateway to connecto to multiple locations.

**VPN Gateway types:** When creating a VPN gateway, you can choose between two types:

- Policy-based VPN: specify statically the IP address of packets that should be encrypted.
- Route-based VPN: modeled as a virtual tunnel interfaces. This allows dynamic routing. So this is preferred connection methos for on-premises devices. 

> [!NOTE]
> Route-based VPN is more resilient to topology changes.

Use-case for Route-based VPN:

- Connection between virtual networks
- Point-to-Site VPN
- Multisite connection
- Coexistence with ExpressRoute

**High-availability scenarios:**

There are a few waus to maximize the resiliency of your VPN gateway.

- Active-Standby: By default, VPN gateways are deployed as two instances in an active-standby configuration. This means that only one instance is active at a time.

- Active-Active: You can deploy VPN gateways in an active-active configuration. The load is distributed using BGP routing protocol. Here we assign a unique public IP address to each VPN gateway instance, then create separate tunnels from the on-premises VPN device to each public IP address.

### Lesson 8: Describe Azure ExpressRoute

Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection facilitated by a connectivity provider. This connection is called an ExpressRoute circuit. Connectivity can be from an any-to-any (IP VPN) network, a point-to-point Ethernet network, or a virtual cross-connection through a connectivity provider at a co-location facility.

**Benefits of ExpressRoute:**

- Connectivity to Microsoft cloud services across all regions in the geopolitical region.
- Global connectivity to Microsoft services across all regions.
- Dynamic routing between your network and Microsoft over industry-standard protocols (BGP).
- Built-in redundancy in every peering location for higher reliability.

**Express Route Connectivity Models:**

- Cloud Exchange colocation.
- Point-to-point Ethernet connection.
- Any-to-any (IP VPN) connection.
- Directly from ExpressRoute location.

> [!NOTE]
> Main reason behind using ExpressRoute is to have a dedicated, private connection to Azure. This is more secure and reliable than a public internet connection.

### Describe Azure DNS

This is a DNS service for DNS domains that resolution by using Microsoft Azure infrastructure. 

**Benefits of Azure DNS:**

- Reliable and high-performance DNS service.
- Secure DNS service.
- Easy to manage DNS records.
- Customizable DNS virtual networks.
- Alias records.

Azure also supports private DNS domains. This allows you to use your own custom domain names in Azure.

## Module 3: Describe Azure Storage Services

A storage account provides a unique namespace in Azure for clients' data. Azure Storage's data can be accessible from anywhere in the world over HTTP or HTTPS. 

**Types of Redundancy:**

- Locally redundant storage (LRS): Data is replicated within the same datacenter.
- Geo-redundant storage (GRS): Data is replicated to a secondary region.
- Read-access geo-redundant storage (RA-GRS): Data is replicated to a secondary region and is also available for read access.
- Zone-redundant storage (ZRS): Data is replicated across availability zones.
- Geo-zone-redundant storage (GZRS): Data is replicated across availability zones and also to a secondary region.
- Read-access geo-zone-redundant storage (RA-GZRS): Data is replicated across availability zones and also to a secondary region and is also available for read access.

| Type                      | Supported services                                                           | Redundancy Options                     | Usage                                                                                                                                                                        |
|---------------------------|-------------------------------------------------------------------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Standard general-purpose v2 | Blob Storage (including Data Lake Storage), Queue Storage, Table Storage, and Azure Files | LRS, GRS, RA-GRS, ZRS, GZRS, RA-GZRS  | Standard storage account type for blobs, file shares, queues, and tables. Recommended for most scenarios using Azure Storage. If you want support for network file system (NFS) in Azure Files, use the premium file shares account type. |
| Premium block blobs       | Blob Storage (including Data Lake Storage)                                    | LRS, ZRS                              | Premium storage account type for block blobs and append blobs. Recommended for scenarios with high transaction rates or that use smaller objects or require consistently low storage latency.                                |
| Premium file shares       | Azure Files                                                                   | LRS, ZRS                              | Premium storage account type for file shares only. Recommended for enterprise or high-performance scale applications. Use this account type if you want a storage account that supports both Server Message Block (SMB) and NFS file shares. |
| Premium page blobs        | Page blobs only                                                               | LRS                                   | Premium storage account type for page blobs only.                                                                                                                             |

### Lesson 1: Describe Azure Storage Redundancy Options

When deciding which redundancy option is best for The client's data, consider the following factors:

- How The data is replicated in the primary region.
- Wheather the data is replicated to a second region that is geographically distant distant to the primary region.
- Whether the data is available for read access in the secondary region.

**Redundancy in the primary region:**

Data in Azure Storage account is always replicated three times in the primary region. Azure offers 2 options for replicating data in the primary region:

- **Locally redundant storage (LRS):** Data is replicated three times within a storage scale unit in a datacenter. LRS is the least expensive replication option, but it does not protect data from datacenter-level failures.

  ![Locally redundant storage (LRS)](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/locally-redundant-storage-37247957.png)

- **Zone-redundant storage (ZRS):** Data is replicated synchronously across three availability zones in the primary region. ZRS is more expensive than LRS, but it protects data from datacenter-level failures. ZRS offers durability for at lease 12 nines (99.9999999999%) of durability of objects over a given year.

  ![Zone-redundant storage (ZRS)](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/zone-redundant-storage-6dd46d22.png)

**Redundancy across secondary region:**

When the client needs high durability, they can replicate data to a secondary region that is geographically distant from the primary region. Azure offers 2 options for replicating data to a secondary region:

- **Geo-redundant storage (GRS):** Data is replicated to a secondary region that is hundreds of miles away from the primary region. GRS is the least expensive option for replicating data to a secondary region. When creating a storage account, the client can choose the secondary region for the account. The paired secondary region is based on Azure Redion Pairs and can't be changed.

![Geo-redundant storage (GRS)](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/geo-redundant-storage-3432d558.png)

- **Geo-zone-redundant storage (GZRS):** Data in GZRS is copied across three Azure availability Zoned in the primary region and replicated to a secondary region that is hundreds of miles away from the primary region. GZRS is the most expensive option for replicating data to a secondary region. GZRS offers durability for at least 16 nines (99.99999999999999%) of durability of objects over a given year.

![Geo-zone-redundant storage (GZRS)](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/geo-zone-redundant-storage-138ab5af.png)

**Read-access in the secondary region:**

By default the GRS and GZRS replication provides read-write access to the data in the primary region and no access to the data in the secondary region. However, the client can enable read-access to the data in the secondary region by using the RA-GRS or RA-GZRS redundancy options.

> [!Tip]
> Remember that the data in your secondary region may not be up-to-date due to RPO.

### Lesson 2: Describe Azure Storage Services

Azure provides platform includes the following data services:

- **Azure Blobs:** A massively scalable object store for text and binary data. 

Blobs are optimized for storing massive amounts of unstructured data, such as text or binary data. Blobs can be accessed from anywhere in the world via HTTP or HTTPS.

One benifit of using Azure Blob Storage over Disk is that the developer don't need to manage the underlying infrastructure.

Blobs can be used for:
- Serving images or documents directly to a browser.
- Storing files for distributed access.
- Streaming video and audio.
- Storing data for backup and restore, disaster recovery, and archiving.
- Storing data for analysis by an on-premises or Azure-hosted service.

**Blob Storage tiers:**

Azure offers different access tiers for block blobs in Azure Blob Storage:

- **Hot:** Optimized for storing data that is accessed frequently. (images for a website)

- **Cool:** Optimized for storing data that is infrequently accessed and stored for at least 30 days. (invoices for customers)

- **Cold:** Optimized for storing data that is rarely accessed and stored for at least 90 days. (backup data)

- **Archive:** Optimized for storing data that is rarely accessed and stored for at least 180 days with flexible latency requirements. (compliance data)

Considerations to make when choosing a tier:

- Hot and cool access tiers can be set at the account level. The cold and archieve access tiers aren't available at the account level.

- Hot, cool, cold, arvhive tiers can be set at the blob lavel. during or after upload.

- The archive tier has a minimum storage duration of 180 days. If the data is deleted or moved to a different tier before 180 days, early deletion charges may apply.

- The archive tier has a retrieval time of several hours. This is because the data is stored offline.

- **Azure Files:** Manages file shares for cloud or on-premises deployments.

Azure Files offers fully managed file shares in the cloud that are accessible via the industry standard Server Message Block (SMB) protocol. Azure file shares can be mounted concurrently by cloud or on-premises deployments of Windows, Linux, and macOS.

Azure Files key Benefits:

- Shared access.
- Fully managed.
- Secure.
- Resilient.
- Scalable.
- Familiar programmability.

- **Azure Queues:** A messaging store for reliable messaging between application components.

Azure Queue storage is a service for storing large numbers of messages that can be accessed from anywhere in the world via authenticated calls using HTTP or HTTPS. **A single queue message can be up to 64 KB in size**, and a queue can contain millions of messages.

Azure Queue storage is commonly used to create a backlog of work for later processing. For example, a web application might use a queue to send a message to a worker role that performs a time-consuming task, such as image processing.

- **Azure Tables:** A NoSQL store for schema-less storage of structured data.

> [!NOTE]
> This data is structured but not relational.

- **Azure Disks:** Managed disks for Azure Virtual Machines.

Block-level storage volumes that are managed by Azure and used with Azure Virtual Machines. Azure managed disks are the new and recommended disk storage offering for use with Azure Virtual Machines.

### Task 1: Create an Azure Storage blob

This task is done from the Azure portal with UI.

### Lesson 3: Describe Azure data migration options

Azure has 2 options for this:

- Azure migrate.
- Azure Data Box.

**Azure Migrate:** Real time migration of data from on-premise to Azure. This is used for migrating servers, databases, and applications to Azure.

Azure migrate has the following features:

- Unified migration platform.
- Azure migrate tools for assessment and migration.
- Assesment and migration of clients on-prem ingrastructure to Azure.

Integrated tools:

- Azure Migrate: Discovery and assessment.
- Azure Migrate: Server migration.
- Data Migration Assistant.
- Azure Database Migration Service.
- Azure App Service Migration Assistant.
- Azure Data Box.

**Azure Data Box:** This is used for offline data transfer to Azure. This is used for large data transfer to Azure. This is a physical device that is shipped to the customer. The customer can then copy the data to the device and ship it back to Azure. The entire process is secure and encrypted.

Use cases for Azure Data Box:

Data Box is ideally suited for transfering of data sizes larger than 40 TBs.

During import:

- One time data migration.
- Moving a media library from offline tapes to Azure.
- Migrate your VM farm.
- Initial bulk transfer of data to Azure.

During export:

- Disaster recovery.
- Security and compliance.
- Migrate back to on-premises or to another colud.

### Lesson 4: Indentify Azure file movement options

In addition to large scale migration using Azure Data Box, Azure also provides the following options for moving files to and from Azure in small scale:

- AzCopy.
- Azure Storage Explorer.
- Azure File Sync.

**AzCopy:** This is a command-line utility that you can use to copy blobs or files to or from a storage account. This is useful for automating the transfer of data.

**Azure Storage Explorer:** This is a free, standalone app that you can use to work with Azure Storage data on Windows, macOS, and Linux. You can use it to upload and download data to and from Azure Storage. This is a GUI tool.

**Azure File Sync:** This is a service that enables you to centralize your organization's file shares in Azure Files, while keeping the flexibility, performance, and compatibility of an on-premises file server. Azure File Sync transforms Windows Server into a quick cache of your Azure file share. You can use any protocol available on Windows Server to access your data locally, including SMB, NFS, and FTPS.

With Azure file sync the client can:

- Use any protocol that's available on Windows Server to access your data locally.
- Have as many caches as needed.
- Replace a failed local server by installing Azure File Sunc.
- Configure cloud tiering so the most frequently accessed files are stored locally and the rest are stored in Azure.

## Module 4: Describe Azure Identity Access and Security

### Lesson 1: Describe Azure Directory Services

#### Microsoft Entra ID

This is a directory service that enables the client to sign in and access Microsoft cloud applications and cloud-based application that the client has developed. Microsoft Entra ID can also help you maintain on-premises Active Directory deployment.

For on-premises environments, Active Director running on Windown Server provides an identity and access management service. with Microsoft Entra ID, client control the identiry accounts, but Microsoft ensures the availability and security of the service.

**Who Uses Microsoft Entra ID:**

- IT administrators.
- Developers.
- Partners.
- Online service subscribers of Microsoft services.

**What Microsoft Entra ID Provides:**

- Authentication:
  - verify identity to access resources.
  - Self-service password reset.
  - Multi-factor authentication.
  - Smart lockout.
  - Custom list of banned passwords.

- Single sign-on:
  - Access to multiple applications with a single login credential.
  - As a user change roles or leaves the organization, access modifications are tied to that identity, not to the user.

- Application management: Client can manage cloud and on-premises apps by using Microsoft Entra ID. 

- Device management: Along with accounts for individual users, Microsoft Entra ID supports registration of devices. This enables devices to be managed through tools like Microsoft Intune.

**Connecting on-premises Active Directory to Microsoft Entra ID:**

If we have a hybrid cloud model i.e. some resources are on-premises and some are in the cloud, we can connect the on-premises Active Directory to Microsoft Entra ID. This simplifies the management of users and groups.

Tool to connect on-premises Active Directory to Microsoft Entra ID:

- Microsoft Entra Connect: This is a tool that connects on-premises Active Directory to Microsoft Entra ID. This tool is used to sync on-premises Active Directory to Microsoft Entra ID and use features like single sign-on, Multi-factor authentication, and self-service password reset.

**Microsoft Entra Domain Services:**

This is not Domain name Service. This Domain means scope of access. This is a managed domain service that provides group policy, LDAP, and Kerberos/NTLM authentication. This is useful for lift-and-shift scenarios where you want to move applications to Azure without changing the code.

**How does Microsoft Entra Domain Services work:**

when client create a Microsoft Entra Domain Services managed domain, Microsoft creates two domain controllers in the Azure virtual network. These domain controllers are managed by Microsoft. The client can then join VMs to the managed domain. The VMs can be Windows Server or Linux.

### Lesson 2: Describe Azure authentication methods

Diagram to compare security level with convenience:

![Diagram to compare security level with convenience](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/passwordless-convenience-security-30321b4d.png)

**Single Sign-On (SSO):** SSO enables a user to sign in one time and use that credential to access multiple rewources and applications from different providers. This is useful for users who need to access multiple applications. For SSO to work different applications and providers must trust the initial authenticator.

**Multi-factor Authentication (MFA):** MFA is a security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity for a login or other transaction. This is useful for users who need to access sensitive data.

Elements of MFA:

- Something the user knows (password).
- Something the user has (security token).
- Something the user is (biometric verification).

Passwordless authentication: This is a method of authentication that does not require the user to enter a password. This is useful for users who need to access applications quickly and securely.

Microsoft's offering for passwordless authentication:

- Windows Hello for Business.
- Microsoft Authenticator app.
- FIDO2 security keys.

### Lesson 3: Describe Azure external identities

External Identities is a set of capabilities that enables organizations to secure and manage customers and partners. This is useful for organizations that need to provide access to applications and resources to external users.

Here, without needing to provide user your organization's identity, user can bring their own identity. This might be a social media account, a personal email account, or a corporate account. The external user's identity provider manages their identity, while the organization manages access to resources.

### Lesson 4: Describe Azure conditional access

Conditional access is a tool that Microsoft Entra ID uses to allow (or deny) access to resources based on identity signals. This signals include 3 things:

- Who the user is.
- Where the user is.
- What device they are using.

The following diagram shows how conditional access flows:

![Conditional access flow](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/conditional-access-9bd268b8.png)

**When to use conditional access:**

- Require multifactor authentication for users who are accessing resources from outside the corporate network.

- Require access to services only through approved client applications.

- Require users to access only from devices that are compliant with security policies.

- Block access from untrusted locations or sources.

### Lesson 5: Describe Azure role-based access control

Instead of giving permission to an individual user, you can assign permissions to a role, and then add users to that role. This is useful for organizations that need to manage access to resources.

**How is role-based access control applied to resources:**

Role based access control is applied to a scope, which is

- a single resource
- a resource group
- a subscription
- a management group.

The role assignment is inherited by all child resources.

There are 3 types of roles in Azure:

- Observers.
- Contributors. (User managing resources)
- Administrators. (User managing access)

Following figure shows the relationship between the roles:

![Relationship between the roles](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/role-based-access-scope-4b12a8f3.png)

Azure RBAC is hierarchical, meaning that the permissions are inherited from the parent scope. For example, if a user has a role assignment at the subscription level, the user will have the same role assignment at the resource group level.

**How RBAC works:** Azure RBAC is enforced on any action that is initiated for a resource That must be passed through Azure Resource Manager. This includes actions initiated through the Azure portal, Azure CLI, Azure PowerShell, Azure SDKs, and Azure Resource Manager templates.

We access Resource Manager from Azure portal, Azure CLI, Azure PowerShell, and Azure SDKs.

Azure RBAC uses allow model. When you're assigned a role, Azure RBAC allows you to perform actions within the scope of that role. If one role assignment grants you a read role to a resource and a different role assignment grants you a write role to the same resource, you have both read and write permissions.

### Lesson 6: Zero trust model

Zero trust is a security model that assumes breach and verifies each request as though it originates from an uncontrolled network. This is useful for organizations that need to secure their resources.

Guideliens for implementing zero trust:

- Verify explicitly.
- Use least privileged access.
- Assume breach.

> [!NOTE]
> Traditionally, it was assumed that corporate network is safe and anything outside the network is unsafe. Zero trust model assumes that the network is always hostile.

### Lesson 7: Defense in depth

The objective of defense-in-depth is to protect information and prevent it from being stolen by those who aren't authorized to access it. This is useful for organizations that need to secure their resources.

Defense-in-depth is a security strategy that uses multiple layers of security controls to protect resources. **This strategy is based on the principle that a single layer of security is not enough to protect the resources**.

**Elements of defense-in-depth:**

- **Physical security:** This includes locks, security guards, and surveillance cameras.

- **Identity and access management:** This controls access to infrastructure and change control.

  At this layer, it's important to:

  - Control access to infrastructure and change control.
  - Use single sign-on (SSO) and multifactor authentication.
  - Audit events and changes.

- **Perimeter security:** This includes firewalls, intrusion detection systems, and intrusion prevention systems. This layer uses DDoS protection.

- **Network security:** This includes network segmentation, virtual private networks, and secure gateways.

  At this layer, it's important to:

  - Limit communication between resources.
  - Deny by default.
  - Restrict inbound internet access and limit outbound access where appropriate.
  - Implement secure connectivity to on-premises networks.

- **Compute Layer:** This secures access to virtual machines.

  At this layer, it's important to:

  - Secure Access to Virtual Machines.
  - Implement endpoint protection on devices and keep systems up to date.

- **Application security:** This helps ensure that applications are secure and free of security vulnerabilities.

- **Data security:** This controls access to business and customer data that you need to protect.
