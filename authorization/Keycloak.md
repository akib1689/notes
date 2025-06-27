# Keycloak Authorization Services

In this article we will explore Keycloak's Authorization Services. We will discuss what is Keycloak, what are Authorization Services, and how you can use them to secure your applications.

## General Terminology

Before we dive into Keycloak's Authorization Services, let's first understand some general terminology.

### What is Keycloak?

Keycloak is an open-source Identity and Access Management (IAM) solution that provides Single Sign-On (SSO) and Identity Federation capabilities. It allows you to secure your applications and services by providing authentication, authorization, and user management services.

### What are Authorization Services?

Authorization Services are a set of services that allow you to control access to your applications and services. They provide fine-grained access control by defining policies that specify who can access what resources under what conditions.

## Keycloak Authorization Services

Keycloak provides Authorization Services that allow you to define and enforce access control policies for your applications and services. These services include:

- **Policy Enforcement Point (PEP)**: The PEP is responsible for enforcing access control policies. It intercepts requests to your applications and services and checks if the user has the necessary permissions to access the requested resource.
- **Policy Decision Point (PDP)**: The PDP is responsible for making access control decisions. It evaluates the policies defined for your applications and services and decides whether to allow or deny access to a resource.

### Keycloak specific terminology

- **Resource Server**: A Resource Server is an application or service that hosts protected resources. It is responsible for enforcing access control policies and protecting the resources from unauthorized access. According to OAuth 2.0 terminology, this is the API server that hosts the resources.
- **Resource**: A Resource is an entity that is protected by an access control policy. It can be a URL, an API endpoint, a file, or any other type of data that you want to protect. For instance, you can manage a _Banking Account Resource_ that represents and defines a set of authorization policies for all banking accounts. But you can also have a different resource named _Alice’s Banking Account_, which represents a single resource owned by a single customer, which can have its own set of authorization policies.
- **Scope**: A Scope is a permission that defines what actions a user can perform on a resource. For instance, you can define a _Read_ scope that allows users to read data from a resource, or a _Write_ scope that allows users to write data to a resource.