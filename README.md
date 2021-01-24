# Шаблон WebAPI

Это шаболон для распространения на работе.

## Для развертывания приложения

```bash
$ npm install
```

## Запуск HTTP-сервера

```bash
# для запуска приложения
$ npm run start

# режим разработки (отслеживание изменений в *.ts файлах)
$ npm run start:dev

# production-режим
$ npm run start:prod
```

## Тестирование приложения

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Описание методов API

### Получить список всех пользователей
```bash
# точка входа
http://localhost:3001/user/allUsers

# метод
GET-запрос

# входные данные
отсутствуют

# выходные данные JSON-объект
{
  message: 'Успено',
  result: [массив данных],
}
```

## Разработчики
- [Антон Захаров](http://znode.ru)
