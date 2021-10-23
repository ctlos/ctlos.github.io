---
title: Пакетные менеджеры
menu:
  wiki:
    title: Менеджеры пакетов
    parent: "install"
weight: 30
---

Список некоторых программ Arch Wiki [List applications](https://wiki.archlinux.org/index.php/List_of_applications_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).

В Arch принято использовать консольные пакетные менеджеры. Pacman главный и установлен по умолчанию, но существуют и графические менеджеры.

Для Aur репозитория существует множество консольных пакетных менеджеров, я на текущий момент использую **yay** и он установлен во всех моих образах. Он берет на себя роль управления не только aur пакетами, но и pacman. У него те же флаги и немного своих [https://github.com/Jguer/yay](https://github.com/Jguer/yay).

## Pamac manager

Установка.

```bash
yay -S pamac-aur
```

Навигация по категориям или поиск, в настройках включите поддержку aur.

## Gnome software

Менеджер пакетов Gnome, хорошо использовать в связке с flatpak.

```bash
yay -S gnome-software gnome-software-packagekit-plugin
```

## Flatpak

Flatpak – это современный, прогрессивный формат самодостаточных пакетов для GNU/Linux. Он поддерживает рантаймы, изоляцию внутри песочниц, установку без наличия прав супер пользователя и многое другое.

Установка.

```bash
sudo pacman -S flatpak
```

Основной репозиторий flatpak [flathub.org/apps](https://flathub.org/apps).

Добавление репозитория flathub.

```bash
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

Удаление репозитория flathub.

```bash
flatpak remote-delete flathub
```

Обновление flatpak.

```bash
flatpak update
```

Поиск.

```bash
flatpak search libreoffice
```

Список пакетов в репозитории flathub.

```bash
flatpak remote-ls flathub
```

Установка пакета в домашнюю директорию.

```bash
flatpak install flathub com.valvesoftware.Steam
```

Запуск.

```bash
flatpak run com.valvesoftware.Steam
```

Список установленых пакетов.

```bash
flatpak list
```

Обновление пакета.

```bash
flatpak update com.valvesoftware.Steam
```

Обновление пакетов.

```bash
flatpak update
```

Удаление пакета.

```bash
flatpak uninstall com.valvesoftware.Steam
```

После удаления приложения могут оставаться неиспользуемые рантаймы, очистим и их.

```bash
flatpak uninstall --unused
```

### Winepak

Дополнительный репозиторий Winepak (игры, WoT и др.).

- [https://winepak.org](https://winepak.org/).
- [https://github.com/winepak/applications](https://github.com/winepak/applications).

Добавление репозитория.

```bash
flatpak remote-add --if-not-exists winepak https://dl.winepak.org/repo/winepak.flatpakrepo
```
