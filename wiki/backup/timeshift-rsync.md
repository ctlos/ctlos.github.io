---
layout: default
title: Резервное копирование
menus:
  backup:
    title: Timeshift, rsync
    weight: 1
---

Содержание
{: .text-delta }

1. TOC
{:toc}

## Timeshift

Отличная программа для создания backup-ов и восстановления системы: **Timeshift**. Данная утилита создает мгновенны снимки btrfs, а со стандартами ext работает через **rsync**. Установка.

![Timeshift](/wiki/images/backup/timeshift.png)

```bash
yay -S timeshift
```

Интерфейс очень простой, главное правильно настроить исключения.

Это нужно для того, чтобы вы не дампили большие и не нужные каталоги вашей системы, т.к. это экономит время и место на диске, а работоспособность сохраняется. В пример могу привести каталог virtualbox, мне например он в копии системы не нужен, в том числе и смонтированный диск `/home/st/files`, думаю вы поняли.

> Вот мой список правил. Правила исключений должны быть выше домашней директории, измените путем перетаскивания.

![Timeshift exclude](/wiki/images/backup/exclude-timeshift.png)

Существует и консольный вариант timeshift, вы можете сделать `chroot` в вашу систему, смонтировать разделы и откатить версию. В help есть примеры, все просто `timeshift -h`.

## Rsync

![Terminal](https://thumbs.gfycat.com/ComplexNeighboringBoilweevil-size_restricted.gif)

Монтируем раздел для резервной копии, предварительно создайте каталог.

```bash
mount /dev/sdb1 /dump
```

Копируем `/` в `/dump` с исключением, но с созданием нужных директорий.

```bash
rsync -avAXHP --delete --delete-excluded --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/var/lib/pacman/sync/*","/var/cache/*","/var/tmp/*","/boot/*","/home/*"} /* /dump/
```

Скопировать систему полностью.

```bash
rsync -avAXHP --delete --delete-excluded --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/var/lib/pacman/sync/*","/var/cache/*","/var/tmp/*","/home/lost+found","/boot/lost+found"} /* /dump/
```

```bash
rsync -avAXHP --delete --delete-excluded --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/var/lib/pacman/sync/*","/var/cache/*","/var/tmp/*","/boot/lost+found","/home/lost+found","/home/*/.thumbnails/*","/home/*/.cache/*","/home/*/.local","/home/*/.gvfs/*","/home/*/files/*","/home/*/.var","/home/*/.npm","/home/*/.node-gyp","/home/*/.electron"} /* /run/media/st/dump/myarch/
```

Стоит заметить и исключить из `/home`, как пример ниже.

```bash
--exclude={"/home/lost+found","/home/*/.thumbnails/*","/home/*/.cache/mozilla/*","/home/*/.local/share/Trash/*","/home/*/.gvfs/*"}
```

```bash
rsync -avAXHP --delete --delete-excluded --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/var/lib/pacman/sync/*","/var/cache/*","/var/tmp/*","/boot/lost+found","/home/lost+found","/home/*/.thumbnails/*","/home/*/.cache/mozilla/*","/home/*/.local/share/Trash/*","/home/*/.gvfs/*"} /* /dump/
```

Исключите каталоги в которых смонтированы диски/разделы, если нужно.

```bash
/home/st/files
```

Далее создаем архив.

```bash
cd /dump
tar -caf "/mnt/myarch.tar.xz" /dump/*
```

Или gz он быстрее.

```bash
cd /dump
tar -caf "/mnt/myarch.tar" /dump/*
gzip -9 "/mnt/myarch.tar"
```

## Восстановление

Форматируем нужные разделы, с помощью gparted или руками.

```bash
mkfs.ext4 -L "root" /dev/sda5
mkfs.ext2 -L "boot" /dev/sda2
mkfs.ext4 -L "home" /dev/sda7
mkswap /dev/sda3
```

Загружаемся с live usb(или из этой системы), монтируем раздел root(dev/sda5), boot и др., если нужно.

```bash
mount /dev/sda5 /mnt
mount /dev/sda2 /mnt/boot
mount /dev/sda7 /mnt/home
swapon /dev/sda3
```

Создаем каталог и Монтируем раздел с архивом резервной копии.

```bash
mkdir /mnt/dump
mount /dev/sdb1 /mnt/dump
```

Переходим на смонтированный диск(куда восстанавливаем), распаковываем архив.

```bash
cd /mnt
tar xvJf /mnt/dump/myarch.tar.xz -С /mnt
# или
tar xvzf /mnt/dump/myarch.tar.gz -С /mnt
```

Делаем `chroot` в новую систему.

```bash
arch-chroot /mnt /bin/zsh
```

Редактируем если нужно `/etc/fstab`, `/etc/mkinitcpio.conf`, создаем initramfs-образы.

```bash
mv /mnt/etc/fstab /mnt/etc/fstab.bak
genfstab -pU /mnt > /mnt/etc/fstab
```

```bash
mkinitcpio -p linux
```

Настройка ключей pacman.

```bash
pacman-key --init
pacman-key --populate
```

Обновляем меню загрузчика груб, os-prober (для поиска других ОС).

```bash
pacman -S os-prober
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

Выходим из chroot, размонтируем разделы и перезагружаемся уже в восстановленную систему.

```bash
exit
umount /mnt/boot
umount /mnt/home
umount /mnt/dump
rmdir /mnt/dump
umount /mnt

# Или.

exit
umount -R /mnt
reboot
```
