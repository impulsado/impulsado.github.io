---
layout: post
title: homeLab Project Documentation
date: 2022-08-27
categories: [HomeLab]
tags: [docker,raspberry_pi]
---
# homeLab Project Documentation
This is my documentation for my homeLab project.

<br/>

## Further Investigations
- [ ] NFTables Firewall
- [ ] SSL Certificates

<br/>

## Initial configuration
Since these steps are fairly simple, I will give a short summary of my process before installing anything:
1. [Install](https://youtu.be/y45hsd2AOpw) O.S. to the Raspberry Pi.
2. Execute my [Post Installation Script](https://notes.impulsado.org/posts/Post_Installation_Script_Debian_Ubuntu/)
3. Assign static IP address to the Raspberry in your Router.

<br/>

# Install and Configure PiVPN
PiVPN is a free and open-source software suite that sets up a VPN server using OpenVPN server software. It has been designed specifically to run on a low-cost Raspberry Pi.

1. Now executhe the following commands:

```bash
# Update the system
sudo apt update -y && sudo apt upgrade -y

# Install PiVPN
curl -L https://install.pivpn.io | bash
```

![Photo](/assets/img/Photos/Snipaste_2022-09-05_13-03-04.png)
![Photo](/assets/img/Photos/Snipaste_2022-09-05_13-05-27.png)


2. Create a new user and copy the file to the device we want to use it.
> You can use [WinSCP](https://winscp.net/eng/download.php) to copy files.

```bash
# Create user
sudo pivpn -a

# Change permissions to the directory
sudo chown -R pi:pi ~/configs
```

![Photo](/assets/img/Photos/Snipaste_2022-09-06_09-29-35.png)

3. To make this work, we need to create a new Port Forwading rule in our Router:
![Photo](/assets/img/Photos/Snipaste_2022-09-06_09-56-22.png)

<br/>

## Install and Configure AdGuard Home
AdGuard Home is a network-wide software for blocking ads & tracking. After you set it up, it'll cover ALL your home devices, and you don't need any client-side software for that.
It operates as a DNS server that re-routes tracking domains to a “black hole”, thus preventing your devices from connecting to those servers. It's based on software we use for our public AdGuard DNS servers, and both share a lot of code.


1. Execute the following command to install AdGuard Home:

```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

2. Navigate to AdGuard Home Administrator Dashboard and finish the setup. (IP:3000)
![Photo](/assets/img/Photos/Snipaste_2022-08-29_21-04-38.png)

3. Now it's time to configure AdGuard Home. First, we will setup our device and test that AdGuard is working properly.
To configure your device, navigate to "Setup Guide" in the Header.
![Photo](/assets/img/Photos/Snipaste_2022-08-29_21-17-02.png)

4. Once we have checked that, at least, one device is working properly, we will add more blocklists to the filter. Navigate to: Filters > DNS Blocklists > Add Blocklists > Choose from the list.
![Photo](/assets/img/Photos/Snipaste_2022-08-31_18-40-23.png)

5. Select all the options and click Save.

> If you want more domains, you can visit this [web](https://firebog.net/) and copy those URLs into your Blocklists filter.

<br/>

## Install and Configure Docker & Portainer
Most of this project is based on a program called [Docker](https://www.docker.com/), so the first step will be to install it along with Portainer in order to manage it. 

Docker packages software into standardized units called containers that include everything needed for the software to run, including libraries, system tools, code and runtime.
> More information [link](https://docs.docker.com/get-docker/).

1. Execute the following commands:

```bash
# Update the system
sudo apt update -y && sudo apt upgrade -y

# Install Docker
curl -sSL https://get.docker.com | sh

# Enable Docker
sudo systemctl enable --now docker

# Give user permissions to Docker (pi=my username)
sudo usermod -aG docker pi

# Install Portainer
sudo docker run -d -p 9000:9000 -p 9443:9443 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

2. Once installed, open your web browser and navigate to the Protainer Dashboard. 
To do that, you will need to write down the IP:Port. In out case, port is mapped to 9000.
![Photo](/assets/img/Photos/Snipaste_2022-08-28_22-13-53.png)

3. Before installing anything else, let's change the templates shown in "App Templates".
To do that, you will need to change the URL to https://raw.githubusercontent.com/pi-hosted/pi-hosted/master/template/portainer-v2-arm64.json
![Photo](/assets/img/Photos/Snipaste_2022-08-28_22-23-28.png)

4. Finally, let's configure the IP to which the shortcuts will open to point to the raspberry pi (192.168.1.81) and not to its local one (127.0.0.1).
Navigate to Environment > local. In Public IP, write down Raspberry Pi IP.
![Photo](/assets/img/Photos/Snipaste_2022-08-29_07-05-41.png)

<br/>

## Install and Configure Cloudfare DDNS
Dynamic DNS (DDNS) is a service that keeps the DNS updated with a web property's correct IP address, even if that IP address is constantly being updated.
> More information [Link](https://www.cloudflare.com/learning/dns/glossary/dynamic-dns/)

1. Open Cloudfare dashboard and create a new API Token. [Link](https://dash.cloudflare.com/profile/api-tokens)

2. Create a new Token > Create Custom Token.

![Photo](/assets/img/Photos/Snipaste_2022-09-06_11-14-15.png)

3. From the Templates list, select Cloudfare DDNS and configure it:

![Photo](/assets/img/Photos/Snipaste_2022-09-06_11-20-00.png)

4. Finally, check in Cloudfare that we can see our "local" entry pointing to our Public IP.

> We must change the option to DNS Only because we will use NGINX in the future.

![Photo](/assets/img/Photos/Snipaste_2022-09-06_11-22-05.png)


<br/>

## Install and Configure NGINX Reverse Proxy
[TO DO]

<br/>

## Sources
- **Pi-Hosted Project:** https://github.com/novaspirit/pi-hosted
- **Self-Hostred Docker setups:** https://github.com/abhilesh/self-hosted_docker_setups