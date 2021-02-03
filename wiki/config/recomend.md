---
layout: default
title: Рекомендации
menus:
  config:
    title: Рекомендации
    weight: 2
---

Содержание
{: .text-delta }

1. TOC
{:toc}

## Linux-zen

Установка другого ядра, [Kernels](https://wiki.archlinux.org/index.php/Kernels).

Если у вас карта [nvidia](https://wiki.archlinux.org/index.php/NVIDIA_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)), то драйвер нужно заменить `sudo pacman -S nvidia-390xx-dkms`.

```bash
sudo pacman -S linux-zen linux-zen-headers
sudo mkinitcpio -p linux-zen
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Журнал systemd

Уменьшение размера журнала логов Systemd.

```bash
sudo nano /etc/systemd/journald.conf
```

Раскомментировать и изменить строку.

```bash
SystemMaxUse=50M
```

Перезапустите сервис.

```bash
sudo systemctl restart systemd-journald.service
```

## Disable man-db

Отключаем переодическое увеличение загрузки из-за `man-db.service`.

```bash
sudo systemctl disable man-db.service
sudo systemctl disable man-db.timer
```
