---
layout: default
title: Запуск трансляции на youtube и livepeer
menus:
  packages:
    title: Ffmpeg stream
    weight: 4
post_video: 9YXqvN8yU1I
---

Стриминг с помощью проекта [live-stream-radio](https://torch2424.github.io/live-stream-radio/#/). Потребуется nodejs lts и ffmpeg.

Ffmpeg — мощный инструмент конвертирования, кодирования и записи чего угодно.

```bash
yay -S ffmpeg
```

- Результат с live-stream-radio [youtu.be/Glu60hqtptc](https://youtu.be/Glu60hqtptc).
- Результат на чистом ffmpeg [youtu.be/LC640rkEs3Y](https://youtu.be/LC640rkEs3Y).

## Устновка nvm

Скопируйте команду `curl` в [репо nvm](https://github.com/nvm-sh/nvm), так как версия может изменится.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

И добавьте в конце `~/.zshrc` или `~/.bashrc` переменные среды.

```bash
export NVM_DIR="$HOME/.config/nvm"

# Lazy load
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  NODE_GLOBALS=(`find $NVM_DIR/versions/node -maxdepth 3 -type l -wholename '*/bin/*' | xargs -n1 basename | sort | uniq`)
  NODE_GLOBALS+=("node")
  NODE_GLOBALS+=("nvm")
  # Lazy-loading nvm + npm on node globals
  load_nvm () {
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  }
  # Making node global trigger the lazy loading
  for cmd in "${NODE_GLOBALS[@]}"; do
    eval "${cmd}(){ unset -f ${NODE_GLOBALS}; load_nvm; ${cmd} \$@ }"
  done
fi
```

## Установка npm

Установите `nodejs` lts версию, `npm` идет в комплекте.

```bash
nvm install --lts
```

Проверить версии.

- `node -v`
- `npm -v`

## Live stream radio

Исходники проекта [live-stream-radio](https://github.com/torch2424/live-stream-radio). Установить глобально `-g`.

```bash
npm install -g live-stream-radio
```

### Создание проекта

```bash
live-stream-radio --generate stream
```

### Конфигурация

Замените значение `stream_key` на свой ключ youtube трансляции.

```bash
nano ~/stream/config.json
```

### Запуск стрима

Перед запуском закиньте mp3 файлы в `~/stream/audio`.

```bash
live-stream-radio --start stream
```

## Чистый ffmpeg

Создайте дерево директорий и скрипт `msrt.sh`. В скрипте замените значения `KEY`.

```bash
mkdir ~/stream/{out,music,audio}
```

- `music` тут храним всю музыку.
- `audio` сюда копируем нужное для стрима.
- `out` сюда упадут переименованные файлы `1.mp3,2mp3...`.

Такой костыль с переименованием, так как ffmpeg сыпет ошибки из-за содержания в именах пробелов и скобок.

```bash
nano ~/stream/msrt.sh
```

```bash
#! /bin/bash

STREAM_URL="rtmp://a.rtmp.youtube.com/live2"
KEY="bla-bla-bla"

# STREAM_URL="rtmp://fra-rtmp.livepeer.com/live"
# KEY="bla-bla-bla"

FOLDER="audio"
out="out"

rm -rf $out/*
j=0;
for i in $FOLDER/*.mp3; do
  let j+=1;
  cp -r "${i}" $out/$j.mp3;
done

rm music.txt
for i in $out/*.mp3
do
  printf "file '%s'\n" $i >> music.txt
done

ffmpeg -f concat -i music.txt -c copy -f mpegts -y transport.ts 2> /dev/null &
# -bsf:v h264_mp4toannexb

if [ "$1" = "-s" ]; then
ffmpeg \
  -re -fflags +genpts -stream_loop -1 -i transport.ts \
  -filter_complex "[0:a]avectorscope=s=854x480:zoom=1.2:rc=40:gc=160:bc=80:rf=15:gf=10:bf=5,format=yuv420p[v]" \
  -map "[v]" -map 0:a -r 20 -g 40 \
  -pix_fmt yuv420p -x264-params keyint=40:min-keyint=40:scenecut=-1 \
  -s 854x480 -b:v 1000k -b:a 128k -ar 44100 -acodec aac \
  -vcodec libx264 -preset superfast -bufsize 512k -crf 18 -threads 2 \
  -f flv -flvflags no_duration_filesize "$STREAM_URL/$KEY"
fi
```

Сделайте его исполняемым.

```bash
cd ~/stream
chmod +x msrt.sh
```

Закиньте нужные mp3 файлы в директорию `~/stream/audio`.

Запуск скрипта `./msrt.sh` без аргумента, скопирует содержимое `~/stream/audio` с переименованием в `~/stream/out`, создаст файл `~/stream/transport.ts` и список `~/stream/music.txt`.

Запуск скрипта `./msrt.sh -s` с аргументом повторит первое действие и запустит стрим в бесконечном цикле. Запустить лучше в `tmux` вкладке и пусть работает, остановить как обычно `ctrl+c`. В другой вкладке можно манипулировать файлами и выполнять перестроение `~/stream/transport.ts`, запустив без аргумента `./msrt.sh`, не останавливая поток.

Длительность `ffmpeg -i transport.ts`, смотри `Duration: 00:16:50.86` длительность в сумме.

## Livepeer

Создайте бесплатный аккаунт в [livepeer.com](https://livepeer.com/), создайте stream.

Ссылка стрима, публичный адрес, запустить в проигрывателе или на веб странице, ей следует делиться.

```bash
https://fra-cdn.livepeer.com/hls/11af93cghjfgjpqz6a/index.m3u8
```

RTMP ingest URL 1 подставьте в `STREAM_URL` и Stream key в `KEY`, как вы уже наверняка поняли это скрытые данные, имея доступ к ним любой может вещать на адрес выше.

```bash
STREAM_URL="rtmp://fra-rtmp.livepeer.com/live"
KEY="bla-bla-bla"
```

Скопируйте и сохраните код ниже в файл `index.html`, отредактируйте в нем строку с url стрима, замените на свой.

```bash
var videoSrc = 'https://fra-cdn.livepeer.com/hls/z8kdh258fwnopq14/index.m3u8';
```

Исходник.

```bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>live stream</title>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css">
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</head>
<body>
  <div class="container">
  <div class="row">
    <div class="col-sm-8">
      <div class="card fluid">
        <h1>Stream music</h1>
        <video id="video" class="" controls></video>
      </div>
    </div>

    <div class="col-sm-8">
      <p>Hls live stream.</p>
    </div>
  </div>
</div>

<script>
var video = document.getElementById('video');
var videoSrc = 'https://fra-cdn.livepeer.com/hls/z8kdh258fwnopq14/index.m3u8';
if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = videoSrc;
} else if (Hls.isSupported()) {
  var hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
}
</script>
</body>
</html>
```

Вот и все. Этот файл можно открыть с помощью браузера локально, или закинуть на какой-либо сервер, хостинг. Тем самым получить независимую трансляцию от youtube и стримить туда домашнее порно :). Скрипт можно легко адаптировать и под видео файлы, но это уже другая история.

> Если Вы знаете более изящные способы, или имеете какие-либо идеи, дайте мне знать в [telegram](https://telegram.me/ctlos), там же можно обсудить, задать вопрос по этой теме.

Всем добра, любви и процветания! До свидания.

## Ссылки

- [live-stream-radio](https://torch2424.github.io/live-stream-radio/#/)
- [creating-music-videos](https://dev.to/darkhist/creating-music-videos-with-ffmpeg-40g2)
- [visualization-tricks](https://lukaprincic.si/development-log/ffmpeg-audio-visualization-tricks)
- [ffmpeg_audio_visualisation](https://www.extua.pw/blog/2018/11/25/ffmpeg_audio_visualisation/)
- [Repeat Video ffmpeg](https://video.stackexchange.com/questions/12905/repeat-loop-input-video-with-ffmpeg)
- [Music](https://twitchmusic.carrd.co/)
