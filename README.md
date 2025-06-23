# Movie Recommendation Server

This is an Express.js server for a movie recommendation application. It includes JWT-based authentication for secure API access.

## Features

- User authentication using JSON Web Tokens (JWT).
- RESTful API for managing movie recommendations.
- Lightweight and easy to set up.

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/movie-recommendation.git
   cd movie-recommendation/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=8000
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

## Running Locally

1. Start the server:

   ```bash
   npm start
   ```

2. The server will run at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/auth/login`  
  Authenticate a user and return a JWT.

- **POST** `/auth/register`  
  Register a new user.

### Movies

- **GET** `/movies`  
  Get a list of recommended movies (requires JWT).

- **POST** `/movies`  
  Add a new movie recommendation (requires JWT).

## Using JWT

1. After logging in, you will receive a JWT token.
2. Include the token in the `Authorization` header for protected routes:
   ```bash
   Authorization: Bearer <your_token>
   ```

## Development

To run the server in development mode with hot-reloading:

```bash
npm run dev
```

## Frontend repository

Here is the url for the frontkend repository [here](https://github.com/belloshehu/3mtt-moovix-client)

## License

This project is licensed under the MIT License.
