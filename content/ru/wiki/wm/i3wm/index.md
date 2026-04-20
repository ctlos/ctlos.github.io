---
title: "I3 wm тайловый менеджер окон"
description: "Описание конфигурации Ctlos Linux i3-gaps wm, горячие клавиши, утилиты."
lead: ""
date: 2026-04-20T14:35:08+03:00
# lastmod: 2026-04-20T14:35:08+03:00
images: ["i3-gaps.jpg"]
post_video:
menu:
  wiki:
    title: "I3-gaps"
    parent: "wm"
weight: 20
draft: false
toc: true
comments: true
edit: true
---

{{< img src="i3-gaps.jpg" alt="i3-gaps" >}}

I3-gaps — форк с промежутками между окнами.

## Скачать iso образ

> Данный оконный менеджер доступен в `xfce iso`, метод online установки.

- [Скачать](/get)

## Конфигурационные файлы

Путь                     | Описание
--- | ---
`~/.config/i3/config`    | Основной конфиг.
`~/.config/i3/polybar`   | Конфиг и скрипты панели.
`~/.config/dunst`        | Конфиги уведомлений.
`~/.config/alacritty`    | Конфиги терминала.

## Горячие клавиши

- MOD4: $mod/Windows
- MOD1: Alt

### Режимы и управление окнами

Ключ                | Описание
--- | ---
`$mod+$alt+g` затем `o` или `i` и `+/-` | режим управления gaps, `0` сброс и `esc`.
`$mod+{←,→,↑,↓}` или `$mod+{j,k,l,;}` | Перемещение по окнам.
`$mod+$alt+{←,→,↑,↓}` или `$mod+$alt+{j,k,l,;}` | Меняет позицию окна.
`$mod+{1-9,0}`       | Переход на тег.
`$mod+$alt+{1-9,0}` | Отправка окна на тег.
`$mod+f`       | На весь экран.
`$mod+$alt+c`       | перечитать конфиг.
`$mod+$alt+r`       | перезагрузить i3.
`$mod+$alt+Delete`       | меню выхода.
`$mod+r`       | изменение размера.
`$alt+x`       | показать scratchpad.
`$alt+space`       | skippy-xd, сложить в мозайку.
`$mod+z`       | закрыть окно.

Зажатая `$mod(win)` и клавиши мыши манипулируют окнами: положение(левый клик), размер(правый клик).

### Запуск утилит

Ключ                   | Описание
--- | ---
`alt+shift`            | Переключение раскладки(us,ru).
`$alt+d`       | rofi лаунчер.
`Ctrl+space`       | rofi окна.
`$mod+Return`       | терм в тайлинг.
`$alt+t`       | плавающий терм.
`$alt+r`       | файловый менеджер.
`$alt+h`       | системный монитор `btm`.
`Print`                | Скрин всего экрана.
`$alt+Print`          | Меню скриншотов.
`alt+w`                | Firefox.
`alt+t`                | Менеджер файлов thunar.

> Если что-то не устраивает, меняйте под себя и релоад конфига `$mod+$alt+r`.

## Ссылки

- [i3wm](https://i3wm.org/)
- [Arch wiki](https://wiki.archlinux.org/title/I3)

Комментарии приветствуются. Вступай в telegram чат: [t.me/ctlos](https://telegram.me/ctlos).
