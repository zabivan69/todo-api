## Description

Todo-api предоставляет REST API, GraphQL и gRPC.
<br><br>


<strong>
<em>
Для запуска API необходимо наличие установленного Docker и Docker compose.
</em>
</strong>
<br>

После клонирования репозитория просто запустите следующую команду

```bash
$ yarn run:todo-api
```

## REST API DOCS
Refresh token хранится в cookie (в параметрах axios нужно передавать опуию { withCredentials: true })
<br><br>
Для доступа к Swagger документации следует перейти на

```
http://localhost:5000/docs#/
```

## GraphQL DOCS

Для доступа к GQL playground следует перейти на

```bash
http://localhost:5000/graphql
```

## gRPC DOCS

<strong>
<em>
Для доступа к gRPC API следует отправлять запросы на http://localhost:5001
</em>
</strong>

<br>

По пути src/modules в папках Auth, User и Tasks можно найти proto файлы, благодаря которым станет ясно в каком виде должно быть тело сообщения на API, а также в каком виде придет ответ на клиент.
<br>
