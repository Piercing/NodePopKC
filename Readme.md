
# NodePop

Api for the iOS/Android apps.

## URL Deploy

### Install dependencies

    npm install

### Configure

Review models/db.js to set database configuration

### Init database

    npm run installDB

## Start

To start a single instance:

    npm start

To start in cluster mode:

    npm run cluster

To start a single instance in debug mode:

    npm run debug (including nodemon & debug log)


## API v1 info


### Base Path

The API can be used with the path:
[API V1](/apiv1/anuncios)

### Security

The API uses JSON Web Token to handle users. First you will need to call apiv1/usuarios/register to create a user.

Then call apiv1/authenticate to obtain a token.

Next calls will need to have the token in:

- Header: x-access-token: eyJ0eXAiO...
- Body: { token: eyJ0eXAiO... }
- Query string: ?token=eyJ0eXAiO...

### Language

All requests that return error messages are localized to english, if you want to
change language make the request with the header x-lang set to other language,
i.e. x-lang: es

### Error example

    {
      "ok": false,
      "error": {
        "code": 401,
        "message": "Authentication failed. Wrong password."
      }
    }

### POST apiv1/usuarios/register

**Input Body**: { nombre, email, clave}

**Result:**

    {
      "ok": true,
      "message": "user created!"
    }

### POST /apiv1/authenticate

**Input Body**: { email, clave}

**Result:**

    {
      "ok": true,
      "message": "Enjoy your token!",
      "token": "eyJ0eXAiOiJKV1Qi..."
    }

### GET apiv1/anuncios

#### Input Query:

start: {int} skip records

limit: {int} limit to records

sort: {string} field name to sort by

total: {bool} whether to include the count of total records without filters

tag: {string} tag name to filter

venta: {bool} filter by venta or not

precio: {range} filter by price range min, max

nombre: {string} filter names beginning with the string

#### Input query example:

?start=0&limit=2&sort=precio&total=true&tag=mobile&venta=true&precio<500&nombre=bi

#### Result:

    {
      "ok": true,
      "result": {
        "rows": [
          {
            "_id": "55fd9abda8cd1d9a240c8230",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "/images/anuncios/iphone.png",
            "__v": 0,
            "availableTags": [
              "lifestyle",
              "mobile"
            ]
          }
        ],
        "total": 1
      }
    }


### GET apiv1/anuncios/tags

Return the list of available availableTags for the resource anuncios.

**Result:**

    {
      "ok": true,
      "availableTags": [
        "work",
        "lifestyle",
        "motor",
        "mobile"
      ]
    }

### POST apiv1/pushtokens

Save user pushtoken { pushtoken, plataforma, idusuario}

idusuario is optional.
plataforma can be 'ios' or 'android'

**Result:**

    {
      "ok": true,
      "token": {
        "__v": 0,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGci.....",
        "plataforma": "ios",
        "createDate": "2016-04-30T02:04:21.610Z",
        "_id": "57241395ccb2ae97bcdd7ffa"
      }
    }
