---
layout: default
title: Ctlos iso
post_photo_path: ctlosiso.png
menu:
  wiki:
    title: Ctlos iso
    parent: "other"
weight: 10
---

## Создание iso образа

[YouTube link](https://www.youtube.com/watch?list=PLwdYMSK64DT6CCheHMbaqlOzpqfk2FTvT&v=XNpAXthDbrI) Старое видео, но многое объясняет.

* [Github README](https://github.com/ctlos/ctlosiso/blob/master/README.md) — быстрый способ.

### Подготовка

Установить пакеты для сборки.

```bash
yay -S git archiso mkinitcpio-archiso --noconfirm --needed
```

> Для сборки необходимо подключить локально [ctlos_repo](https://ctlos.github.io/wiki/install/ctlos-repo/), или изменить под себя pacman.conf и пакеты.

Задействован [chaotic](https://aur.chaotic.cx/) репозиторий, проще всего его установить, через yay из aur.

```bash
yay -S chaotic-keyring chaotic-mirrorlist --noconfirm --needed
```

### Локальный репозиторий

> Нужен в том случае, если вы хотите, что-то собрать и добавить из aur.

Создание директории и клонирование репозитория ctlos. Еще немного о [лакальном репо](https://wiki.archlinux.org/index.php/Archiso#Custom_local_repository).

```bash
mkdir ~/ctlos
cd ~/ctlos
git clone https://github.com/ctlos/ctlos_repo
```

Или ssh.

```bash
git clone git@github.com:ctlos/ctlo_repo.git
```

### Сборка aur пакетов

Найти нужный пакет на сайте аур [aur.archlinux.org](https://aur.archlinux.org) и загрузить snapshot вида `*.tar.gz`.

Собираем пакеты в `build`.

```bash
mkdir ~/ctlos/ctlos_repo/build
cd ~/ctlos/ctlos_repo/build
wget https://aur.archlinux.org/cgit/aur.git/snapshot/gtk3-mushrooms.tar.gz
```

Распаковываем и собираем пакет.

```bash
tar -xvzf gtk3-mushrooms.tar.gz
cd gtk3-mushrooms
makepkg -s
```

Копируем собраные пакеты в `~/ctlos/ctlos_repo/x86_64`, инициализируем репозиторий. Пакеты в формате `*.pkg.tar.xz`, или `zst`.

```bash
cd ~/ctlos/ctlos_repo/x86_64
repo-add ctlos_repo.db.tar.zst *.tar.zst
```

Или.

```bash
./update.sh --add
```

После добавления новых пакетов из aur необходимо переинициализировать репозиторий.(Удалить файлы баз данных), или запустить скрипт `update.sh` он сам все пересоздаст.

```bash
repo-add ctlos_repo.db.tar.zst *.tar.xz

repo-add ctlos_repo.db.tar.zst *.pkg.tar.zst
```

Или.

```bash
./update.sh --add
```

### Репозиторий iso

Клонируем репозиторий. Ветка master по умолчанию.

```bash
cd ~/ctlos
git clone --depth=1 https://github.com/ctlos/ctlosiso
```

> Добавляем пользовательский репозиторий для aur пакетов. В `/ctlos/ctlosiso/pacman.conf`. Замнените `user_name` на имя пользователя от которого работаете.

```bash
[ctlos_repo]
SigLevel = Optional TrustAll
Server = file:///home/user_name/ctlos/ctlos_repo/$arch
```

Закоментировать репозиторий ctlos, если нужно.

```bash
#[ctlos_repo]
#SigLevel = Never
#Server = https://raw.github.com/ctlos/ctlos_repo/dev/repo/$arch
```

### Сборка образа

Сделать скрипты исполняемыми.

```bash
cd ctlosiso
chmod +x {autobuild.sh,chroot.sh,mkarchiso.sh}
```

* Пакеты: `packages.x86_64`

Скрипту `autobuild.sh` обязательно нужно передать аргумент, любой. Я обычно отправляю `xfce_1.7.0` de/wm и версию.

```bash
sudo ./autobuild.sh xfce_1.7.0
```

Готовый образ и хэши создаются в данной директории `~/ctlos/ctlosiso/out`.

### Пересборка

Удалить каталоги и запустить скрипт сначала.

```bash
sudo rm -rf {out,work}
```

Или отредактировать.

```bash
sudo nano /bin/pacstrap
```

Изменить строку, для пропуска установленных пакетов.

```bash
pacman_args+=(--noconfirm)
```

На.

```bash
pacman_args+=(--noconfirm --needed)
```

Удалить файлы блокировки.

```bash
sudo rm -v work/build.make_*
```

### Списки пакетов

Список установленных пакетов в системе. Подробно.

```bash
LANG=C pacman -Sl | awk '/\[installed\]$/ {print $1 "/" $2 "-" $3}' > ~/pkglist.txt

LANG=C pacman -Sl | awk '/\[installed\]$/ {print $2}' > ~/.pkglist.txt
```

Кратко.

```bash
pacman -Qqe > ~/pkglist.txt

pacman -Qqm > ~/aurlist.txt
```
