<div align='center'>

<h1>InstaPoll</h1>
<p>Engage your audience with real-time polls and feedback.</p>

<h4> <span> · </span> <a href="https://github.com/ibrahimhabibeg/InstaPoll/issues"> Report Bug </a> <span> · </span> <a href="https://instapoll.onrender.com"> Vist Website </a>  <span> · </span> <a href="https://github.com/ibrahimhabibeg/InstaPoll/issues"> Request Feature </a> </h4>

</div>

## Overview

**InstaPoll** is a simple polling app that allows users to create and vote on polls. Users can create a poll by entering a question and a list of options. Once a poll is created, users can share the poll with others and vote on it. The poll results are displayed in real-time, allowing users to see the current results of the poll. The app's main theme is simplicity and speed, allowing users to create and vote on polls quickly and easily without the need to create an account or log in. It is designed to be a fun and engaging way for instructors and presenters to gather feedback from their audience in real-time and add an interactive element to their presentations.

## Main Features

- Create polls with a question and multiple options.
- Share polls with a unique code.
- Vote on polls without logging in.
- View poll results in real-time.
- Edit poll options (only by the poll creator).
- Join polls using a unique code or QR code.

## Requirements

- Docker
- Docker Compose

## Technologies

- **Node.js**: Backend runtime environment.
- **TypeScript**: Used in the backend for static typing.
- **Socket.IO**: Real-time, bidirectional communication between web clients and servers.
- **Redis**: In-memory data structure store, used as a short-term database for storing poll data.
- **Docker**: Containerization platform to develop, ship, and run applications.
- **Nginx**: Web server used to serve the frontend application.
- **Chart.js**: JavaScript library for creating charts.
- **Vanilla HTML + CSS + JS**: Frontend technologies for building the user interface.

## Development Environment

When you start the app in development mode using Docker Compose, the following components will be active:

1. **Frontend**:
    - **Description**: Nginx server serving the static frontend files (HTML, CSS, JS). In the development environment, changes to the frontend files will be reflected immediately without the need to rebuild the Docker image.
    - **Access**: Open your browser and navigate to `http://localhost`.

2. **Backend**:
    - **Description**: Node.js server running the backend API.
    - **Access**: The backend API can be accessed at `http://localhost:3000`.

3. **Redis**:
    - **Description**: In-memory data structure store used to store poll data.
    - **Access**: The backend API communicates with Redis internally using the REDIS_HOST and REDIS_PORT environment variables. You don't need to worry about setting them up.

4. **Swagger UI**:
    - **Description**: A tool for visualizing and interacting with the API's documentation. You can use it to test the API endpoints and learn how to interact with the backend.
    - **Access**: Open your browser and navigate to `http://localhost:8080` to view the Swagger UI.

### Starting the Development Environment

1. Clone the repository:

```sh
git clone https://github.com/ibrahimhabibeg/InstaPoll.git
cd InstaPoll
```

2. Create a `.env` file in the `backend` directory with the following content:

```env
JWT_SECRET=your_jwt_secret
```

3. Start the development environment using Docker Compose:

```sh
docker compose -f compose.dev.yaml up --build
```

## Local Production Environment

When you start the app in production mode using Docker Compose, the following components will be active:

1. **Frontend**:
    - **Description**: Nginx server serving the static frontend files (HTML, CSS, JS). Changes to the frontend files will require rebuilding the Docker image.
    - **Access**: Open your browser and navigate to `http://localhost`.

2. **Backend**:
    - **Description**: Node.js server running the backend API.
    - **Access**: The backend API can be accessed at `http://localhost:3000`.

3. **Redis**:
    - **Description**: In-memory data structure store used to store poll data.
    - **Access**: The backend API communicates with Redis internally using the REDIS_HOST and REDIS_PORT environment variables. You don't need to worry about setting them up.

### Starting the Local Production Environment

1. Clone the repository:

```sh
git clone https://github.com/ibrahimhabibeg/InstaPoll.git
cd InstaPoll
```

2. Create a `.env` file in the `backend` directory with the following content:

```env
JWT_SECRET=your_jwt_secret
```

3. Start the production environment using Docker Compose:

```sh
docker compose up --build
```

## Production Environment (Render)

The app is deployed on Render, a cloud platform that simplifies the deployment process. We utilize Render blueprints (an Infrastructure as Code tool) to define the app's infrastructure and deploy it to Render. The services are defined in the `render.yaml` file, which includes the following components:

1. **Frontend**:
    - **Description**: Web service with docker runtime that runs the Nginx server to serve the static frontend files.
    - **Access**: The frontend can be accessed at `https://instapoll.onrender.com`
  
2. **Backend**:
    - **Description**: Web service with docker runtime that runs the Node.js server for the backend API.
    - **Access**: The backend API can be accessed at `https://instapoll-backend.onrender.com`

3. **Redis**:
    - **Description**: Managed Redis service provided by Render.
    - **Access**: The backend API communicates with Redis internally using the REDIS_HOST and REDIS_PORT environment variables. These variables are automatically set by Render.

Render automatically deploys the app when changes are pushed to the **production** branch.

## Acknowledgements

- **Dr. Marwa Fekry**: For her magnificent lectures and guidance throughout the Web Design and Development course (CSC 203) at the Suez Canal University.
- [**Dr. Fatma El-Sayed**](https://www.linkedin.com/in/fatma-elsayed/): For her incredibly helpful hands-on sessions and continuous support throughout the development of the project.
