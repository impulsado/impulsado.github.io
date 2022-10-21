---
layout: post
title: Spiderfoot
date: 2022-10-18
categories: [Cheatsheet,OSINT]
tags: [Spiderfoot]
---

# [Spiderfoot](https://github.com/smicallef/spiderfoot)
Open source intelligence (OSINT) automation tool. It integrates with just about every data source available and utilises a range of methods for data analysis, making that data easy to navigate.

## Installation
SpiderFoot has an embedded web-server for providing a clean and intuitive web-based interface but can also be used completely via the command-line. It's written in Python 3 and MIT-licensed. It also can be deployed using Docker file.

```bash
wget https://github.com/smicallef/spiderfoot/archive/v4.0.tar.gz
tar zxvf v4.0.tar.gz
cd spiderfoot-4.0
sudo apt install -y python3 pip
pip3 install -r requirements.txt
python3 sf.py -l 127.0.0.1:5001
```

<br/>

## How it works
First you need to navigate to "New Scan", enter the target, and select the mode. Spiderfoot has 4 main modes:
- **All**: All SpiderFoot modules will be enabled (slow) but every possible piece of information about the target will be obtained and analysed.
- **Footprint**: Gain an understanding about the target's network perimeter, associated identities and other information that is obtained through a lot of web crawling and search engine use.
- **Investigate**: Some basic footprinting will be performed in addition to querying of blacklists and other sources that may have information about your target's maliciousness.
- **Passive**:As much information will be gathered without touching the target or their affiliates, therefore only modules that do not touch the target will be enabled.

![Photo](/assets/img/Photos/SpiderFoot-1.png)


You can also specify only the modules you want to use. For example, if you only want information about affiliates, just select those options:

![Photo](/assets/img/Photos/SpiderFoot-2.png)

## Result
Here you can see a graph that shows, with which modules it has obtained more information from the target. Since we have specified a web page, most of the information has to do with the content of the web page and the HTTP Headers.

![Photo](/assets/img/Photos/Spiderfoot-3.png)


## Extra
It has more than 200 modules that are used to search the internet for possible target information. The target can be:
- IP address
- Domain/sub-domain name
- Hostname
- Network subnet (CIDR)
- ASN
- E-mail address
- Phone number
- Username
- Person's name
- Bitcoin address