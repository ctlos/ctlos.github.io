---
title: "Релиз {{ replace .Name "-" " " | title }}"
description: ""
lead: ""
date: {{ .Date }}
images: ["{{ .Name | urlize }}.png"]
contributors: ["creio"]
draft: false
comments: true
---

{{< img src="{{ .Name | urlize }}.png" alt="{{ replace .Name "-" " " | title }}" caption="{{ replace .Name "-" " " | title }}" class="wide" >}}

## Добавлено:

- новые функции
-

## Обновлено:

- обновления
-

## Устарело:

- устаревшие функции, которые будут удалены в следующих (минорных) версиях
-

## Удалено:

- удаленные функции
-

## Исправлено:

- исправленные баги и рефакторинг
-

## Исходники

- [v](https://github.com/ctlos/ctlosiso/releases/tag/v).
