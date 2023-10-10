# Quadb-group-assignment


## Deployed Link :- https://qdb.onrender.com
## Demonstrating video :- https://vimeo.com/872886198?share=copy

## User Authentication API


### Overview

This API offers robust user registration and authentication capabilities, enabling users to create new accounts and securely access their accounts through authentication.

### Setup

1. Clone the repository: `(https://github.com/Sourabh12321/Qdb-assignment)`
2. Install dependencies: `npm install`
3. Create a `.env` file with the required variables:


4. Start the server: `node index.js`

### Endpoints

#### User Registration

- **Route:** `POST user/register`
- **Description:** Register a new user with a unique email address.
- **Request Body:**

```json
{
  "id":"uuid",
  "name": "User Name",
  "email": "user@example.com",
  "image":"image",
  "password": "user_password"
  "lastLogin":"time details"
}
```

- **Response:**

  - 201 Created: User registered successfully.
  - 400 Bad Request: User with the same email already exists.
  - 500 Internal Server Error: An error occurred during registration.

#### User Login

- **Route:** `POST user/login`
- **Description:** Log in an existing user with a valid email and password.
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "user_password"
}
```

- **Response:**

  - 200 OK: User login successful. Returns a JSON web token (JWT).
  - 401 Unauthorized: Wrong credentials or user not found.
  - 500 Internal Server Error: An error occurred during login.

### Dependencies

- express-rate-limiter:Set the Limit.
- bcrypt: Password hashing library.
- express: Web framework for Node.js.
- jsonwebtoken (JWT): Token-based authentication library.
- squelize: Connection to Mysql server.
- uuid: Random string.
- dotenv: Environment variable management.

### Usage

1. Register a new user by making a POST request to `user/register`.
2. Log in a user by making a POST request to `user/login`.
3. Use the returned JWT token for authenticated requests.


## User Management API

### Overview

This API manages books in a library. It allows you to add, update, delete, list users, and .

### Endpoints

#### Add Book Details

- **Route:** `GET user/details`
- **Description:** Get the details of the users.
- **Request Body:**

- **Response:**

  - 201 OK: Get all the users.
  - 400 Bad Request: User not found
  - 500 Internal Server Error: An error occurred during user getting.

#### Update user

- **Route:** `PUT user/update/:id`
- **Description:** Update user details by id.
- **Request Body:**

```json
{
"name":"Name",
"email":"Email",
"password":"Password" ,
"image": "Image",
"lastLogin": "Login details",
}
```

- **Response:**

  - 200 OK: User details updated successfully.
  - 404 Not Found: User not found.
  - 500 Internal Server Error: An error occurred during user update.

#### Delete User

- **Route:** `DELETE user/delete/:id`
- **Description:** Delete a book by id.
- **Response:**

  - 200 OK: User deleted successfully.
  - 404 Not Found: User not found.
  - 500 Internal Server Error: An error occurred during User deletion.

#### Image of User

- **Route:** `GET user/image/:id`
- **Description:** `Get the user image`.
- **Response:**

  - 200 OK: Returns a User Image.
  - 500 Internal Server Error: An error occurred during image retrieval.


---
