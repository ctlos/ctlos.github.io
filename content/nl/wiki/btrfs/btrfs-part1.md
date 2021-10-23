---
title: Btrfs установка и использование
menutitle: Btrfs установка
menu:
  wiki:
    title: Btrfs установка
    parent: "btrfs"
weight: 10
---

## Btrfs установка

Установите пакет пользовательских утилит.

```bash
pacman -S btrfs-progs arch-install-scripts
```

`lsblk` - подсветить все разделы чтобы определиться, что монтировать.

```bash
# разбить диск, -z говорит обнулить таблицу разделов
cfdisk -z /dev/sda
```

Так как Btrfs не может содержать swap-файл, необходимо заранее позаботиться о разделе с подкачкой, если он вам нужен.

```bash
mkswap /dev/sda2
```

Создаём файловую систему на разделе. Для разделов от 1ГБ и меньше, чтобы более эффективно использовать пространство, рекомендуется передать ключ -M к параметрам `mkfs.btrfs`.

При желании можно задать лэйбл ключом -L.

```bash
mkfs.btrfs /dev/sda<цифра>
mkfs.btrfs -L "root" /dev/sda<цифра>
```

Теперь монтируем.

```bash
mount /dev/sdb1 /mnt
```

Затем создадим два подтома под корень и домашние каталоги пользователей.

```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
```

Просмотр субволумов.

```bash
btrfs subvolume list /mnt
```

Отмонтируем корень ФС.

```bash
umount /mnt
```

Для того, чтобы монтировать подтом подобно обычному разделу диска, команде mount нужно указывать опцию subvol.

Монтируем корень. Сжатие zstd, или lzo.

```bash
mount -o subvol=@,compress=zstd /dev/sdb1 /mnt
```

Создаём директорию и монтируем в неё наш будущий каталог пользователей.

```bash
mkdir /mnt/home
mount -o subvol=@home,compress=zstd /dev/sdb1 /mnt/home
```

Дальше действуем по вики, т.е. выбираем зеркала и ставим базовую систему. При генерации initramfs mkinitcpio будет ругаться на отсутствие fsck.btrfs - это нормальное явление. Уберём этот хук `fsck` из конфига, т.к. для Btrfs он не требуется.

```bash
nano /etc/mkinitcpio.conf
```

Вот данная строка в файле.

```bash
HOOKS="base udev autodetect modconf block filesystems keyboard"
```

И пересоздадим initramfs.

```bash
mkinitcpio -p linux
```

И ещё момент по поводу загрузчика, не знаю как другие, а grub точно умеет грузиться с Btrfs, так что выбрать лучше именно его. Так же не забудьте установить пакет btrfs-progs и позаботиться о бэкапах.

## Использование btrfs

Монтируем корень ФС.

```bash
mount /dev/sdb1 /mnt
```

Создавать снапшоты.

```bash
btrfs subvolume snapshot /mnt/@ /mnt/@_bac
btrfs subvolume snapshot /mnt/@home /mnt/@home_bac

btrfs subvolume list /mnt
```

Каталоги абсолютно идентичны, и пока мы не начнём изменять файлы, снимки места не занимают.

Удаление.

```bash
btrfs subvolume delete /mnt/@
```

Откат: грузимся с live CD, монтируем корень ФС и переименовываем подтома. Так же подтома можно переименовать прямо в рабочей системе, если загрузка удачна.

```bash
mount /dev/sdb1 /mnt
mv /mnt/@ /mnt/@_bad
mv /mnt/@_bac /mnt/@

mv /mnt/@home /mnt/@home_bad
mv /mnt/@home_bac /mnt/@home
```

Либо грузимся как обычно, а в меню grub указываем подтом с бэкапом `rootflags=subvol=backup`.

Копирование при записи (CoW). Если использовать команду `cp` с ключом `--reflink=auto`, то копия файла не будет занимать место на диске. И впоследствии, допустим, при изменении скопированного файла, записываться на диск будут только изменённые блоки.

"Онлайн" - проверка ФС. При которой осуществляется чтение всех данных/метаданных с перепроверкой контрольных сумм, при наличии ошибок обнаружение их и исправление по возможности.

```bash
btrfs scrub start -B /
```

Если опустить ключ `-B`, процесс уйдёт в фон, и о ходе выполнения можно будет узнать командой.

```bash
btrfs scrub status /
```

Пример вывода.

```bash
scrub status for 56edc366-a153-4eee-b2a6-471b7066b93d
scrub started at Sat Dec 14 06:37:19 2013 and finished after 3242 seconds
total bytes scrubbed: 222.45GB with 0 errors
```

