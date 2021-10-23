---
title: Настройка git и использование
menu:
  wiki:
    title: Git Start
    parent: "other"
weight: 40
---

## Настройка git

Конфигурация.

```bash
git config --global user.name "ctlos"
git config --global user.email "ctlos@protonmail.com"
```

Генерация ssh-ключей.

```bash
ssh-keygen -t rsa -b 4096 -C "ctlos@protonmail.com"
```

Забрать ключ в `~/.ssh` имя `id_rsa.pub`.

## Использование

Инициализация.

```bash
git init
```

Статус.

```bash
git status
```

Игнорирование файлов и каталогов `.gitignore`.

Добавление изменений.

```bash
git add .
git commit -m "test"
```

## Работа с github

Создание репозитория на github.com.

```bash
git remote add origin https://github.com/ctlos/ctlosiso
git remote add origin git@github.com:ctlos/ctlosiso.git
```

Отменить регистрацию удаленного репозитария.

```bash
git remote rm origin
```

Отправка на github.com.

```bash
git push -u origin master
git push --set-upstream origin master
```

Клонирование.

```bash
git clone https://github.com/ctlos/ctlosiso
```

Ssh.

```bash
git clone git@github.com:ctlos/ctlosiso.git
```

Или ветку.

```bash
git clone -b openbox git@github.com:ctlos/ctlosiso.git
```

Список репозиториев.

```bash
git remote
```

Отправка на github.

```bash
git push ctlosiso master
```

Версия проекта tag.

```bash
git tag -f v1.0.0

git push origin v1.0.0

git tag -a v1.0.0 -m "Release of version 1.0.0"
git push --tags

# удалить tag ветку локально
git tag -d v1.0.0
# удаленно
git push --delete origin v1.0.0
```

Релиз с созданием тега.

```bash
pacman -S hub
# черновик
hub release create -d -a ctlos.iso -m "release test" -t "openbox" tag-test
# публикация с привязкой к ветки и создание тега
hub release create -a out/ctlos.iso -m "ctlos openbox 1.3.0" -t "openbox" v1.3.0-ob
# script ~/.bin/grel.sh
grel.sh v1.3.0-ob openbox
```

Новая ветка.

```bash
git branch work
```

Просмотр веток локально.

```bash
git branch
```

Просмотр веток и удаленных.

```bash
git branch -a
```

Создание локальных веток из удаленных.

```bash
git branch openbox origin/openbox
git branch xfce origin/xfce
git branch budgie origin/budgie
```

Отправка ветки на github.

```bash
git push origin dev
```

Перемещение по веткам.

```bash
git checkout work
```

Получить удаленную ветку.

```bash
git checkout -b bspwm origin/bspwm
```

Слияние веток. Перед этим переключить на ветку в которую сливаем.

```bash
git merge work
```

Удаление веток.

```bash
git branch -D work

git push origin -d work
```

Просмотр изменений.

```bash
git log
```

Откат(предварительно, получить хэш).

```bash
git reset --hard a3775a5485af0af20375cedf46112db5f813322a
git push --force
```
