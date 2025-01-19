---
title: Видео драйвера
menu:
  wiki:
    parent: "config"
weight: 10
---

## Информация

Узнать информацию о видео карте.

```bash
lspci -k | grep -A 2 -E "(VGA|3D)"
```

- `xf86-video-amdgpu` — новый, свободный драйвер для видеокарт AMD.
- `xf86-video-ati` — старый свободный драйвер для AMD.
- `xf86-video-intel` — драйвер для встроенной графики Intel.
- `xf86-video-nouveau` — свободный драйвер для карт NVIDIA.
- `xf86-video-vesa` — свободный драйвер, поддерживающий все карты, но с очень ограниченной функциональностью. Для виртуальной машины.
- `nvidia` — проприетарный драйвер для NVIDIA.

Проприетарные драйвера обычно увеличивают производительность.

Раскомментировать репозиторий multilib в `/etc/pacman.conf`.

[Аппаратное ускорение видео](https://wiki.archlinux.org/index.php/Hardware_video_acceleration).

## Intel

```bash
sudo pacman -S xf86-video-intel intel-media-driver lib32-mesa
```

- Для поддержки 32-битных приложений `lib32-mesa`.

Для intel все не однозначно, в случае проблем обращайтесь к [Arch Wiki](https://wiki.archlinux.org/index.php/intel_graphics), если зависания и разрывы попробуйте создать файл `sudo nano /etc/X11/xorg.conf.d/20-intel.conf` с таким содержимым.

```bash
Section "Device"
  Identifier "Intel Graphics"
  Driver "intel"
  Option "AccelMethod" "uxa"
  Option "NoAccel" "True"
  Option "DRI" "False"
  Option "TearFree" "true"
EndSection
```

## Nvidia

```bash
yay -S nvidia nvidia-utils nvidia-settings opencl-nvidia opencl-headers lib32-nvidia-utils lib32-opencl-nvidia
```

Драйвер nvidia может иметь префикс nvidia-390xx, конкретно для вашей карты, уточняйте на сайте производителя и в [Арч-вики](https://wiki.archlinux.org/index.php/NVIDIA).

```bash
yay -S nvidia-390xx-dkms nvidia-390xx-utils nvidia-390xx-settings opencl-nvidia-390xx lib32-opencl-nvidia-390xx lib32-nvidia-390xx-utils
```

Создание xorg файла `/etc/X11/xorg.conf`.

```bash
sudo nvidia-xconfig
```

### Убираем тиринг

```bash
sudo nvidia-settings
```

Переходим.

1. X Server Display Configuration
2. Advanced
3. Force Full Composition Pipeline
4. Save to X Configuration File
5. Exit
6. Reboot

## AMD

- [ATI](https://wiki.archlinux.org/index.php/ATI)
- [AMDGPU](https://wiki.archlinux.org/index.php/AMDGPU)

```bash
sudo pacman -S xf86-video-ati
# или
sudo pacman -S xf86-video-amdgpu
```

### Убираем тиринг

Если **ATI** `xf86-video-ati`.

```bash
sudo nano /etc/X11/xorg.conf.d/20-radeon.conf
```

```bash
Section "Device"
    Identifier "Radeon"
    Driver "radeon"
    Option "TearFree" "true"
EndSection
```

Если **AMDGPU** `xf86-video-amdgpu`.

```bash
sudo nano /etc/X11/xorg.conf.d/20-amdgpu.conf
```

```bash
Section "Device"
    Identifier "AMD"
    Driver "amdgpu"
    Option "TearFree" "true"
EndSection
```

## Для виртуальной машины

```bash
sudo pacman -S xf86-video-vesa
```

## Если лагает на старых GPU

```bash
sudo pacman -S mesa-amber
```
