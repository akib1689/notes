# How to auto mount a Directory at Startup in Ubuntu Server 22.04

## Introduction

In this guide, we will show you how to auto mount a directory at startup in Ubuntu Server 22.04. This will ensure that the directory is mounted automatically every time the system boots up.

## Prerequisites

- A system running Ubuntu Server 22.04
- A directory that you want to auto mount

## Step 1: Create a Directory

First, you will need to create a directory that you want to auto mount you drives to. You can create a new directory using the following command:

```bash
sudo mkdir /mnt/mydata      # my data is taken as an example
```

## Step 2: Find the UUID of the Directory

Next, you will need to find the UUID of the drive partition that you want to auto mount. You can find the UUID of the drive partition using the following command:

```bash
lsblk -o NAME,UUID,FSTYPE,MOUNTPOINT
```

Here we need to know the UUID of the drive partition that you want to auto mount. For my case all of my drives are mounted at `/mnt`

[![lsblk](../public/images/lsblk-output.png)](../public/images/lsblk-output.png)

for other case the mount points will be empty.

## Step 3: Edit the /etc/fstab File

Next, you will need to edit the `/etc/fstab` file to auto mount the directory at startup. You can edit the `/etc/fstab` file using the following command:

```bash
sudo nano /etc/fstab
```

Add the following line at the end of the file:

```bash
UUID=<your-uuid> /mnt/mydata <Drive_type> defaults 0 0
```

for my case the drive type is `ext4`. You can replace `<your-uuid>` with the UUID of the drive partition that you want to auto mount.

## Step 4: Save and Exit

After adding the line, save and exit the file by pressing `Ctrl + X`, followed by `Y`, and then `Enter`.

## Step 5: Test the Configuration

Next, we will test the `fstab` configuration by running the following command:

```bash
sudo findmnt --verify
```

If there are no errors, you can reboot your system to auto mount the directory at startup.

## Conclusion

In this guide, you learned how to auto mount a directory at startup in Ubuntu Server 22.04. You can now easily auto mount any directory at startup in Ubuntu Server 22.04.
