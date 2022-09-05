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
[Explanation]

1. First we will need a new subdomain Record on our Cloudfare DNS pointing to our Home Public IP.
![Photo](/assets/img/Photos/Snipaste_2022-08-31_18-52-14.png)

2. Now executhe the following commands:
```bash
# Update the system
sudo apt update -y && sudo apt upgrade -y

# Install PiVPN
curl -L https://install.pivpn.io | bash
```

![Photo](/assets/img/Photos/Snipaste_2022-09-05_13-03-04.png)
![Photo](/assets/img/Photos/Snipaste_2022-09-05_13-05-27.png)
![Photo](/assets/img/Photos/Snipaste_2022-09-05_13-06-22.png)
![Photo](/assets/img/Photos/Snipaste_2022-09-05_13-07-43.png)


3. Now copy the file to the device we want to use it.
> You can use [WinSCP](https://winscp.net/eng/download.php) to copy files.

# Install and Configure AdGuard Home
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

## Install and Configure WireGuard
[Explanation]



2. Go to this Github repository and execute the following commands:
```bash
# Get the script and change permissions
curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh
chmod +x openvpn-install.sh

# Run the script
./openvpn-install.sh
```

3. After executing the script, it will ask some questions about the configuration we want to have. I will show you what you must change:
![Photo](/assets/img/Photos/Snipaste_2022-09-05_12-12-51.png)
![Photo](/assets/img/Photos/Snipaste_2022-09-05_12-15-18.png)



<br/>

## Sources
- **Pi-Hosted Project:** https://github.com/novaspirit/pi-hosted
- **Self-Hostred Docker setups:** https://github.com/abhilesh/self-hosted_docker_setups