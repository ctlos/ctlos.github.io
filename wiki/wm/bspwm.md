---
layout: default
title: Ctlos Linux Bspwm
description: Описание конфигурации Ctlos Linux Bspwm, горячие клавиши, утилиты.
menus:
  wm:
    title: Bspwm
    weight: 1
---

## Содержание
{: .no_toc .text-delta }

1. TOC
{:toc}

> Текущий релиз 0.4.0

Исходники: [bspwm ветка](https://github.com/ctlos/ctlosiso/tree/v0.4.0-bdsm).

Автор: Alex Creio [@cretm](https://t.me/cretm).

![Bspwm](/wiki/images/wm/bspwm010.png)

[Demo Video](https://www.youtube.com/watch?v=INOtQJ_yZE4).

## Скачать iso образ

- Скачать [Ctlos Bspwm](/get)

Для установки левый верхний лаунчер на панели, правый клик - установщик в меню. По левому клику в rofi набрать `calamares` Enter.

> Рекомендации после установки [next-install](/wiki/install/next-install).

## Оформление

- Тема gtk: модификация Qogir.
- Иконки: Qogir-dark, dui-ico.
- Курсор: capitaine-cursors.
- Шрифт: Clear Sans Medium,9 `ttf-clear-sans`.
- Шрифт терминала: uw-ttyp0, Hack Nerd Font Mono,9 `ttf-nerd-fonts-hack-complete-git`.

## Панели

### Верхний бар — polybar

Элементы:

- Запуск меню: левый клик - rofi, правый клик - jgmenu.
- Urxvt с сессией tmux. Сессия сохраняется, при закрытии и восстанавливается, при следующем нажатии.
- Newsboat - rss читалка.
- Монитор cpu и ram.
- Доступные обновления, клик: pacui - псевдо графический менеджер пакетов.
- Рабочие столы (теги).
- Сервис tor. Включить левый клик, выключить правый.
- Music контроллер mpd.
- Звук по скроллу, клик - выкл.
- Дата. Лклик - подробней, Пклик - календарь.
- Раскладка.
- Меню выхода.

### Нижний бар — tint2

Name | Описание
--- | ---
udiskie | монтирование usb.
redshift-gtk | цветовой тон экрана.
xfce4-power-manager | менеджер питания.
parcellite | менеджер буфера обмена. `ctrl+alt+h` открыть историю.

## Горячие клавиши

Очень многое переопределено, но никто не мешает использовать дефолт, [sxhkdrc](https://github.com/baskerville/bspwm/blob/master/examples/sxhkdrc).

Добавлен дефолтный конфиг `~/.config/sxhkd/sxhkdrc.example`, если хотите просто переименуйте исходный, но создайте копию.

```bash
mv ~/.config/sxhkd/sxhkdrc ~/.config/sxhkd/sxhkdrc.bak
mv ~/.config/sxhkd/sxhkdrc.example ~/.config/sxhkd/sxhkdrc
```

## Режимы и управление окнами

- Режим тайлинга tiled, плитка.
- Режим pseudo_tiled, псевдо тайлинг. Нечто среднее между floating и tiled.
- Режим floating, плавающий режим.
- Режим fullscreen, Весь экран.
- Режим monocle, окно занимает всё доступное пространство.

Зажатая `Super(win)` и клавиши мыши манипулируют окнами: резмер, положение.

Ключ | Описание
--- | ---
`super + F1` | Описание всех комбинаций на us.
`super + a` | Псевдо тайлинг.
`super + s` | floating, плавающий режим.
`super + d` | тайлинг.
`super + f` | fullscreen.
`super + m` | Переключение режима monocle.
`alt + space` | Переключение режима тайлинг/floating.
`super + g` | Приклеить окно.
`super + z` | Закрыть окно.
`super + -` | Скрыть/показать окно.
`super + c` | Переход в режим monocle, отключение рамок и отступов.
`super + v` | Отключение отступов.
`super + {↑,↓}` | Уменьшение/увеличение отступов, `super + c` в исходное состояние.
`super + scroll` | Уменьшение/увеличение отступов, `super + c` в исходное состояние.
`super + {←,→,↑,↓}` | Перемещение окна в режиме floating.
`super + {h,j,k,l}` | перемещение по окнам в режиме tiled.
`super + alt + {h,j,k,l}` | изменение размера в режиме tiled.
`super + shift + {h,j,k,l}` | перетаскивание в режиме tiled.
`alt + tab` | Переключение окна на текущем теге.
`super + tab` | Переключение на предыдущий тег.
`super + {1-9,0}` | Переход на тег.
`super + {q...o,0}` | Переход на тег.
`super + alt + {←,→}` | Перемещение по тегам.
`super + alt + {1-9,0}` | Отправка окна на номер тега.
`super + ctrl + p` | Скрыть/показать polybar.

## Запуск утилит

Ключ                   | Описание
--- | ---
`alt + shift`          | Переключение раскладки.
`super + alt + r`      | Рестарт bspwm.
`super + alt + q`      | Выход из bspwm.
`super + Escape`       | Релоад конфига горячих клавиш sxhkd.
`alt + Return`         | Терминал драйвинг, задаем координаты старта, зажатым ЛКМ.
`super + Return`       | Терминал на первом теге, в режиме тайлинга, monocle.
`alt + t`              | Терминал в режиме floating.
`alt + r `             | Ranger - консольный менеджер файлов.
`alt + d `             | Rofi - меню.
`alt + w`              | Firefox.
`alt + f`              | Thunar.
`super + Delete`       | Блокировка экрана.
`super + alt + Delete` | Меню выхода.
`Print`                | скрин с отправкой в `~/Pictures/screen`(директория должна быть). Копируется в буфер.
`super + Print`        | скрин в режиме выделения.
`super + alt + Print`  | скрин с задержкой 5 сек. и отправкой в `~/Pictures/screen`(директория должна быть). Копируется в буфер.
`super + alt + m`      | Текущий трек в ncmpcpp.
`ctrl + alt + {c,v}`   | Копировать/вставить в терминале.

## Конфигурационные файлы

Путь | Описание
--- | ---
~/.config/bspwm/bspwmrc | Основной конфиг.
~/.config/bspwm | Скрипты.
~/.config/bspwm/autostart.sh | Скрипт автостарта. Он вызывается в `~/.config/bspwm/bspwmrc`. Функция `run` нужна для рестарта bspwm, избегает дублей.
~/.config/sxhkd/sxhkdrc | Конфиг горячих клавиш.
/etc/sddm.conf | Конфиг менеджера входа SDDM.
~/.config/bspwm/polybar | Скрипты и конфиг polybar.
~/.config/tint2/tray.tint2rc | Конфиг tint2 трей. В меню есть gui-конфигуратор (Настройки tint).
~/.config/picom.conf | Декоратор окон, композитный менеджер.
~/.Xresources | Конфиг Urxvt терминала. После изменения файла выполнить `xrdb -merge $HOME/.Xresources`.
~/.colors | Палитры терминала, указывать в `~/.Xresources` строка `#include ".colors/sn"`.
~/.zshrc | Конфиг оболочки $SHELL.
~/.alias_zsh | Алиасы и функции zsh, сокращения команд терминала.

Это основа, все остальное в `~/` и `~/.config`.

## Утилиты

Name | Описание
--- | ---
neofetch, fetch | информация о системе. `~/.bin/fetch`.
lxappearance, qt5ct | настройка внешнего вида.
lxrandr | разрешение экрана.
gotop | Консольный системный монитор.
gufw | межсетевой экран.
ranger, thunar | файловые менеджеры.
fzf | инкрементальный поиск, `zz`.
nano, micro | консольный текстовый редактор, привычные клавиши:) ctrl+s - сохранить, ctrl+q - выход и т.д.
leafpad | Gui текстовый редактор.
xreader | просмотр pdf.
viewnior | просмотр изображений.
ncmpcpp, audacious | музыкальный плеер.
cava | визуализатор.
mpv, smplayer | видео плеер.
youtube-dl, straw-viewer, streamlink | скачивание, просмотр, просмотр стриминга.
simplescreenrecorder | Запись экрана.
flameshot | скриншоты.
keepassxc | менеджер паролей.
veracrypt | шифрование файлов.
pavucontrol | управление звуком.
file-roller | менеджер архивов.
timeshift | резервное копирование.
tmux | терминальный мультиплексор.
rxrun.sh | Tmux с 3 табами. `~/.bin/rxrun.sh`.

Еще скрипты: `~/.bin`.

Полный список пакетов: [packages.x86_64](https://github.com/ctlos/ctlosiso/blob/v0.4.0-bdsm/packages.x86_64).

Комментарии приветствуются. Вступай в telegram чат: [t.me/ctlos](https://t.me/ctlos).
