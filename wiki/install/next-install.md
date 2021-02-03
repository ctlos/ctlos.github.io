---
layout: default
title: Рекомендации после установки
menus:
  install:
    title: После установки
    weight: 2
---

Содержание
{: .text-delta }

1. TOC
{:toc}

> Всегда помните о существовании [Arch Wiki](https://wiki.archlinux.org/index.php/Main_page_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9) "Arch Wiki"), большинство ответов уже существует, не ленитесь читать. Более актуальная информация на англ. языке.
{:.warning}

## Обновление ключей

Если возникли проблемы с обновлением, или установкой пакетов выполните данные рекомендации.

```bash
sudo pacman-key --init && sudo pacman-key --populate && sudo pacman-key --refresh-keys && sudo pacman -Syy
```

> Если ошибка с содержанием `hkps.pool.sks-keyservers.net`, не может достучаться до сервера ключей выполните команды ниже. Указываем другой сервер ключей.

```bash
sudo pacman-key --init && sudo pacman-key --populate

sudo pacman-key --refresh-keys --keyserver keys.gnupg.net && sudo pacman -Syy
```

> Если ошибка с содержанием `/var/lib/pacman/sync`, выполните команду ниже и повторите пункт с обновлением ключей.

```bash
sudo rm -rf /var/lib/pacman/sync/*
```

> Если ошибка с содержанием `/var/lib/pacman/db.lck`, выполните команду.

```bash
sudo rm /var/lib/pacman/db.lck
```

[Package signing](https://wiki.archlinux.org/index.php/Pacman_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)/Package_signing_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)#%D0%A0%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC)

## Информация о системе

Краткая информация о Вашей системе.

```bash
neofetch
```

Подробней о железе.

```bash
yay -S inxi
#
inxi -F
```

## Скорость интернета

```bash
speed
```

## Смена оболочки

Если вас не устраивает `zsh`, всегда можно переключить.

Для смены оболочки на **BASH** введите в терминале следующее: `chsh -s /bin/bash`.

Для смены оболочки на **ZSH** введите в терминале следующее: `chsh -s /bin/zsh`.

## Зеркала — Reflector

Это ускорит загрузку пакетов. [Arch Wiki](https://wiki.archlinux.org/index.php/reflector).

В Ctlos установлен скрипт `~/.bin/mirrors`, отредактируйте его под ближайшие к Вам страны, а затем запустите от обычного пользователя.

### Опции

- `reflector --list` посмотреть список доступных для использования стран и кодов.
- `-l 10` выбрать 10 из списка.
- `-f 20` выбрать 20 по скорости.
- `--sort rate` сортировато по скорости загрузки.
- `--sort score` сортировато по рейтингу, оценки.
- `-a 12` синхронизированы за последние 12 часов.
- `--verbose` подробный вывод.

### Использование

```bash
# несколько стран
mirrors -lc
# одна страна
mirrors -c
# не учитывает страны
mirrors
```

Прямой командой.

```bash
sudo reflector -c ru,by,ua,pl -p https,http -l 20 --sort rate --save /etc/pacman.d/mirrorlist
```

```bash
sudo reflector -c ru,by,ua,pl -p https,http --sort rate -a 12 -l 10 --save /etc/pacman.d/mirrorlist
```

Или по одной.

```bash
sudo reflector --verbose -c ru -p https,http --sort score --save /etc/pacman.d/mirrorlist
```

Проверим: `cat /etc/pacman.d/mirrorlist`.

Обновление всей системы.

```bash
sudo pacman -Syyu
```

### Pacman hook

Создайте файл `sudo nano /etc/pacman.d/hooks/mirrorupgrade.hook`, содержимое ниже. В [ArchWiki](https://wiki.archlinux.org/index.php/reflector#pacman_hook) немного другой пример.

В `Exec = ` Пропишите выполнение reflector с нужными вам опциями.

```bash
[Trigger]
Operation = Upgrade
Type = Package
Target = pacman-mirrorlist

[Action]
Description = Updating pacman-mirrorlist with reflector
When = PostTransaction
Depends = reflector
Exec = /usr/bin/reflector -c ru,by,ua,pl -p https,http --sort rate -a 12 -l 10 --save /etc/pacman.d/mirrorlist
```

Данный хук будет выполнен после обновления `pacman-mirrorlist`.

## Левое меню thunar

```bash
xdg-user-dirs-gtk-update
```

## Используйте алиасы

Алиасы — сокращение команд, находятся в файле `~/.alias_zsh`.

**Yay** работает, как **pacman**, т.е. выполняет теже функции, поэтому я в основном использую команды `yay` для манипуляции с пакетами. Вот данный набор из файла.

- `alias y="yay -S"` установка.
- `alias yn="yay -S --noconfirm"` установка без подтверждения.
- `alias ys="yay"` поиск с дальнейшим выбором по цифре.
- `alias ysn="yay --noconfirm"` поиск с дальнейшим выбором по цифре, без подтверждения.
- `alias yc="yay -Sc"` очистка кэша.
- `alias yy="yay -Syy"` синхронизация баз зеркал.
- `alias yu="yay -Syyu"` обновление.
- `alias yun="yay -Syyu --noconfirm"` обновление без подтверждения.
- `alias yr="yay -R"` удаление пакет(а,ов).
- `alias yrn="yay -R --noconfirm"` удаление пакет(а,ов) без подтверждения.

Пример удаления: `yrn htop`.

Команда `cache`, для очистки кэша пакетов и оптимизация базы pacman.
Все исполняемые скрипты лежат в `~/.bin`.
