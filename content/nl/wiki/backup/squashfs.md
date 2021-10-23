---
title: Резервное копирование Squashfs
menu:
  wiki:
    title: Squashfs
    parent: "backup"
weight: 20
---

## Mksquashfs

Утилита сжатия.

```bash
pacman -S squashfs-tools arch-install-scripts
```

Смотрим разделы диска.

```bash
lsblk
```

Монтируем для чтения root,boot(home) и создаем образ, сжатие xz.

```bash
mount /dev/sda5 -o ro /mnt
mount /dev/sda2 -o ro /mnt/boot
mount /dev/sda7 -o ro /mnt/home
```

Архивируем.

```bash
mksquashfs /mnt ~/backup/myarch.sfs -comp xz
```

Исключение: `-e /dir/file`.

Отмонтируем по завершению.

```bash
umount -R /mnt
```

## Восстановление

Из рабочей системы, или Live-usb. Форматируем и монтируем поврежденный или новый раздел, boot по необходимости и др.

```bash
mkfs.ext4 -L "root" -U "$(blkid -o value -s UUID /dev/sda5)" /dev/sda5
mkfs.ext2 -L "boot" -U "$(blkid -o value -s UUID /dev/sda2)" /dev/sda2
mkfs.ext4 -L "home" -U "$(blkid -o value -s UUID /dev/sda7)" /dev/sda7
mkswap /dev/sda3

mount /dev/sda5 /mnt
mount /dev/sda2 /mnt/boot
mount /dev/sda7 /mnt/home
```

Распаковываем сжатый образ.

```bash
unsquashfs -d /mnt -f ~/backup/myarch.sfs
```

Проверим и отмонтируем раздел.

```bash
ls /mnt
umount /dev/sda2
umount /dev/sda7
umount /dev/sda5
```

Монтируем раздел root(dev/sda5), boot и др., если нужно.

```bash
mount /dev/sda5 /mnt
mount /dev/sda2 /mnt/boot
mount /dev/sda7 /mnt/home
swapon /dev/sda3
```

Редактируем/Генерируем если нужно `/etc/fstab`, `/etc/mkinitcpio.conf`.

```bash
rm /mnt/etc/fstab
genfstab -pU /mnt > /mnt/etc/fstab
```

Делаем chroot в новую систему.

```bash
arch-chroot /mnt /bin/zsh
```

Или `chroot /mnt /bin/bash` Debian подобных.

Создаем initramfs-образы.

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

Выходим из **chroot**, размонтируем разделы и перезагружаемся уже в восстановленную систему!

```bash
exit
umount /mnt/boot
umount /mnt/home
umount /mnt
reboot
```

## Монтирование образа

```bash
mount ~/backup/myarch.sfs -t squashfs -o loop /mnt
```

Теперь вы можете скопировать из образа любые нужные файлы `cp -p`.

Добавить что-либо таким способом не получится, для этого нужно будет опять воспользоваться `mksquashfs`.
