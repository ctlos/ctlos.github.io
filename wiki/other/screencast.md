---
layout: default
title: Screencast, работа с видео/аудио
menus:
  other:
    title: Screencast
    weight: 5
---

Содержание
{: .text-delta }

1. TOC
{:toc}

Screencast, работа с видео/аудио. Скрипт в `~/.bin/cast`.

## Параметры записи

- Pavucontrol, 32% микрофон.
- Запись simplescreenrecorder: MKV, H.264, rate 20, superfast, vorbis 128.
- Audacity: удаляем шумы(дважды), улучшаем звук.
- ffmpeg: заменяем аудио дорожку.
- ffmpeg: перекодируем в mp4, 1080p, 30 кадров, bit rate 128k, если нужно ускоряем на 20%.
- ffmpeg: накладываем 2 аудио дорожку, зацикливаем и понижаем звук.
- Обрезаем, если нужно.


## Audacity

- Выделить фрагмент без звука, Эффекты-Noise Reduction-создать модель шума.
- Двойной клик на дорожке(выделить всю), Эффекты-Noise Reduction-ок(в 2 этапа).
- Нормализация.
- Если необходимо усиливаем звук Дб.

### Изменяем голос

- Двойной клик на дорожке(выделить всю), Эффекты-Смена высоты тона. -5, ок.
- Файл-экспорт-как wav.

## Замена аудио ffmpeg

```bash
ffmpeg -i input.mp4 -i good.wav -map 0:0 -map 1:0 -c copy output.mp4

ffmpeg -i input.mp4 -i input.wav -c:a aac -vcodec copy -map 0:0 -map 1:0 output.mp4
```

## Ffmpeg

Обрезка. Нужно высчитать `-t`.

Вырезать 5 мин.

```bash
ffmpeg -ss 01:09:00 -t 00:05:00 -i arch.mkv -c:v copy -c:a copy out.mkv
```

Обрезаем последние 2 сек. из исходника в 8 сек.(00:00:08).

```bash
ffmpeg -ss 00:00:00 -i test.mkv -c copy -t 00:00:06 test2.mkv
```

С первой минуты по вторую(фрагмент с середины).

```bash
ffmpeg -ss 00:01:00 -i video.mp4 -to 00:02:00 -c copy -copyts out.mp4
```

Удалить первые 1.30 секунды.

```bash
ffmpeg -ss 00:00:01.30 -i video.mp4 -c copy out.mp4
```

Замедление, множитель больше 1.

- Замедление в 2 раза: `ffmpeg -i arch.mp4 -vf "setpts=2.0*PTS" speed_down.mp4`

### Ускорение

- Ускорение в 2 раза: `ffmpeg -i arch.mp4 -vf "setpts=0.5*PTS" speed.mp4`
- Ускорение в 3 раза: `ffmpeg -i arch.mp4 -vf "setpts=1/3*PTS" speed.mp4`
- Ускорение в 5 раз: `ffmpeg -i arch.mp4 -vf "setpts=1/5*PTS" speed.mp4`
- Замедление в 5 раз: `ffmpeg -i arch.mp4 -vf "setpts=1*5*PTS" out.mp4`

- Убрать аудио: -an
- Убрать видео: -vn
- Сохранить оригинальные кодеки: -c copy
- Битрейт аудио: -b:a (-b:a 320k)
- Битрейт видео: -b:v (-b:v 16M)
- Количество кадров fps: -r (-r 25)
- Разрешение видео: -s (-s 1280x720)

Перед ускорением нужно убрать аудио `-an`.

```bash
ffmpeg -i arch.mkv -r 30 -s 1920x1080 out.mp4

ffmpeg -i out.mp4 -vf "setpts=0.8*PTS" speed.mp4
```

Или комплексное, примерно на 20% `atempo=1/setpts`.

```bash
ffmpeg -i arch.mkv -filter_complex "[0:v]setpts=0.8*PTS[v];[0:a]atempo=1.25[a]" -map "[v]" -map "[a]" -b:a 128k -r 30 -s 1920x1080 speed.mp4
```

Мозайка.

