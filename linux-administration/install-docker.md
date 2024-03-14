# Installing docker in a Linux system

## Introduction
Docker is an open-source platform that automates the deployment, scaling, and management of applications. It does this by encapsulating applications into containers, which are lightweight and portable. Containers allow developers to package an application with all its dependencies and ship it as a single package. This ensures that the application will run on any other machine regardless of any customized settings that machine might have.

In this guide, we will walk through the process of installing Docker on a Linux system.

## Prerequisites

While Docker can be installed on a variety of Linux distributions, the installation process may vary slightly depending on the distribution. In this guide, we will cover the installation process for Ubuntu.

Before you begin, you will need the following:

- A system running a supported version of Ubuntu
- A user account with `sudo` privileges
- Access to a terminal window

## Installation Methods

There are mainly two ways to install Docker on Ubuntu:

1. **Docker-Desktop Bundle:** Docker Engine comes bundled with [Docker Desktop](https://docs.docker.com/desktop/install/linux-install/) providing the quickest and easiest installation method. However, this approach creates a Virtual Machine for managing Docker images and requires certain system-level prerequisites such as KVM support, QEMU version 5.2 or later, a systemd initialization system, and at least 4 GB of RAM.

1. **Docker Engine via apt repository:** This method involves installing only the Docker Engine from the apt repositories. It does not provide a graphical user interface for managing Docker, requiring manual management of Docker graphical interfaces. There are several GUI Docker images available, such as [Portainer](https://www.portainer.io/), which allow you to manage underlying Docker images and containers graphically. However, without one, we will need to manage the container through the terminal. 

In this guide, we will cover the installation of Docker Engine via the apt repository.

## Installing Docker Engine via apt repository

To install Docker Engine via the apt repository, follow these steps:

1. Update the system's package index:

   ```bash
   sudo apt update
   ```

1. Install the necessary packages to allow `apt` to use a repository over HTTPS:

   ```bash
    sudo apt-get install ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    ```

1. Add Docker's official GPG key:

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
   ```

1. Add the repository to the apt source:

   ```bash
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

1. Update the package index again:

   ```bash
    sudo apt update
    ```

1. Install Docker Engine:

   ```bash
   sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

1. Verify that Docker Engine is installed correctly by running the `hello-world` container:

   ```bash
    sudo docker run hello-world
    ```

If the installation was successful, you will see a message indicating that Docker Engine is installed and running.

## Managing Docker as a non-root user

By default, Docker requires root privileges to run. However, you can add your user to the `docker` group to allow it to run Docker commands without using `sudo`. To do this, run the following command:

```bash
sudo usermod -aG docker $USER
```

After running this command, you will need to log out and log back in for the changes to take effect. or you can run the following command to apply the changes immediately:

```bash
newgrp docker
```

## Conclusion

You have successfully installed Docker Engine on your Ubuntu system. You can now use Docker to create, deploy, and manage containers on your system. For more information on how to use Docker, refer to the [official documentation](https://docs.docker.com/get-started/).
