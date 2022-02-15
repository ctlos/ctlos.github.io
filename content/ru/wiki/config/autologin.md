---
title: Автологин
menu:
  wiki:
    parent: "config"
weight: 20
---

## Автологин xinitrc

Автологин с помощью `~/.xinitrc` и автозапуск Х после логина.

В `~/.xinitrc` необходимо прописать запуск DE, WM. В самом конце файла.

```bash
exec openbox-session
```

Добавить в `~/.bashrc`, если используем Zsh, то `~/.zshrc`. Узнать какой у вас шелл, команда: `echo $SHELL`.

```bash
nano ~/.zshrc
```

Добавить наверх, после первой строки `#!/usr/bin/env zsh`.

```bash
[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && exec startx &> /dev/null
```

### Настройка сервиса

Выполнить.

```bash
sudo systemctl enable getty@.service
```

Данная команда создаст файл и запустит systemd сервис, просмотреть.

```bash
cat /etc/systemd/system/getty@tty1.service.d/override.conf
```

Если нет, то создайте вручную.

```bash
sudo mkdir /etc/systemd/system/getty@tty1.service.d
sudo nano /etc/systemd/system/getty@tty1.service.d/override.conf
```

Должно быть так, где `user` - имя вашего пользователя.

```bash
[Service]
ExecStart=
ExecStart=-/usr/bin/agetty --autologin user --noclear %I $TERM
```

Отключите login менеджер (lightdm, gdm, lxdm).

```bash
systemctl disable gdm
```

И удалите, если нужно.

```bash
sudo pacman -R gdm
```

## Автологин sddm

Отредактируйте конфиг.

```bash
sudo nano /etc/sddm.conf
```

И преведите к такому виду. Замените `creio` на имя вашего пользователя.

```bash
[Autologin]
Relogin=false
User=creio
```

## Автологин Lightdm

Замените `creio` на имя вашего пользователя.

```bash
groupadd -r autologin
gpasswd -a creio autologin

groupadd -r nopasswdlogin
gpasswd -a creio nopasswdlogin
```

Отредактируйте конфиг.

```bash
nano /etc/lightdm/lightdm.conf
```

И приведите к такому виду. Замените creio на имя вашего пользователя.

```bash
pam-service=lightdm
pam-autologin-service=lightdm-autologin
autologin-user=creio
autologin-user-timeout=0
session-wrapper=/etc/lightdm/Xsession
```
