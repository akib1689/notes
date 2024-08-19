# CD pipeline

In a basic CI/CD pipeline, The automated workflow consists of the following separate stages:

- **Resource Provisioning**: This stage is responsible for creating the necessary infrastructure for the pipeline to run. This includes creating the necessary virtual machines, containers, or other resources that the pipeline will use. This stage is typically run once at the beginning of the pipeline.

- **Configuration**: This stage is responsible for configuring the resources that were provisioned in the previous stage. This includes setting up the necessary environment variables, installing software, and configuring the resources to work together. This stage is typically run once at the beginning of the pipeline.

- **Build**: This stage is responsible for building the software that is being tested. This includes compiling the code, running tests, and packaging the software. This stage is typically run every time a new version of the software is pushed to the repository.

- **Test**: This stage is responsible for running tests on the software that was built in the previous stage. This includes unit tests, integration tests, and other types of tests. This stage is typically run every time a new version of the software is pushed to the repository.

- **Deploy**: This stage is responsible for deploying the software that was tested in the previous stage. This includes deploying the software to a staging environment, a production environment, or other environments. This stage is typically run every time a new version of the software is pushed to the repository.


This particular discussion is inspired by the following tutorial:

[Module](https://learn.microsoft.com/en-us/training/modules/aks-deployment-pipeline-github-actions/?wt.mc_id=3reg_15558_webpage_reactor)

This module is a part of the following path. Learner should follow this learning path's all module except the helm module to get familiar with the deployment process.

[Learning Path](https://learn.microsoft.com/en-us/training/paths/develop-deploy-applications-kubernetes)

## Resource Provisioning 

One example of the 3 tier architecture is the following:

- Frontend: A web server that serves the web pages to the users.
- Backend: A server that processes the requests from the frontend and interacts with the database.
- Database: A server that stores the data.

Currently we are using terraform to provision the resource. Also one time configuration is also done using terraform. if the provisioning and configuring seems to be complex, we can use the ansible for configuration management. (might be in future)