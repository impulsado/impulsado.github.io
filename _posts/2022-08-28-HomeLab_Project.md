---
layout: post
title: homeLab Project
date: 2022-08-27
categories: [HomeLab]
tags: [docker,raspberry_pi]
---
# homeLab Project
This is my documentation for my homeLab project.

<br/>

## Overview
### Hardware
| Name              | Price     |
|-------------------|-----------|
| Raspberry Pi      | 80€       |
| 32 GB MicroSD     | 12€       |
| 1 TB HDD          | 50€       |


### Services
#### System
| Icon | Service | Description |
|:---|:---|---:|
| | [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome) | |
| | [Dynamic DDNS](https://www.youtube.com/watch?v=rI-XxnyWFnM&ab_channel=NetworkChuck) | |

#### Docker
| Icon | Service | Description |
|:---|:---|---:|
| | [Homer](https://github.com/bastienwirtz/homer) | |
| | [Nextcloud](https://github.com/nextcloud/docker) | |
| | [NGINX Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager) | |
| | [Protainer](https://www.portainer.io/) | |
| | [Samba](https://hub.docker.com/r/dperson/samba) | |
| | [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | |
| | [WireGuard](https://github.com/WeeJeWel/wg-easy) | |

<br/>

## Further Investigations
- [ ] NFTables Firewall
- [ ] SSL Certificates

<br/>

## Initial configuration
Since these steps are fairly simple, I will give a short summary of my process before installing anything:
1. [Install](https://youtu.be/y45hsd2AOpw) O.S. to the Raspberry Pi.
2. Execute my [Post Installation Script](https://notes.impulsado.org/posts/Post_Installation_Script_Debian_Ubuntu/)
3. Assign static IP address to the Raspberry.

<br/>

# Installing & Configuring AdGuard Home
[Explanation]

1. Execute the following command to install AdGuard Home:
```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

2. Navigate to AdGuard Home Administrator Dashboard and finish the setup. (IP:3000)
![Photo](/assets/img/Photos/Snipaste_2022-08-29_21-04-38.png)

3. Now it's time to configure AdGuard Home. First, we will setup our device and test that AdGuard is working properly.
To configure your device, navigate to "Setup Guide" in the Header.
![Photo](/assets/img/Photos/Snipaste_2022-08-29_21-17-02.png)

## Installing Docker & Portainer
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

<br/>

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

## Sources
- **Pi-Hosted Project:** https://github.com/novaspirit/pi-hosted
- **Self-Hostred Docker setups:** https://github.com/abhilesh/self-hosted_docker_setups