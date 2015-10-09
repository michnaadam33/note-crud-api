# Simple node.js CRUD Rest Api
## Before you start
### Clone project

    git clone https://github.com/michnaadam33/note-crud-api.git
### Install dependencies

    cd <project_path>
    npm install
### Migration
To execute the migrations
    
    cd <project_path>
    ./node_modules/sequelize-cli/bin/sequelize db:migrate

## Run REST Api
To start api you need execute

`node index.js` or `npm start`

## Start test
To execute the tests, start your api with

`cd <project_path>`

`node index.js` 

and then in another shell run

`mocha` or `./node_modules/mocha/bin/mocha`
   
## Configuration
### Config database
Defautl database config `config/config.json`

    {
      "dialect": "sqlite",
      "storage": "noteDB.db"
    }

### Config server
Default server port config 'config/configServer.json`

    {
      "port": 2468
    }