```bash
ffmpeg
  -i 1.avi -i 2.avi -i 3.avi -i 4.avi
  -filter_complex "
    nullsrc=size=640x480 [base];
    [0:v] setpts=PTS-STARTPTS, scale=320x240 [upperleft];
    [1:v] setpts=PTS-STARTPTS, scale=320x240 [upperright];
    [2:v] setpts=PTS-STARTPTS, scale=320x240 [lowerleft];
    [3:v] setpts=PTS-STARTPTS, scale=320x240 [lowerright];
    [base][upperleft] overlay=shortest=1 [tmp1];
    [tmp1][upperright] overlay=shortest=1:x=320 [tmp2];
    [tmp2][lowerleft] overlay=shortest=1:y=240 [tmp3];
    [tmp3][lowerright] overlay=shortest=1:x=320:y=240
  "
  -c:v libx264 output.mkv

ffmpeg -i 1.avi -i 2.avi -i 3.avi -i 4.avi -filter_complex "nullsrc=size=640x480 [base]; [0:v] setpts=PTS-STARTPTS, scale=320x240 [upperleft]; [1:v] setpts=PTS-STARTPTS, scale=320x240 [upperright]; [2:v] setpts=PTS-STARTPTS, scale=320x240 [lowerleft]; [3:v] setpts=PTS-STARTPTS, scale=320x240 [lowerright]; [base][upperleft] overlay=shortest=1 [tmp1]; [tmp1][upperright] overlay=shortest=1:x=320 [tmp2]; [tmp2][lowerleft] overlay=shortest=1:y=240 [tmp3]; [tmp3][lowerright] overlay=shortest=1:x=320:y=240" -c:v libx264 output.mkv
```

### Наложение аудио

Опция `shortest` — если аудио и видео на входе имеют разную длительность по времени, то результат будет иметь длительность самого длинного компонента.

```bash
ffmpeg -i видео.mp4 -i аудио.wav -c:v copy -c:a copy -shortest результат.mkv

mencoder -audiofile аудио.wav видео.mp4 -o результат.mp4 -ovc copy -oac copy
```

Наложение второй аудио дорожки и понижениие громкости.

```bash
ffmpeg -i video4.mp4 -i wave.mp3 -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.2[a2];[a1][a2]amerge=inputs=2" -c:v copy -c:a libmp3lame -shortest out_mp3.mp4
```

Зацикливаем 2 аудио дорожку и понижаем звук, т.к. применили `-stream_loop`, то и `-shortest` нужен.

```bash
ffmpeg -i video4.mp4 -stream_loop -1 -i bla.mp3 -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.04[a2];[a1][a2]amerge=inputs=2" -c:v copy -c:a libmp3lame -shortest out_mp3.mp4
```

## Конвертировать видео в gif

С 5 сек. на 2 сек.

```bash
ffmpeg -y -ss 5 -t 2 -i ~/.wall/bg.mp4 -filter_complex "fps=10,scale=1366:-1:flags=lanczos[x];[x]split[x1][x2]; [x1]palettegen[p];[x2][p]paletteuse" ~/.wall/out.gif
```

Изменить размер gif.

```bash
convert -resize 1366 -quality 10 .wall/wall.gif .wall/out.gif
```

## Stream

```bash
Live Stream (3000kbps)
rtmp://live.restream.io/live/key
flv, libx264, b/rate 3000, mp3 128
```

## Kdenlive

- Настроить-Параметры проекта по умолчанию-HD 1080i 30fps.

Или.

- Настроить-Параметры проекта по умолчанию-HD 1080p 60fps.
- Настроить-Окружение-Потоков обработки - 2.
- Сборка. Generic, MP4 (H264/AAC).

Ускоряем сборку на MP4 (H264/AAC). `Сборка-создать сценарий`. Отредактировать скрипт. Изменить `preset=faster` на `preset=ultrafast`. Проверить скорость работы скрипта до и после.

```bash
time ./script001.sh
```

Размер выходного файла.

```bash
du -h video.mp4
```

Результат теста. (исходник video.mkv 1:21 2,5Mb).

- HD 1080i 30fps MP4 (H264/AAC) - 7:46 4,2 Mb
- HD 1080p 60fps MP4 (H264/AAC) faster - 14:22 5,6Mb
- HD 1080p 30fps MP4 (H264/AAC) faster - 8:24 4,1Mb
- +HD 1080p 30fps MP4 (H264/AAC) ultrafast - 6:34 8.2Mb
- HD 1080p 30fps webm - 7:58 9.9Mb
