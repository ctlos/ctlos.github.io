---
title: Работа с Netcat, ssh, rsync
post_video: eyULZXXs_Wk
menu:
  wiki:
    title: Netcat, ssh, rsync
    parent: "backup"
weight: 30
---

## Установка **nc** и **pv**

```bash
sudo pacman -S gnu-netcat pv
```

Примеры передач.

```bash
cat dump.iso | pv -b | nc -l 3333

dd if=/dev/sdb5 | gzip -9 | nc -l 3333

tar -czf - /etc/ | pv -b | nc -l 3333
```

Примеры получения.

```bash
nc 187.187.55.18 3333 | pv -b > dump.iso

nc 187.187.55.18 3333 | pv -b > ddsdb5dump.img.gz

nc 187.187.55.18 3333 | pv -b > dump.tar.gz
```

## Пример ssh туннеля

Это нужно в том случае, если нет доступа к порту `3333`. Вся передача шифруется, т.к. ssh.

Создаем мост(туннель) на ip `127.0.0.1`(localhost), на порт `23333`. `-p 22` Это стандартный ssh порт, обычно его меняют.

```bash
ssh -p 22 -f -L 23333:127.0.0.1:3333 name@187.187.55.18 sleep 10; \
nc 127.0.0.1 23333 | pv -b > ctlos.iso

# проброс порта
ssh -p 22 -fN -L 23333:127.0.0.1:3333 name@187.187.55.18
```

## scp

С локалки на удаленнку.

```bash
scp -P 2222 file.txt file2.txt name@187.187.55.18:/home/user/dir

scp -P 2222 -r dir1 name@187.187.55.18:/home/user/dir2
```

С удаленки на локалку.

```bash
scp -P 2222 name@187.187.55.18:file.txt /home/user/dir

scp -P 2222 name@187.187.55.18:~/\{file1,file2,file3\} .

scp -P 2222 -r name@187.187.55.18:/home/dir/ /home/user/dir/
```

С одного сервака на другой.

```bash
scp name@187.187.55.18:/dir/file.txt name@198.198.188.18:/name/dir/
```

## Синхронизация rsync

Установка **rsync**.

```bash
sudo pacman -S rsync
```

На сервере нужно создать диреторию `/dump`, запустить сервис(daemon), настроить конфиг и открыть 873 порт(tcp).

```bash
sudo systemctl start rsyncd.service
```

uid - пользователь на сервере, gid - группа в которой он состоит(обычно users). Создаем на сервере `/dump` и даём ему права.

```bash
sudo mkdir /dump
sudo chown username:users /dump
```

Конфиг: `/etc/rsyncd.conf`. Укажите ip в `hosts deny` с которого вы подключаетесь.

```bash
syslog facility=daemon
pid file=/var/run/rsyncd.pid
transfer logging = yes
log file = /var/log/rsyncd.log
max connections = 10
exclude = lost+found/
dont compress = *.gz *.tgz *.zip *.z *.rpm *.deb *.iso *.bz2 *.tbz

[dump]
comment = rsync open for dump
uid = username
gid = users
#auth users = st
#secrets file = /etc/rsyncd.scrt
path = /dump/
list = yes
read only = no
hosts allow = 188.128.110.170
hosts deny = *
```

После изменения конфига сделать рестарт. Авторизацию по паролю я не использую, поэтому две строки закомментил(#).

```bash
sudo systemctl restart rsyncd.service
```

По моим тестам лучше передавать не сжатые данные(Синхронизацция).

Отправка файла и пример директории.

```bash
rsync -auvz -L -P ~/test.sfs rsync://187.187.55.18/dump

rsync -auvz -L -P ~/dir/* rsync://187.187.55.18/dump
```

Получение.

```bash
rsync -auvz -L -P rsync://187.187.55.18/dump ~/.dump/
```

Ssh.

```bash
rsync -auvz -L -P -e "ssh -p 2222" name@187.187.55.18:/path/to/copy /local/path

rsync -auvz -L -P -e "ssh -p 2222" /local/path name@187.187.55.18:/path/to/copy
```
