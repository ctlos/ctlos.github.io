---
layout: page
title: Лог Изменений
description: История измененя Ctlos, релизы
permalink: /wiki/changelog/
comments: false
edit: false
---

Подпишись, чтобы быть в кусе новостей.

- Группа в VK: [vk.com/ctlos](https://vk.com/ctlos)
- Telegram канал: [t.me/ctlos_info](https://t.me/ctlos_info)
- Подпишись на: [RSS](https://ctlos.github.io/wiki/feed.xml)

> Последние и наиболее актуальные версии представлены на странице загрузки [ctlos.github.io/get](/get).

Пройдите [небольшой опрос](https://forms.gle/qzAUa6R4fShf3xSw7).

## Контакты

[Свяжитесь с нами](/wiki/#контакты), если у Вас есть предложения, или пожелания.

<div class="changelog">
	{% for change in site.posts %}
		<div class="changelog_item">
			<h2>{{ change.title }}</h2>
			<p><span class="text-small">{{ change.date | date: "%B %d, %Y" }}</span> <span class="badge {{ change.type }}">{{ change.type }}</span></p>
			{{ change.content }}
		</div>
	{% endfor %}
</div>
