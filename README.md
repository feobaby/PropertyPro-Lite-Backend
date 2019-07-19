# PropertyPro-Lite

[![Build Status](https://travis-ci.org/funmi5/PropertyPro-Lite.svg?branch=development)](https://travis-ci.org/funmi5/PropertyPro-Lite)
[![Coverage Status](https://coveralls.io/repos/github/funmi5/PropertyPro-Lite/badge.svg?branch=development)](https://coveralls.io/github/funmi5/PropertyPro-Lite?branch=development)
[![codecov](https://codecov.io/gh/funmi5/PropertyPro-Lite/branch/development/graph/badge.svg)](https://codecov.io/gh/funmi5/PropertyPro-Lite)
[![Test Coverage](https://api.codeclimate.com/v1/badges/aa1fc0ec7bfc11cde5c6/test_coverage)](https://codeclimate.com/github/funmi5/PropertyPro-Lite/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/aa1fc0ec7bfc11cde5c6/maintainability)](https://codeclimate.com/github/funmi5/PropertyPro-Lite/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/95a3e95068e743d0bc0aa796600be732)](https://app.codacy.com/app/funmi5/PropertyPro-Lite?utm_source=github.com&utm_medium=referral&utm_content=funmi5/PropertyPro-Lite&utm_campaign=Badge_Grade_Dashboard)
[![codebeat badge](https://codebeat.co/badges/0dd52ef8-88fb-4295-bb05-937bae6672a2)](https://codebeat.co/projects/github-com-funmi5-propertypro-lite-development)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![GitHub](https://img.shields.io/github/license/funmi5/ireporter.svg?style=popout)](https://github.com/funmi5/ireporter/blob/develop/LICENSE)

This is a platform where people can create and/or search properties for sale or rent.

## Required features

- Users can sign up and sign in.
- Users can post a property advert.
- Users can update the details of a property advert.
- Users can get(view) a single/all property adverts.  
- Users can delete a property advert.
- Users can mark a property advert as sold.
- Users can get specific types of a property.
- Admin can change the status of a record to either after record reviews.

## Other Features(optional)

- Users can reset password.
- Users can flag a posted property AD as fraudulent.
- A Google Map with Marker is displayed showing the location.

## The tools/dependencies used in the creation of this project

- Node.js & Express.
- Eslint - to follow the AirBnB style guide,
- Mocha, Chai, Istanbul & NYC for testing.
- Babel - To transpire ES6 to ES5.
- Travis CI, Coveralls, Code climate and Codacy, Codecov, Codebeat.
- Faker - to generate fake emails for unit tests.
- Nodemailer - to configure and send mails-(for reset password).
- Jsonwebtoken - to secure the endpoints.
- Moment - to grab the recent time/date.
- Bcrypt - to hash new passwords.
- pg/pg-promise - to help in DB connections.
- socketio - node.js framework server for mail connection(nodemailer)
- Apiary(API Blueprint) - to document the API endpoints.

## Getting started

- In order to clone the project;
- Have Git, Node.js and express installed on your computer.
- use this link: ```https://github.com/funmi5/PropertyPro-Lite.git``` to clone it.

```bash
-  cd into the project and run **npm start**
-  For testing(unit tests), run **npm test**
```

## Core details

### Authentication

jsonwebtoken is used in this project to secure the endpoints, <br>
the validity of the token lasts for seven days and for the sign up/sign in, <br>
it is passed through the response body, <br>
while for other routes - it is passed through a header.<br>
The header variable is: `token`

```bash
Example:
- for POST signup/signin
- {
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjM1MjY1NTYsImV4cCI6MTU2NDEzMTM1N
    n0.35RoJzU4tGbnJmrB5EHCuu5vQ5AqxYdW0g5YmM9FGQw",
    "rows": [
      {
        "user_id": 553,
        "email": "funmiolaiya676@gmail.com",
        "first_name": "Funmilayo",
        "last_name": "Olaiya",
        "password": "$2b$08$0IK8ELkFU9rTEXWCEvk/ue6wcRhe8OtNn1XrioHPRzQv33.p00vMq",
        "phone_number": "09099878775",
        "address": "No.4 Customs Road, New Bodija."
      }
    ]
  }
}

- for other endpoints
- it is set as a header; 
  `'token', token
```

### Validations

This project was well validated (the validations were passed in as a middle-ware<br>
for each of the routes <br>
POST /api/v1/auth/signup - `validated for required fields, names, password and phone number`<br>
POST /api/v1/auth/signin - `validated for matching authourized credentials and required fields`<br>
POST /api/v1/property - `validated for required fields` <br>
GET /api/v1/property/:property_id - `validated for the availaibility of the property` <br>
PATCH /api/v1/property/:property_id - `validated for the availaibility of the property and required fields` <br>
PATCH /api/v1/property/:property_id/sold - `validated for the availaibility of the property` <br>
DELETE /api/v1/property/:property_id - `validated for the availaibility of the property` <br>
POST /api/v1/property/flag  - `validated for required fields` <br>
PATCH /api/v1/resetpassword/:user_id - `validated for the availaibility of the email, and if new passwords match`

### HTTP Request Methods

These are the HTTP request methods used in this project.

| Method   | Action                                                      |
|---       | ---                                                         |
| `GET`    | This method is used to *get* a resource                     |
| `POST`   | This method is used to *create* a resource or *send* data   |
| `PATCH`  | This method is used to *update* a resource                  |
| `DELETE` | This method is used to *delete* a resource                  |

### HTTP Response Status Codes

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

### The API Routes

This features all the routes created in this project.

| API routes(url)                      | Method   | Description                                         |
| ---                                  | ---      | ---                                                 |
| /api/v1/auth/signup                  | `POST`   | For a user to create an account                     |
| /api/v1/auth/login                   | `POST`   | For a user to log in to an account                  |
| /api/v1/property                     | `POST`   | For a user to post a new property AD                |
| /api/v1/property                     | `GET`    | For a user to get all property ADs                  |
| /api/v1/property/:property_id        | `GET`    | For a user to get a single property AD              |
| /api/v1/property/type/:property_id   | `GET`    | For a user to get specific types of a property AD   |
| /api/v1/property/:property_id/sold   | `PATCH`  | For a user to mark a property AD as sold            |
| /api/v1/property/:property_id        | `PATCH`  | For a user to update a property AD                  |
| /api/v1/property/:property_id        | `DELETE` | For a user to delete a property AD                  |
| /api/v1/property/flag                | `POST`   | For a user to flag fraudulent property ADs          |
| /api/v1/resetpassword/:user_id       | `PATCH`  | For a user to reset/change password                 |

### Template User Interface(UI)

<https://github.com/funmi5/PropertyPro-Lite>

### Relevant Pivotal Tracker stories

<https://pivotaltracker.com/n/projects/2355287>

### The API endpoints are hosted on Heroku

<https://propertypro-lite26.herokuapp.com>

### The API endpoints are well documented

<https://propertyprolite26.docs.apiary.io/>

### Author

Funmilayo E. Olaiya
