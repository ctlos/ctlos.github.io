---
title: "{{ replace .Name "-" " " | title }}"
description: ""
lead: ""
date: {{ .Date }}
lastmod: {{ .Date }}
images: []
menu: 
  wiki:
    title: ""
    parent: ""
weight: 999
draft: true
toc: true
comments: true
edit: true
---

{{< img src="{{ .Name | urlize }}.jpg" alt="{{ replace .Name "-" " " | title }}" caption="{{ replace .Name "-" " " | title }}" >}}
