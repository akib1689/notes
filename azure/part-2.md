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

    > Resource groups are not nested. A resource can only belong to one resource group.

- **Azure Subscriptions:** A subscription groups together user accounts and the resources that have been created by those user accounts. Each subscription can have resource groups and resources. This is the billing boundary of the Azure account.

    > A Azure account can have multiple subscriptions. A subscription can have multiple resource groups. A resource group can have multiple resources.

- **Azure Management Groups:** A management group is a container that helps you manage access, policy, and compliance for multiple subscriptions. Azure management group provide a lovel of scope above subscriptions.

    > Management groups are nested. 

    > 10,000 management groups can be created in a single directory.

    > Management group tree can support up to six level of depth. 

    > Management group and subscription can support only one parent.

    This is useful to create a hierarchy that applies a policy.


    ## Module 2: Describe Zaure compute and network services