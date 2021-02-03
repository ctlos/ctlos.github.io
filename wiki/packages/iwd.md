---
layout: default
title: Iwd настройка wifi
menus:
  packages:
    title: Iwd wifi
    weight: 2
---

Содержание
{: .text-delta }

1. TOC
{:toc}

[ArchWiki iwd](https://wiki.archlinux.org/index.php/Iwd).

## Установка и использование

```bash
sudo pacman -S iwd wpa_supplicant dhclient

# Смотрим список интерфейсов
iwctl device list

#Сканируем интерфейс
iwctl station wlp5s0 scan

# Список доступных сетей
iwctl station wlp5s0 get-networks

# Подключение с указанием пароля, SSID имя сети
iwctl --passphrase passphrase station device connect "SSID"

dhclient
```

> Дальнейшее подключение происходит автоматически.

## Ручная настройка

> Не обязательно.

Учетные данные Wi-Fi хранятся в `/var/lib/iwd`, точное имя SSID следует использовать, формат: `SSID.psk`.

```bash
[Security]
PreSharedKey=a2a0bf020727b1ea1c0542d16e1ccbbbab791d933e9b92783540257910a15817
Passphrase=password
```

Для создания зашифрованного **psk** используйте `wpa_passhrase`.

```bash
wpa_passphrase my_ssid password
```

Для подключения к сети.

```bash
iwctl station wlp5s0 connect "SSID"

dhclient
```

## Автоматическое включение wifi

Через сервис **systemd**, создайте скрипт для подключенияю

```bash
sudo nano /usr/local/wifi.sh
```

```bash
#!/bin/bash
iwctl station wlan0 connect "SSID"
dhclient
```

Создайте сервис systemd.

```bash
sudo nano /etc/systemd/system/wifi.service
```

```bash
[Unit]
Before=network.target
Wants=network.target

[Service]
ExecStart=/usr/local/wifi.sh

[Install]
WantedBy=default.target
```

## Назначение прав и включение сервиса

```bash
chmod 744 /usr/local/wifi.sh
chmod 664 /etc/systemd/system/wifi.service
systemctl daemon-reload
systemctl enable wifi.service
```
