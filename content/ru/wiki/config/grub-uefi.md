---
title: Установка Grub UEFI
menu:
  wiki:
    parent: "config"
weight: 30
---

## Подготовка

Информация о диске.

```bash
parted /dev/sda print
```

Создать таблицу GPT. Создать boot раздел 512M, выбрать тип EFI.

```bash
cfdisk
```

```bash
parted /dev/sda print
```

Форматируем.

```bash
mkfs.fat -F32 /dev/sda1
```

Монтируем корень и другие, если надо.

```bash
mount /dev/sda2 /mnt
```

Создаем efi дерикторию и др., если надо.

```bash
mkdir -p /mnt/boot/efi
```

Монтируем boot EFI.

```bash
mount /dev/sda1 /mnt/boot/efi
```

## Установка

Выполняем chroot.

```bash
arch-chroot /mnt
```

Установим Grub.

```bash
pacman -S grub efibootmgr dosfstools os-prober
```

Установим grub в `/boot/efi`.

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=Arch --force
```

Сконфигурируем Grub.

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```
