# Server Manager

Server Manager is a minimalistic web application for managing servers. It's built using MongoDB, Angular, and Spring Boot. MongoDB is used for data storage, while Angular handles the frontend user interface, and Spring Boot manages the backend server logic.

## Features

- **Server Management**: Add, view, and delete server information.
- **IP Address Pinging**: Ping IP addresses.

## Prerequisites

Before you get started, make sure you have the following tools and technologies installed:

- Docker: To run MongoDB in a container.
- Node.js and npm: Required for the Angular frontend.
- Java Development Kit (JDK): Needed for running the Spring Boot backend.

## Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ManishDait/server-manager.git
   cd server-manager
   ```
2. **Start MongoDB Using Docker Compose**

   Make sure you have Docker Compose installed.
   ```bash
   cd db
   docker compose up -d
   ```
3. **Spring Boot Backend**

   Navigate to the `server` directory and build and run the Spring Boot backend:
   ```bash
   cd server
   ./mvnw spring-boot:run
   ```
   The backend server will start on `http://localhost:8080`.

4. **Angular Frontend**

   Navigate to the `client` directory and install the frontend dependencies:
   ```bash
   cd client
   npm install
   ```

   After the dependencies are installed, start the Angular development server:

   ```bash
   ng serve -o
   ```
   The Angular app will be available at `http://localhost:4200``.