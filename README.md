# Voice Terminal Unit Back-end

Back-end for Voice Terminal Unit

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Create .env file that contains your database setting such as hostname, username, password, database name, and secret key for authentication purpose.

```
DB_HOST = localhost
DB_USER = postgres
DB_PASSWORD = 123
DB_DATABASE = voiceterminalunit-dev

SERVER_PORT = 8080
WEBSOCKET_PORT = 3000

SECRET_KEY = voice-terminal-unit
```

### Installing

Clone this repository then run

```
sudo npm install
```

After all packages installed, place the .env files on this app folder. The directory should be like this

```
├── .env
├── package-lock.json
├── package.json
└── src
    ├── config
    ├── controllers
    ├── logs
    ├── middleware
    ├── models
    ├── routes
    ├── server.js
    └── utils
```

## Running the program

```
npm run devStart
```

## Access Documentation

This application documentation can be accesed through:

[http://localhost:8080/docs](http://localhost:8080/docs/)

## Built With

-   [Express](https://expressjs.com/) - Node JS Framework used to create API
-   [Sequelize](https://sequelize.org/) - ORM
-   [Swagger](https://swagger.io/) - Used to create application documentation
