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

> :pushpin: One major drawback of Azure Functions is that it has a 5-minute timeout. If your function takes longer than 5 minutes to run, you'll need to use a different service.

> :pushpin: Another drawback is Cost. Azure Functions are billed based on the number of executions and the execution time. If you have a function that runs frequently and takes a long time to execute, the cost can add up quickly.

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
IPADDRESS=$(az vm list-ip-addresses --resource-group "learn-aa69059a-9fcc-4902-9ad0-ed734bdc4680" --name my-vm --query "[].virtualMachine.network.publicIpAddresses[*].ipAddress" --output tsv)
```

- Verify that outside network can't connect to the VM:

```bash
curl --connect-timeout 5 http://$IPADDRESS
```

This will fail showing the connection timeout. We can also verify this by trying to view the VM in the browser.

- List the available network security groups:

```bash
az network nsg list --resource-group "learn-aa69059a-9fcc-4902-9ad0-ed734bdc4680" --query '[].name' --output tsv
```

- Get the network security rules for the network security group:

```bash
az network nsg rule list --resource-group "learn-aa69059a-9fcc-4902-9ad0-ed734bdc4680" --nsg-name my-vmNSG
```

Easier way to do view this is to run the following command.

```bash
az network nsg rule list --resource-group "learn-aa69059a-9fcc-4902-9ad0-ed734bdc4680" --nsg-name my-vmNSG --query '[].{Name:name, Priority:priority, Port:destinationPortRange, Access:access}' --output table
```

- Now we will create a network security group rule to allow HTTP traffic to the VM:

```bash
az network nsg rule create --resource-group "learn-aa69059a-9fcc-4902-9ad0-ed734bdc4680" --nsg-name my-vmNSG --name allow-http --protocol tcp --priority 100 --destination-port-range 80 --access Allow
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

> We can use one VPN gateway in each virtual network. We can also use one gateway to connecto to multiple locations.

**VPN Gateway types:** When creating a VPN gateway, you can choose between two types:

- Policy-based VPN: specify statically the IP address of packets that should be encrypted.
- Route-based VPN: modeled as a virtual tunnel interfaces. This allows dynamic routing. So this is preferred connection methos for on-premises devices. 

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