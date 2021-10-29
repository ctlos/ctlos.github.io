---
title: "{{ replace .Name "-" " " | title }}"
description: ""
lead: ""
date: {{ .Date }}
lastmod: {{ .Date }}
images: ["{{ .Name | urlize }}.png"]
post_video:
menu: 
  wiki:
    title: "{{ replace .Name "-" " " | title }}"
    parent: ""
weight: 999
draft: true
toc: true
comments: true
edit: true
---

{{< img src="{{ .Name | urlize }}.png" alt="{{ replace .Name "-" " " | title }}" caption="{{ replace .Name "-" " " | title }}" >}}
