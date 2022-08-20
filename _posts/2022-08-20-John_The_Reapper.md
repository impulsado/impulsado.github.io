---
layout: post
title: John The Reapper
date: 2022-08-20
categories: [Cheatsheet,Password_Cracking]
tags: [Jhon_the_reapper]
---

# John The Reapper
Advanced offline password cracker, which supports hundreds of hash and cipher types, and runs on many operating systems, CPUs, GPUs, and even some FPGAs.

Download [Link](https://github.com/openwall/john)

> Dicctionary Attack
```bash
john --wordlist=/usr/share/wordlists/rockyou.txt hashfile
```

> BruteForce
```bash
john --incremental hashfile
```
