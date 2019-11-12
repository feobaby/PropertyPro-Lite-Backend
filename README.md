# PropertyPro-Lite

[![Build Status](https://travis-ci.org/funmi5/PropertyPro-Lite.svg?branch=development)](https://travis-ci.org/funmi5/PropertyPro-Lite)
[![Test Coverage](https://api.codeclimate.com/v1/badges/aa1fc0ec7bfc11cde5c6/test_coverage)](https://codeclimate.com/github/funmi5/PropertyPro-Lite/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/aa1fc0ec7bfc11cde5c6/maintainability)](https://codeclimate.com/github/funmi5/PropertyPro-Lite/maintainability)

This is a platform where people can create and/or search properties for sale or rent.

## Features

A user/agent:
- can sign up and sign in.
- can get(view) a single/all property adverts.
- can get specific types of a property.
- can flag a posted property AD as fraudulent.

An agent:
- can post a property advert.
- can update the details of a property advert. 
- can delete a property advert.
- can mark a property advert as sold.
- can get specific types of a property.

### All what a user can do, an agent can do too interchangeably. They are both users.

## Getting started

- Have Git, Node.js installed on your computer.
- Use this link: ```https://github.com/funmi5/PropertyPro-Lite.git``` to clone the project.

```
-  Cd into the project and run **npm install** to install necessary modules
```
```
-  Run **npm start** to start the server
```
```
-  Create a .env file and add the necessary variables to your file, follow the .env-sample.
```
```
-  Run **npm test** to run unit tests
```

### Authentication
---

- JsonWebToken

### HTTP Request Methods
---

These are the HTTP request methods used in this project.

| Method   | Action                                                      |
|---       | ---                                                         |
| `GET`    | This method is used to *get* a resource                     |
| `POST`   | This method is used to *create* a resource or *send* data   |
| `PATCH`  | This method is used to *update* a resource                  |
| `DELETE` | This method is used to *delete* a resource                  |

### HTTP Response Status Codes
---

These are the HTTP response codes used in this project.

| Status Codes | Indication                                                                                            |
|   ---        | ---                                                                                                   |
|  `200`       | This `OK` status code indicates that a request has succeeded                                          |
|  `201`       | This `created` status code indicates that a resource has been created                                 |
|  `204`       | This `No content` status code indicates a request has succeeded and the current page need not be left |
|  `400`       | This `bad request error` status code indicates that the request sent to the server is incorrect       |
|  `404`       | This `not found` status code indicates that the request/resource asked for can not be found           |
|  `401`       | This `unauthorized error` status code indicates that the credentials sent are incorrect               |
|  `409`       | This `conflict` status code indicates that the request--response asked for is conflicted              |
|  `422`       | This `Unprocessable Entity` status code indicates that the request--response can not be processed             |

### The API Routes
---

This features all the routes created in this project.

| API routes(url)                      | Method   | Description                                         |
| ---                                  | ---      | ---                                                 |
| /api/v1/auth/signup                  | `POST`   | For a user to create an account                     |
| /api/v1/auth/login                   | `POST`   | For a user to log in to an account                  |
| /api/v1/post-property                | `POST`   | For a user to post a new property AD                |
| /api/v1/all-properties               | `GET`    | For a user to get all property ADs                  |
| /api/v1/one-property/:id             | `GET`    | For a user to get a single property AD              |
| /api/v1/property/type/:id            | `GET`    | For a user to get specific types of a property AD   |
| /api/v1/property/:id/sold            | `PATCH`  | For a user to mark a property AD as sold            |
| /api/v1/update-property/:id          | `PATCH`  | For a user to update a property AD                  |
| /api/v1/delete-property/:id          | `DELETE` | For a user to delete a property AD                  |
| /api/v1/property/flag/:id            | `POST`   | For a user to flag fraudulent property ADs          |


----

### Sample format to fully test this project

1. Sign up a user: https://propertypro-lite7.herokuapp.com/api/v1/auth/signup

```

{
	"first_name": "funmi",
	"last_name": "olaiya",
	"email": "funmi13@gmail.com",
	"password": "funmi.5H",
	"confirmPassword": "funmi.5H",
	"phone_number": "08022066672",
	"address": "Luke street, house 4, London."	
}

```

2. Sign in a user: https://propertypro-lite7.herokuapp.com/api/v1/auth/signin

```

{
	"email": "funmi13@gmail.com",
	"password": "funmi.5H",
}

```

Grab the token gotten from the sign in and place it in the Bearer field of postman/insomina [Bearer: token]

3. Now create a property: https://propertypro-lite7.herokuapp.com/api/v1/post-property

```

{
	"price": "30,000",
	"duration": "1 year",
	"state": "Oyo",
	"city": "Ibadan",
	"address": "No. 10, Adele street, Akobo.",
	"owner_email": "funmi@gmail.com",
	"image_url": "https://www.google.com/search?q=images&s",
	"type": "duplex"
}

```

4. Update the property you created: https://propertypro-lite7.herokuapp.com/api/v1/update-property/1

```

{
	"price": "34,000",
	"duration": "3 yeas",
	"state": "Oyo",
	"city": "Ibadan",
	"address": "No. 14, Adele Itele street, Akobo.",
	"owner_email": "funmi@gmail.com",
	"image_url": "https://www.google.com/search?q=images&s",
	"type": "flat"
}

```

5. Get the single property you created: https://propertypro-lite7.herokuapp.com/api/v1/one-property/1

6. Get all the properties you created: https://propertypro-lite7.herokuapp.com/api/v1/all-properties

7. Mark the property you created as sold: https://propertypro-lite7.herokuapp.com/api/v1/mark-property/1/sold

8. Flag a property as fradulent: https://propertypro-lite7.herokuapp.com/api/v1/property/flag/1

```

{
	"reason": "fraud",
	"description": "fraud"
}

```

9. Filter types of properties: https://propertypro-lite7.herokuapp.com/api/v1/property/type/1?type=duplex&state=oyo&&city=lon&&price=30,000&&duration=3 months


### Core links for this project:
----

<a href ="https://funmi5.github.io/PropertyPro-Lite/UI/"> - UI templates </a> - The UI templates designed for this project.

<a href = "https://pivotaltracker.com/n/projects/2355287"> - Relevant Pivotal Tracker stories</a> - The project management stories.

<a href = "https://propertypro-lite7.herokuapp.com/"> - Hosted API endpoints</a> - The back-end API endpoints hosted on heroku.

<a href ="https://propertyprolite26.docs.apiary.io/"> - Documentation </a> - Documentation of the API endpoints.

## Author
Funmilayo E. Olaiya

## Acknowledgement
Andela.

## License
This project is licensed under the MIT license.
