---
title: Рекомендации
menu:
  wiki:
    parent: "install"
weight: 60
---

## Linux-zen

Установка другого ядра, [Kernels](https://wiki.archlinux.org/index.php/Kernels).

Если у вас карта [nvidia](https://wiki.archlinux.org/index.php/NVIDIA_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)), то драйвер нужно заменить.

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

## Отключить отладку в AUR

Если вы установите пакет из aur, вы получите пакет отладки с целевым пакетом, добавьте '!' в строке `OPTIONS` перед `debug` в `/etc/makepkg.conf`.

```bash
sudo nano /etc/makepkg.conf

OPTIONS=(strip docs !libtool !staticlibs emptydirs zipman purge !debug lto)
```
