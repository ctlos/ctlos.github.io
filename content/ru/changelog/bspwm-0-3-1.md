---
title: Релиз Ctlos Linux — Bspwm v0.3.1
date: 2020-09-03
contributors: ["creio"]
comments: true
---

Благодарю пользователя `Mr Ocean` за вклад в тестирование и отправку решений на [форум](https://forum.ctlos.ru/viewforum.php?id=4).

- Скачать [Get](/get)
- Подробное [Описание в wiki](/wiki/wm/bspwm)

## Добавлено (added)

- multilockscreen (первый запуск дольше, генерит под мониторы)
- parcellite
- Добавлен репозиторий blackarch, если медленно грузит, смотрите ближайшие зеркала `/etc/pacman.d/blackarch-mirrorlist`
- Тема оформления: `ctlos-qogir-dark`
- Иконки: Qogir-dark, dui-ico
- Добавлен пост скрипт, автоматически очищает от ненужного, после установки [/usr/bin/cleaner.sh](https://github.com/ctlos/ctlosiso/blob/v0.3.1-bdsm/airootfs/usr/bin/cleaner.sh). Выполняет calamares.

## Исправлено (Fixed)

- cava (исправлен config)
- picom (исправлен config)
- В calamares(установщик) добавлена возможность переключения языка `alt+shift` [video](https://www.youtube.com/watch?v=3DMCwhOGNFE)
- исправлены некоторые баги

## Удалено (removed)

- clipit

## Обновлено (update)

- calamares 3.2.29

## Исходники

- [v0.3.1-bdsm](https://github.com/ctlos/ctlosiso/tree/v0.3.1-bdsm).