Рекомендуется проводить проверку регулярно (еженедельно). "Оффлайн" - проверка ФС (на отмонтированном разделе). При отсутствии ошибок утилита возвратит 0.

```bash
btrfs check /dev/sda
```

## Установка из существующей системы или с live usb

```bash
pacman -S btrfs-progs arch-install-scripts
```

`lsblk` - подсветить все разделы что бы определиться что монтировать.

Так как Btrfs не может содержать swap-файл, необходимо заранее позаботиться о разделе с подкачкой, если он вам нужен.

```bash
mkswap /dev/sda2
```

Внимание! это отформатирует весь ваш диск, с потерей данных! В данном примере установка идет на весь диск, а не разделы, если вам нужен swap учтите этот момент.

```bash
mkfs.btrfs -f -L WD /dev/sdb
```

Монтируем.

```bash
mount /dev/sdb /mnt
```

Создадим два подтома под root `@` и домашний каталог пользователя `@home`.

```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
```

И отмонтируем корень ФС.

```bash
umount /mnt
```

Монтируем корень.

```bash
mount -o subvol=@,compress=zstd /dev/sdb /mnt
```

Создаём директорию и монтируем в неё наш будущий каталог пользователей.

```bash
mkdir /mnt/home
mount -o subvol=@home,compress=zstd /dev/sdb /mnt/home
```

Устанавливаем базовые пакеты.

```bash
pacstrap /mnt base base-devel linux linux-headers xorg-xinit xorg-server grub zsh mc nano netctl wpa_supplicant dialog dhcpcd btrfs-progs
```

Создаём fstab.

```bash
genfstab -pU /mnt >> /mnt/etc/fstab
```

Проверяем.

```bash
cat /mnt/etc/fstab
```

Создаем директорию и монтируем boot, если нужно.

```bash
mount -t proc none /mnt/proc
mount -t sysfs none /mnt/sys
mount -o bind /dev /mnt/dev

cp -L /etc/resolv.conf /mnt/etc

swapon /dev/sda2
```

Начиная с ядра 5.0 можно создать swap-файл, swap-файл должен располагаться целиком на одном устройстве, создаваться с отключенным COW и сжатием.

```bash
touch /swap             # создаем пустой файл /swap
chmod go-r /swap        # swap должен иметь права 600
chattr +C /swap         # отключаем COW, сжатие тоже отключается
fallocate /swap -l4g    # файл 4Gb
mkswap /swap
swapon /swap
```

Проверим.

```bash
btrfs subvolume list /mnt
```

Входим в систему.

```bash
chroot /mnt /bin/zsh
```

Назначаем хост.

```bash
echo ctlos > /etc/hostname
```

Выбор часового пояса.

```bash
ln -sf /usr/share/zoneinfo/UTC /etc/localtime
hwclock --systohc --utc
timedatectl set-ntp true
# или
timedatectl set-timezone Europe/Moscow
```

Выберем локаль для системы.

```bash
sed -i "s/#\(en_US\.UTF-8\)/\1/" /etc/locale.gen
sed -i "s/#\(ru_RU\.UTF-8\)/\1/" /etc/locale.gen

locale-gen         # Сгенерировать локали
```

Прописать в `/etc/locale.conf`.

```bash
echo "LANG=ru_RU.UTF-8" > /etc/locale.conf
echo "LC_COLLATE=C" >> /etc/locale.conf
```

Русский шрифт в консоли.

```bash
echo "KEYMAP=ru" > /etc/vconsole.conf
echo "FONT=cyr-sun16" >> /etc/vconsole.conf
```

Создаём рам-диск mkinitcpio.

```bash
nano /etc/mkinitcpio.conf
```

В `/etc/mkinitcpio.conf`, в разделе **HOOKS**, должен быть прописан хук `keyboard` `keymap`, убрать `fsck`.

В разделе **MODULES** нужно прописать свой драйвер видеокарты: i915 для Intel, radeon для AMD, nouveau для Nvidia.

```bash
HOOKS=(base udev autodetect modconf block filesystems keyboard keymap)
```

```bash
mkinitcpio -p linux
```

Задать пароль root.

```bash
passwd
```

Создать пользователя.

```bash
useradd -m -g users -G wheel,audio,video,storage -s /bin/zsh st
```

И задать ему пароль.

```bash
passwd st
```

Расскомментировать в `/etc/pacman.conf`.

```bash
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Затем выполнить.

```bash
pacman-key --init
pacman-key --populate
pacman -Syy
```

Установка boot loaderа.

```bash
grub-install /dev/sdb
grub-mkconfig -o /boot/grub/grub.cfg
```
