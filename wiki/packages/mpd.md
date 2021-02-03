---
layout: default
title: Mpd и ncmpcpp
menus:
  packages:
    title: Mpd и ncmpcpp
    weight: 3
post_video: lA4OYDXgnfs
---

Настройка mpd сервера и консольного плеера ncmpcpp. Локальное и удаленное управление.

- [Digital Ocean Bonus 100$](https://m.do.co/c/49c4dbf3d0ca)
- [Проголосуй за следующее видео](https://forms.gle/LXiM2nLxKRuJt9SA9)

## Установка локально

Локально, на своей машине установите пакеты.

```bash
yay -S mpd mpc ncmpcpp mpv
```

## Конфигурация mpd

```bash
mkdir -p ~/.config/mpd

nano ~/.config/mpd/mpd.conf
```

> Важно, указывайте именно `0.0.0.0`, а не `localhost` и не `127.0.0.1`.

```bash
bind_to_address "0.0.0.0"
port "6600"

music_directory "/media/files/mega/music"
playlist_directory "~/.config/mpd/playlists"
db_file "~/.config/mpd/db"
log_file "/tmp/logmpd"
pid_file "~/.config/mpd/pid"
state_file "~/.config/mpd/state"
auto_update "yes"
auto_update_depth "2"

audio_output {
type "pulse" # or pulse,alsa
name "MPD live"
}

audio_output {
type   "fifo"
name   "MPD FIFO"
path   "/tmp/mpd.fifo"
format "44100:16:2"
}
```

## Конфигурация ncmpcpp

```bash
mkdir ~/.ncmpcpp

nano ~/.ncmpcpp/config
```

```bash
{% raw %}
mpd_host = localhost
mpd_port = 6600
mpd_crossfade_time = 2
visualizer_data_source = /tmp/mpd.fifo
visualizer_output_name = "Visualizer feed"
visualizer_in_stereo = no
visualizer_type = spectrum
visualizer_look = ●┃
visualizer_color = cyan, green, yellow, magenta, red
song_list_format = "{{%a - %t}|{%f}}{$R%l}"
song_status_format = "{{%a{ $2//$9 %b{, %y}} $2//$9 }{%t$/b}}|{$b%f$/b}"
song_library_format = {{%a - %t} (%b)}|{%f}
now_playing_prefix = "$b$5"
now_playing_suffix = "$/b$9"
playlist_display_mode = classic
autocenter_mode = yes
progressbar_look = "▃▃▃"
header_visibility = no
statusbar_visibility = no
titles_visibility = no
follow_now_playing_lyrics = no
enable_window_title = no
external_editor = nano
colors_enabled = yes
empty_tag_color = red
header_window_color = yellow
volume_color = yellow
state_line_color = red
state_flags_color = yellow
main_window_color = default
color1 = red
color2 = red
progressbar_color = black
progressbar_elapsed_color = red
statusbar_color = default
alternative_ui_separator_color = magenta
window_border_color = yellow
active_window_border = magenta
execute_on_song_change = notify-send "Now Playing ♫" "$(mpc current)"
{% endraw %}
```

## Настройка на сервере

Достаточно скопировать данные конфиги на сервер. Замените юзера и ip.

```bash
scp -r ~/.ncmpcpp cretm@134.122.88.241:~/

ssh cretm@134.122.88.241 "mkdir -p ~/.config/mpd"
scp -r ~/.config/mpd/mpd.conf cretm@134.122.88.241:~/.config/mpd

# login
ssh cretm@134.122.88.241
```

И в конфиг mpd добавить секцию `http` после `pulse`.

```bash
nano ~/.config/mpd/mpd.conf
```

```bash
audio_output {
  type "httpd"
  name "HTTP mpd"
  encoder "vorbis"
  port "8000"
  bitrate "128"
  format "44100:16:1"
  always_on "yes"
  tags "yes"
}
```

## Установка на сервере

```bash
ssh cretm@134.122.88.241

yay -S mpd ncmpcpp
```

## Запуск сервиса

Добавление в автозапуск системд сервиса и запуск от юзера. Это нужно выполнить везде.

```bash
systemctl --user enable --now mpd
```

## Запуск потока

```bash
mpv http://dev.ctlos.ru:8000
# или ip
mpv http://134.122.88.241:8000
```

## Управление воспроизведением

```bash
ncmpcpp -h dev.ctlos.ru
# или ip и порт
ncmpcpp -h 134.122.88.241 -p 6600
```

Если зашли по ssh, то дополнительные флаги не нужны.

```bash
ssh cretm@134.122.88.241

ncmpcpp
```

## Ссылки по теме

- [Digital Ocean Bonus 100$](https://m.do.co/c/49c4dbf3d0ca)
- [Mpd](https://wiki.archlinux.org/index.php/Music_Player_Daemon)
- [Mpd Tips](https://wiki.archlinux.org/index.php/Music_Player_Daemon/Tips_and_tricks)
- [ncmpcpp](https://wiki.archlinux.org/index.php/ncmpcpp)
- [Config dotshare](http://dotshare.it/category/mpd/ncmpcpp/)
