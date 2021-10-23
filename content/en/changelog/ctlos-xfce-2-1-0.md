---
title: Релиз Ctlos Linux — Xfce v2.1.0
lead: ""
date: 2021-07-03
contributors: ["Alex Creio"]
comments: true
---

> Перед установкой online обязательно настройте интернет и выполните в терминале команду `mirrors`, а затем запустите установщик online. Команда просто перестроит список зеркал и обновит базы pacman, что предоставит наилучшую скорость установки для вас.

Обновление iso до актуального состояния. В конфиг пакмана`/etc/pacman.conf` добавлена многопоточная загрузка `ParallelDownloads = 5`.

## Исправлено

- reflector - исправлен сервис `/etc/systemd/system/reflector.service`, отрабатывает при первом запуске`RemainAfterExit=true`. В дефолтном сервисе вызов рефлектора происходит при каждом запуске системы.

## Исходники

- [v2.1.0-xfce](https://github.com/ctlos/ctlosiso/tree/v2.1.0-xfce).
