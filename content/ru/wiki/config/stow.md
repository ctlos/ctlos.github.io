---
title: Stow
menu:
  wiki:
    parent: "config"
weight: 40
---

## Stow

[GNU Stow](https://www.gnu.org/software/stow/) — это менеджер символьных ссылок. Он позволяет управлять файлами конфигурации и установкой программ из исходников.
При помощи Stow можно устанавливать программы из исходных кодов в обход менеджера пакетов, не боясь сломать систему.
Также им удобно управлять файлами конфигурации (далее дот-файлами) в домашнем каталоге пользователя.

### Управление дот-файлами

Пример - конфиг alacritty. Хранить все наши конфиги будем в `$HOME/dotfiles/`

alacritty.toml должен находиться в `$HOME/dotfiles/alacritty/.config/alacritty/`, в `~/.config/` не должно быть папки alacritty.

В итоге softlink конфига генерируется так

```bash
cd ~/dotfiles/
stow alacritty
```

А чтобы убрать softlink конфига

```bash
cd ~/dotfiles/
stow -D alacritty
```

В итоге вы можете менять файл по пути `$HOME/dotfiles/alacritty/.config/alacritty/alacritty.toml` или по пути `$HOME/.config/alacritty/alacritty.toml`, меняться будет везде, так по сути все конфиги будут физически находиться в `$HOME/dotfiles/`

Примерно такой путь должен быть в dotfiles: `~/dotfiles/<название для команды stow>/<.config или другая папка, в которой должен лежать файл>`

Примеры:

```bash
~ » tree -a ~/dotfiles
├── alacritty
│   └── .config
│       └── alacritty
│           └── alacritty.toml
├── bin
│   └── .bin
│       ├── tmrun.sh
│       └── translate.sh
├── docker
│   └── Documents
│       └── Projects
│           └── docker
│               └── docker-compose.yml
```

### Git

В итоге можно держать все конфиги в git и потом раскатывать все конфиги удобным образом через символьные ссылки.
