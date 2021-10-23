---
title: "{{ replace .Name "-" " " | title }}"
description: ""
lead: ""
date: {{ .Date }}
lastmod: {{ .Date }}
draft: true
images: []
menu: 
  wiki:
    title: ""
    parent: ""
weight: 999
toc: true
comments: true
---

{{< img src="{{ .Name | urlize }}.jpg" alt="{{ replace .Name "-" " " | title }}" caption="{{ replace .Name "-" " " | title }}" >}}
