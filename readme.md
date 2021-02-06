# Task Manager

Task Manager is a simple back-end application for managing tasks

## Installation

Clone this repository then use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install) to install dependencis.

```bash
$ yarn
```
## Set Up a MySQL Server

### Docker

Simply run the following command, where <some-mysql> is docker container name and <my-secrect-pw> is database password for root user

```bash
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5.7
```

### Without Docker

Without docker you can simply create a local mysql database and use it instead.
Keep in mind that this application was built on **mysql 5.7**, others versions might need further configuration

## Connecting with mysql

On root folder, you'll simply find **ormconfig.json**. There you'll be able to set **host**, **port**, **user** and **password** to connect with your database.

Here's an example of how it should look

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": "3306",
  "username": "root",
  "password": "admin1234",
  "database": "task_manager",
  "entities": [
    "./src/models/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

```

## Migrations

### Setting up

To be able to run migrations, you'll first need to manually create a database called  ***task_manager***

### Running migrations

To run migrations, simply run this command

```bash
yarn typeorm migration:run
```


## Running Task Manager

To start the application, simply run

```bash
$ yarn dev:server
```

This application is set for running on port **3333**. You can easily change that on **server.ts**. Just set first argument from listen to desired port

```javascript
app.listen(3333, () => {
  console.log('Server started at port 3333');
});
```

## Usage

You can check [API's documentation](https://documenter.getpostman.com/view/3466774/TW74j5Nd) with postman here

Or

You can import ***Insomnia_task_manager.json*** on insomnia app.

## Authors

[Antony Luan](https://github.com/antonylrds)


## License
[MIT](https://choosealicense.com/licenses/mit/)
