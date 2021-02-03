---
layout: default
title: Установка дополнительных программ
menus:
  packages:
    title: Доп. программы
    weight: 1
---

Содержание
{: .text-delta }

1. TOC
{:toc}

> Некоторые пояснения и рекомендации по использованию.

## Сборка пакетов

Установка пакетов из архивов aur `tar.gz`.

Создать каталог `~/.build` и перейти в него.

```bash
mkdir ~/.build && cd ~/.build
```

Найти нужный пакет на сайте [aur.archlinux.org](https://aur.archlinux.org) и загрузить snapshot.

```bash
wget https://aur.archlinux.org/cgit/aur.git/snapshot/gtk3-mushrooms.tar.gz
```

Распаковываем, переходим в каталог, собираем пакет и устанавливаем.

```bash
tar -xvzf gtk3-mushrooms.tar.gz
cd gtk3-mushrooms
makepkg -sri
```

Если ошибки целостности, можно проигнорировать.

```bash
makepkg -s --skipinteg
```

Проблема с импортом `pgp` ключей. Можно опустить проверку ключом `--skippgpcheck`.

```bash
makepkg -s --skippgpcheck
```

После сборки будет пакет с расширением `имя.pkg.tar.zst` Установить командой.

```bash
sudo pacman -U имя.pkg.tar.zst
```

## Virtualbox

[Arch Wiki Virtualbox](https://wiki.archlinux.org/index.php/VirtualBox_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).

```bash
sudo pacman -S virtualbox
sudo pacman -S virtualbox-host-modules-arch
sudo pacman -S virtualbox-guest-iso

sudo modprobe vboxdrv
sudo gpasswd -a имя_пользователя vboxusers
```

### VirtualBox guest

[Arch Wiki](https://wiki.archlinux.org/index.php/VirtualBox/Install_Arch_Linux_as_a_guest).

Общая директория, на машине.

```bash
mkdir ~/vboxshare
```

Общая директория, на виртуалке. uid и gid пользователя можно узнать командой `id`.

В настройках виртуальной машины добавьте общую директорию, выберите ту что создали ранее `~/vboxshare`. Имя которое будет доступно в виртуалке укажите `vboxshare`.

Настройка гостевых дополнений на виртуалке.

```bash
sudo pacman -S virtualbox-guest-utils
sudo pacman -S virtualbox-guest-iso
```

Systemd сервис в поставке загрузит нужные модули ядра.

```bash
sudo systemctl enable --now vboxservice
```

Добавьте пользователя в группу vboxsf, где `user_name` имя вашего пользователя в виртуальной машине.

```bash
sudo usermod -aG vboxsf user_name
```

Перезапустите виртуальную машину. Командами ниже создайте директорию и смонтируйте в нее.

```bash
mkdir ~/vboxshare
sudo mount -t vboxsf -o uid=1000,gid=1000 vboxshare vboxshare
```

Если вы при создании общей директории выбрали авто подключение, то она уже доступна в `/media/sf_vboxshare` или в `/mnt`. Командой ниже можно перемонтировать в `~/vboxshare`.

```bash
sudo mount -t vboxsf -o uid=1000,gid=1000 vboxshare vboxshare
```

Еще можете попробовать виртуалку от GNOME.

```bash
sudo pacman -S gnome-boxes
```

## Steam

Необходимо раскомментировать репозиторий **multilib** в `/etc/pacman.conf`.

```bash
sudo pacman -S steam ttf-liberation lib32-alsa-plugins lib32-curl
```

[wiki.archlinux.org](https://wiki.archlinux.org/index.php/Steam_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).

Или установите Steam через [Flatpak](/wiki/install/pkg-manager/#flatpak).

## Tor

```bash
sudo pacman -S tor torsocks
```

Запуск, остановка сервиса tor.

```bash
sudo systemctl start tor
sudo systemctl stop tor
```

Запуск через tor.

```bash
torify zsh
torify ssh user@blabla -p 22
```

Проверка ip.

```bash
curl --max-time 10 -w '\n' http://ident.me
```

В firefox используйте расширение FoxyProxy.

> В настройках расширения, Добавить новый SOCKS4, ip: 127.0.0.1, port: 9050

Chromium запустите с флагом.

```bash
chromium --proxy-server='socks://127.0.0.1:9050' &
```

Если tor отказывается работать должным образом попробуйте отредактировать сервис.

```bash
sudo nano /usr/lib/systemd/system/tor.service
```

```bash
[Service]
User=root
Group=root
Type=simple
```

```bash
sudo chown -R root:root /var/lib/tor/
sudo systemctl daemon-reload
sudo systemctl restart tor
```

## Bluetooth

```bash
sudo pacman -S blueman bluez-utils pulseaudio-bluetooth
sudo systemctl enable bluetooth.service
```

## Офисные пакеты

Wps office.

```bash
yay -S wps-office ttf-wps-fonts wps-office-mui-ru-ru wps-office-extension-russian-dictionary --noconfirm
```

Libre office.

```bash
yay -S libreoffice-fresh libreoffice-fresh-ru papirus-libreoffice-theme --noconfirm
```

Openoffice.

```bash
yay -S openoffice openoffice-ru-bin --noconfirm
```

Onlyoffice.

```bash
yay -S onlyoffice-bin --noconfirm
```

## Принтеры

```bash
sudo pacman -S cups cups-filters cups-pdf cups-pk-helper ghostscript gsfonts foomatic-db foomatic-db-engine foomatic-db-ppds foomatic-db-nonfree foomatic-db-nonfree-ppds gutenprint foomatic-db-gutenprint-ppds system-config-printer hplip splix
sudo systemctl enable org.cups.cupsd.service
```
