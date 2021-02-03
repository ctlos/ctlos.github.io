---
layout: default
title: Заметки
menus:
  other:
    title: Заметки
    weight: 6
---

Содержание
{: .text-delta }

1. TOC
{:toc}

## Загрузка и запись iso

[https://github.com/ctlos/ctlosiso/releases](https://github.com/ctlos/ctlosiso/releases)

Прописать полную ссылку к файлу.

### Wget

```bash
sudo wget -O - https://github.com/ctlos/ctlosiso/releases/download/v1.0.0/*.iso > /dev/sdX && sync
```

### Curl

```bash
sudo curl -L https://github.com/ctlos/ctlosiso/releases/download/v1.0.0/*.iso > /dev/sdX && sync
```

### Curl и dd

```bash
sudo curl -L https://github.com/ctlos/ctlosiso/releases/download/v1.0.0/*.iso | dd bs=4M of=/dev/sdX status=progress && sync
```

## Установка без носителя

- [wiki.archlinux.org/index.php/Install_from_existing_Linux](https://wiki.archlinux.org/index.php/Install_from_existing_Linux).
- [Video](https://www.youtube.com/watch?v=ZKupJjG8AW0&t=335s).


## Настройка sudo

```bash
EDITOR=nano visudo
```

Дать пользователю привилегии суперпользователя, когда он вводит sudo.

```bash
malody ALL=(ALL) ALL
```

Или группе.

```bash
%wheel ALL=(ALL) ALL
```

Не спрашивать пароль у пользователя.

```bash
Defaults:malody      !authenticate
```
