---
title: Релиз Ctlos Linux — Xfce v2.0.0
lead: ""
date: 2021-04-14
contributors: ["creio"]
comments: true
---

## Xfce 2.0

Кодовое имя `Алеша` :), как и говорил комментатору с трубы.

Расформировал мета пакеты skel, отвязал зависимости.

Calamares в режиме online выполняет чистую установку pacstrap, возможно отключить практически все. [Видео релиза](https://ctlos.github.io/wiki/install/install-ctlos/).

Исправлены некоторые незначительные проблемы, о которых сообщают пользователи.

- calamares responsive slide
- iso syslinux black bg

## Добавлено в iso

- firefox-ublock-origin
- blueman

## Ctlos-helper

Добавлена [утилита — ctlos-helper](https://github.com/ctlos/ctlos-helper) с пост установочными действиями и возможностью установки некоторых пакетов. Возможно добавить `blackarch repo`. После выбора действий запускается окно лога, автоматически закроется по завершению всех выбранных действий.

## [ctlos-aur](https://ctlos.github.io/wiki/install/ctlos-repo/#ctlos-aur) repo

- colorpicker
- rofi-greenclip
- caffeine-ng
- torrserver-bin
- ytfzf

## Исходники

- [v2.0.0-xfce](https://github.com/ctlos/ctlosiso/tree/v2.0.0-xfce).
