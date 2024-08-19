# How to create a multi-node cluster in Kubernetes

- First stop the minikube cluster if it is running:

```bash
minikube stop
```

- Delete the minikube cluster:

```bash
minikube delete
```

- Start the cluster with the following command:

```bash
minikube start --nodes 3
```

- Check the status of the cluster:

```bash
kubectl get nodes
```
