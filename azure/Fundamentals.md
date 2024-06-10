<!-- collapsible board -->

# Azure Fundamentals

## Azure Fundamentals: Introduction

### Part 1: Describe Cloud Computing

#### Lesson 1: Introduction to Cloud Computing

**Cloud Computing:** Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet (“the cloud”) to offer faster innovation, flexible resources, and economies of scale. You typically pay only for cloud services you use, helping you lower your operating costs, run your infrastructure more efficiently, and scale as your business needs change.

#### Lesson 2: Describe the shared responsibility model

With shared responsibility model the different security responsibility is shared with cloud provider and the consumer. 

**The cloud provider is responsible** for providing Physical security, power, cooling, network connectivity are the responsibility of the cloud provider. 

**The consumer is responsible** for the data and the information that is stored in the cloud. The consumer is also responsible for the access security, identity and access management, data encryption.

**Important terms:** IaaS, PaaS, SaaS

**IaaS:** Infrastructure as a Service. puts most of the responsibility on the consumer. Example: when we rent a virtual machine

**PaaS:** Platform as a Service. The cloud provider is responsible for the platform and the consumer is responsible for the data. Example: Azure SQL Database

**SaaS:** Software as a Service. Puts most of the responsibility on the cloud provider. Example: Office 365

#### Lesson 3: Define cloud models

There are three cloud models:
1. Private Cloud
1. Public Cloud
1. Hybrid Cloud

**Private Cloud:** The cloud resources are used exclusively by a single business or organization. 

**Public Cloud:** The cloud resources are owned and operated by a third-party cloud service provider, such as Microsoft Azure.

**Hybrid Cloud:** The cloud resources are a combination of public and private cloud resources.

<!-- table -->
| Public Cloud | Private Cloud | Hybrid Cloud |
|--------------|---------------|--------------|
No capital expenditure to scale up | Organizations have more control over their data | Provides greater flexibility and more deployment options |
Applications can be quickly provisioned and deprovisioned | Data is not collected with other organizations | Organizations deermine where to run their applications |
Organizations pay only for what they use | Hardware must be purchased for startup and maintenance | Organizations control security, compliance, or legal requirements |
Organizations don't have control over rewources and security | Organizations are responsible for hardware maintenance and updates | |

**Multi-cloud:** The use of multiple cloud computing services in a single architecture.

**Important tools:** Azure Arc, Azure VMware Solution, Azure Stack - These helps to manage different cloud resources. either solely on Azure or on-premises or hybrid structure.

#### Lesson 4: Describe the consumption based model

When managing IT services, There are two types of costs:
1. Capital expenditure (CapEx)
1. Operational expenditure (OpEx)

**Capital expenditure (CapEx):** The upfront costs of purchasing physical hardware and software.

**Operational expenditure (OpEx):** The ongoing costs of running IT services, such as utility bills, rent, and salaries.

**Consumption-based model:** In a consumption-based model, you pay for cloud services as you use them. This model is an operational expenditure (OpEx) because you pay for the services you use, rather than for the hardware and software you purchase upfront.

### Part 2: Benefits of Cloud Computing

**Benefits of Cloud Computing:** Cloud computing offers a number of benefits, including:

- Availability
- Scalability
  - Vertical scaling: Increasing the resources of a virtual machine
  - Horizontal scaling: Increasing the number of virtual machines
- Reliability
- Predictability
- Performance
- Cost
- Security and compliance

**Important terms:** Total Cost of Ownership (TCO), Service Level Agreement (SLA)


### Part 3: Describe cloud services types

Learn about how each cloud service type offers flexibility and how the shared responsibility model applies to each.

#### Lesson 1: Describe Infrastructure as a Service (IaaS)

- Most flexible cloud service type
- Provides most amount of control
- Cloud provider is responsible for:
  - Maintaining the hardware
  - Network connectivity
  - Physical Security
- Consumer is responsible for:
  - Operating system
  - Installation of software
  - Configuration
  - Maintenance.

Basically IaaS is like renting a virtual machine and what we do with it is our responsibility.

**Example Scenario:** 
- **Lift and Shift:** Say we have a physical datacenter in our on-prem environment and we want to move it to the cloud. We can use IaaS to create a virtual machine and move the data to the cloud.
- **Testing and development:** We can use IaaS to create a virtual machine and test our applications.

#### Lesson 2: Describe Platform as a Service (PaaS)

Middle ground between IaaS and SaaS. Think of PaaS as a domain joined machine i.e. IT maintains the device with regular updates, patches and refreshes.

- Cloud provider is responsible for:
  - Everything present in IaaS
  - Operating system
  - Middleware
  - Development tools

In a PaaS model, we don't have to worry about the licensing or patching for operating systems and databases.

Well suited for complete development environment without the headache of maintaining all the development infrastructure.

**Example Scenario:**
- **Development framework:** We can use PaaS to create a application using built-in software components with high availability and scalability **multi-tenant** capability.

- **Analytics or business intelligence:** We can use PaaS to create a data warehouse and run analytics on it.

#### Lesson 3: Describe Software as a Service (SaaS)

Most complete cloud service model from a product perspective. In SaaS, we are renting or using a fully developed application. 

- Least flexible (least control).
- Easiest to get up and running. It requires the least amount of technical knowledge or expertise.

In SaaS, the cloud provider is responsible for everything. The consumer is responsible for the data that client puts in the application and the devices that client allow to connect to the system and the users that have access. 

**Example Scenario:**
- Email and messaging
- Business productivity applications.
- Finance and expense tracking.

> If we rent a VM then install docker then run Mattermost in that machine then it is IaaS. If we rent the Postgres database and an web application server and run Mattermost in that then it is PaaS. If we rent the Mattermost application using application gateway then it is SaaS.

