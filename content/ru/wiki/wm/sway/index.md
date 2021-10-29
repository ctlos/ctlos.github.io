---
title: "Swaywm тайловый менеджер окон"
description: ""
lead: ""
date: 2021-10-29T14:35:08+03:00
lastmod: 2021-10-29T14:35:08+03:00
images: ["sway.png"]
post_video:
menu: 
  wiki:
    title: "Sway wm"
    parent: "wm"
weight: 30
draft: false
toc: true
comments: true
edit: true
---

{{< img src="sway.png" alt="Sway" >}}

Sway — тайловый оконный менеджер wayland, почти аналог i3 в x11, [swaywm.org](https://swaywm.org/).

Представляю вашему внимаю готовый к употреблению wm с небольшим описание, [немного скринов](https://imgur.com/gallery/fHpnVur).

## Скачать iso образ

> Данный оконный менеджер доступен в `xfce iso`, метод online установки.

- [Скачать](/get)

## Конфигурационные файлы

Путь                               | Описание
--- | ---
~/.config/sway/config.d/hotkeys    | Горячие клавиши.
~/.config/sway/config.d/app_conf   | Роли окон.
~/.config/sway/config.d/theme      | Внешний вид.
~/.config/sway/waybar              | Конфиги и скрипты панели.
~/.config/sway/swaylock/config     | Блокировка экрана.
~/.config/sway/wofi                | Конфиги, стили лаунчера.
~/.config/sway/mako                | Конфиг уведомлений.
~/.config/sway/kitty               | Конфиги терминала.

## Горячие клавиши

Конфиг `~/.config/sway/config.d/hotkeys`.

- MOD4: Super/Windows
- MOD1: Alt

Опция `--to-code`, работа вне зависимости от раскладки.

### Режимы и управление окнами

Ключ                | Описание
--- | ---
`super+space`       | toggle: переключение в активных режимах.
`super+shift+space` | toggle: переключение окна в плавающий и обратно.
`super+shift+minus` | scratchpad: Отправка окна в блокнот.
`super+minus`       | Сворачивание, вызов окна в scratchpad-е.
`super+b`           | Горизонтальный сплит.
`super+v`           | Вертикальный сплит.
`super+e`           | Переключение сплита.
`super+s`           | Режим стэйкинга.
`super+w`           | Режим табов.
`super+r`           | И изменение размеров vim(`h,j,k,l`) или `←,→,↑,↓`, выход из режима `Esc`.
`super+{←,→,↑,↓}` или `super+{h,j,k,l}` | Перемещение по окнам.
`super+shift+{←,→,↑,↓}` или `super+shift+{h,j,k,l}` | Меняет позицию окна.
`super+{1-9,0}`       | Переход на тег.
`super+shift+{1-9,0}` | Отправка окна на тег.
`super+shift+b`       | Показать скрыть панель waybar.

Зажатая `Super(win)` и клавиши мыши манипулируют окнами: положение(левый клик), размер(правый клик).

### Запуск утилит

Ключ                   | Описание
--- | ---
`alt+shift`            | Переключение раскладки(us,ru).
`super+shift+r`        | Рестарт, перечитать конфиг.
`super+Return`         | Терминал kitty.
`super+shift+Return`   | Плавающий терминал.
`super+z`              | Закрыть окно.
`super+d`              | Wofi - меню(лаунчер).
`super+alt+Del`        | Меню выхода.
`super+Del`            | Блокировка экрана.
`alt+Tab`              | Список открытых окон.
`Print`                | Скрин всего экрана, падает в изображения.
`super+Print`          | Меню скриншотов(grimshot wofi).
`alt+w`                | Firefox.
`alt+t`                | Менеджер файлов thunar.

> Если что-то не устраивает, меняйте под себя и релоад конфига `super+shift+r`.

## Ссылки

- [Wiki sway](https://github.com/swaywm/sway/wiki)
- [Arch wiki](https://wiki.archlinux.org/title/Sway)

Комментарии приветствуются. Вступай в telegram чат: [t.me/ctlos](https://telegram.me/ctlos), или прокомментируй на форуме(ссылка ниже).
