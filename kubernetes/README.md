# Kubernetes 

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It is highly portable extensible platform for managing containerized workloads and services, that facilitates both declarative configuration and automation.

![Kubernetes](https://kubernetes.io/images/docs/Container_Evolution.svg)

## Why Kubernetes and What can it do?

Kubernetes mainly helps in the following areas:

- **Service discovery and load balancing:** Kubernetes can expose a container using DNS name or IP address. If traffic to a container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.

- **Storage orchestration:** Kubernetes allows you to automatically mount a storage system of your choice, such as local storages, public cloud providers.

- **Automated rollouts and rollbacks:** You can describe the desired state for your deployed containers using Kubernetes, and it can change the actual state to the desired state at a controlled rate. For example, *you can automate Kubernetes to create new containers for your deployment, remove existing containers and adopt all their resources to the new container.*

- **Automatic bin packing:** You provide Kubernetes with a cluster of nodes that it can use to run containerized tasks. You tell Kubernetes how much CPU and memory (RAM) each container needs. *Say we have have a cluster of 10 nodes and each node has 2GB of RAM and 1 vCPU. Kubernetes automates where each of the pod should reside for best use of this resource.(we specify how much resource each pod requires)*

- **Self-healing:** Kubernetes restarts containers that fail, replaces and reschedules containers when nodes die, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.

- **Batch execution:** In addition to long-running applications, Kubernetes can also manage batch and CI workloads.

- **Horizontal scaling:** You can scale your application up and down with a simple command, with a UI, or automatically based on CPU usage.

## Kubernetes Components

Kubernetes is made up of a number of components that work together to provide the functionality that Kubernetes provides. The main components are:

- **Nodes:** A node is a worker machine in Kubernetes and may be a VM or physical machine, depending on the cluster. Each node has the services necessary to run pods and is managed by the control plane. The services on a node include the container runtime, kubelet and kube-proxy.

> Every cluster has at least one worker node.

- **Pods:** A pod is the smallest deployable unit of computing that you can create and manage in Kubernetes. A pod is a group of one or more containers, with shared storage/network, and a specification for how to run the containers. 

> It is recommended to run only one container per pod. 

## How to use kubernetes in Production environment

First we need to consider the following points:

- **Availability:** High availability includes:
    - Separate the control plane from the worker nodes.
    - Replicate the control plane.