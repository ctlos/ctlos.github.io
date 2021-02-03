---
layout: post
title: Релиз Ctlos Linux — Openbox v1.3.0
type: minor
---

![Openbox v1.3.0](/wiki/images/changelog/ob1.3.0.png)

> В скором времени готовится запуск форума, большая просьба ко всем неравнодушным задонатить [любую сумму](https://ctlos.github.io/donat/), все собранные средства пойдут на поддержку и развитие.

Пропал человек [Viruall Box](https://vk.com/viruall), который мне очень помогал с раздачами торрентов и тестированием новых iso, если есть у кого желание помочь с этим, милости прошу.

Ядро linux 5.6.5.

- Заменено стандартное меню openbox на jgmenu и alt tab.
- Новая тема sddm (slice) и grub (crimson).
- Добавлены особые действия в меню thunar.
- Добавлен скрипт на горячие клавиши `~/.bin/flameshot.sh`, см. `~/.config/openbox/rc.xml`, автоматически определяет директорию `Pictures` и создаёт в ней dir `screen`, в которую и складывает скриншоты.
- Выключен numlock :).
- Добавлено несколько конфигов `tint2`.
- Темы и скрипты `~/.config/rofi` [github.com/adi1090x](https://github.com/adi1090x/rofi).

**Добавлено (added):**

- alttab-git
- micro-bin

**Обновлено (update):**

- calamares 3.2.23
- pamac-aur
- timeshift

Исходники [релиза](https://github.com/ctlos/ctlosiso/tree/v1.3.0-ob).
