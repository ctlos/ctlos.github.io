---
title: "{{ replace .Name "-" " " | title }}"
description: ""
lead: ""
date: {{ .Date }}
weight: 50
images: ["{{ .Name | urlize }}.jpg"]
contributors: []
draft: true
comments: true
---

{{< img src="{{ .Name | urlize }}.jpg" alt="{{ replace .Name "-" " " | title }}" caption="{{ replace .Name "-" " " | title }}" class="wide" >}}
