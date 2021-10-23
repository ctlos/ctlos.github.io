---
title: Использование GnuPG
menu:
  wiki:
    parent: "other"
weight: 30
---

## Цифровые подписи

[wiki.archlinux.org](https://wiki.archlinux.org/index.php/GnuPG_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).

Генерация, создание пары ключей.

```bash
gpg --full-gen-key
```

Просмотр списка ключей.

```bash
gpg --list-keys
gpg --list-secret-keys
gpg --list-public-keys
```

Id ключей.

```bash
gpg --list-public-keys --keyid-format LONG
gpg --list-secret-keys --keyid-format LONG
```

Удалить ключ.

```bash
gpg --delete-secret-keys 98F76D97B786E6A3
gpg --delete-keys 98F76D97B786E6A3
```

Редактировать ключ.

```bash
gpg --expert --edit-key ctlos@protonmail.com
```

Экспорт открытого ключа в текстовом виде.

```bash
gpg --armor --output pubkey.txt --export 98F76D97B786E6A3
```

Экспорт закрытого ключа в текстовом виде.

```bash
gpg --armor --output privkey.txt --export-secret-keys 98F76D97B786E6A3
```

Экспорт Certificate.

```bash
gpg -a --gen-revoke 98F76D97B786E6A3 > rev_cert.gpg
```

Экспорт открытого ключа на keyserver.

```bash
gpg --keyserver keys.gnupg.net --send-keys 8123459
```

Импорт открытого ключа из файла.

```bash
gpg --import key.txt
```

Или по номеру.

```bash
gpg --recv-keys 98F76D97B786E6A3
```

Импорт закрытого ключа.

```bash
gpg --allow-secret-key-import --import privkey.txt
```

Импорт открытого ключа с keyserver.

```bash
gpg --keyserver keys.gnupg.net --recv-keys 98F76D97B786E6A3
```

Поиск.

```bash
gpg --keyserver keys.gnupg.net --search-keys mail@example.com
```

Обновление.

```bash
gpg --keyserver keys.gnupg.net --refresh-keys
```

Пример подписи и проверки подписи.

```bash
gpg --detach-sign --no-armor ctlos.iso
gpg --verify ctlos.iso.sig ctlos.iso
```

Зашифровать файл.

```bash
gpg --encrypt-files -r 98F76D97B786E6A3 secret.tar
```

Расшифровать файл.

```bash
gpg -d secret.tar.asc

gpg -d secret.tar.asc > secret.tar

gpg -o secret.tar --decrypt secret.tar.asc
```

Шифровать каталог.

```bash
gpgtar --encrypt --output secret.tar -r 98F76D97B786E6A3 dir/

gpgtar -c -o secret.tar dir/
```

Просмотр.

```bash
gpgtar -t secret.tar
```

Расшифровать каталог.

```bash
gpgtar -d secret.tar
```
