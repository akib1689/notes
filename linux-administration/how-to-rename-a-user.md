# How to rename a user in Linux

## Introduction

In this article, we will learn how to rename a user in Linux. We will also learn how to rename a user's home directory and group.

## Prerequisites

* A system running Linux
* A user account with sudo privileges

## Renaming a user

For renaming a user, we will use the `usermod` command. The `usermod` command is used to modify a user account. We cannot rename a user while the user is logged in. We need to log in as a different user or use the root account to rename a user.

### Creating a new temporary user

Before renaming a user, we will create a new temporary user. We will use this user to log in and rename the user.

- To create a new user, run the following command and follow the prompts to set a password for the new user:

    ```bash
    sudo useradd -m tempuser
    ```
    Here the `-m` option is used to create a home directory for the new user. we can also use the `-d` option to specify the home directory for the new user. As the user is temporary we don't need to specify the home directory or any other shananigans.
- Now we need to add the new user to the `sudo` group so that we can run commands with root privileges. Run the following command to add the new user to the `sudo` group:

    ```bash
    sudo usermod -aG sudo tempuser
    ```
    Here the `-a` option is used to append the `sudo` group to the user's list of supplementary groups. and the `-G` option is used to specify the group to which the user will be added.

    We can also do the same thing with the following command:
    
    ```bash
    sudo adduser tempuser sudo
    ```
    This command will add the user to the `sudo` group.
- Now we will logout and login as the new user. If we don't have a GUI, we can use the `su` command to switch to the new user.

    ```bash
    su - tempuser
    ```
    Here the `-` option is used to start a login shell for the new user. This will load the new user's environment and start a new login session.

### Renaming the user

Now we will rename the user using the `usermod` command. Run the following command to rename the user:

```bash
sudo usermod -l newuser -m -d /home/newuser olduser
```
Here the `-l` option is used to specify the new username. The `-m` option is used to move the contents of the old home directory to the new home directory. The `-d` option is used to specify the new home directory for the user.

### Renaming the group

If we want to rename the group as well, we can use the `groupmod` command. Run the following command to rename the group:

```bash
sudo groupmod -n newgroup oldgroup
```
Here the `-n` option is used to specify the new group name.

### Verifying the changes

We can verify the changes by listing the contents of the `/etc/passwd` and `/etc/group` files. Run the following commands to list the contents of the files:

```bash
cat /etc/passwd
cat /etc/group
```
We can also use the `id` command to verify the changes. Run the following command to display the user and group information:

```bash
id newuser
```
Here the `id` command is used to display the user and group information for the specified user.

## Deleting the temporary user

After renaming the user, we can delete the temporary user. Run the following command to delete the temporary user:

```bash
sudo userdel -r tempuser
```
Here the `-r` option is used to remove the user's home directory and mail spool.

## Conclusion

In this article, we learned how to rename a user in Linux. We also learned how to rename a user's home directory and group. We also learned how to create a new temporary user and delete the temporary user after renaming the user.
