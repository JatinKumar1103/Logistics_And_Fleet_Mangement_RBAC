Certainly! Below is the **README** file structure for your project, which includes all the details about the project, the files, directory structure, and how to run it.

---

# Logistics and Fleet Management System (RBAC)

## Introduction

This **Logistics and Fleet Management System** is designed to manage the operations and assignments of vehicles, drivers, and tasks. The system utilizes **Role-Based Access Control (RBAC)** to ensure that different roles (Admin, Manager, Driver) have different levels of access. The project leverages **Node.js** with **Express** for the backend, **MongoDB** for the database, and **JWT** for authentication.

### Key Features:
- **User Management**: Admin can manage users (create, update, assign roles).
- **Role-Based Permissions**: Different roles (Admin, Manager, Driver) have different access rights to specific routes and functionalities.
- **Vehicle Management**: Assigning vehicles to drivers, updating vehicle statuses.
- **Task Management**: Assign tasks to drivers and monitor task completion.
- **Reports and Monitoring**: Admin and Manager roles can generate reports and monitor drivers and vehicles.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Setup and Installation](#setup-and-installation)
- [File Descriptions](#file-descriptions)
  - [controllers](#controllers)
  - [models](#models)
  - [routes](#routes)
  - [middlewares](#middlewares)
  - [utils](#utils)
- [How to Run](#how-to-run)
- [Contributing](#contributing)

---

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Role Management**: RBAC (Role-Based Access Control)
- **Environment Variables**: dotenv

---

## Directory Structure

The directory structure of the project is as follows:

```
Logistics_And_Fleet_Mangement_RBAC/
├── src/
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── driver.controller.js
│   │   ├── manager.controller.js
│   │   ├── task.controller.js
│   │   ├── vehicle.controller.js
│   ├── models/
│   │   ├── task.model.js
│   │   ├── user.model.js
│   │   ├── vehicle.model.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── driver.routes.js
│   │   ├── manager.routes.js
│   │   ├── vehicle.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── permission.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── generateTokens.js
│   ├── config/
│   │   ├── db.js
│   ├── .env
│   ├── app.js
│   └── server.js
├── package.json
├── .gitignore
└── README.md
```

### Breakdown of the Folders:
- **controllers**: Contains the business logic for the different user roles like Admin, Manager, Driver.
- **models**: Mongoose models for MongoDB collections (e.g., `user.model.js`, `vehicle.model.js`, `task.model.js`).
- **routes**: Defines the API routes for different functionalities.
- **middlewares**: Contains custom middlewares such as authentication (`auth.middleware.js`) and role-based access control (`permission.js`).
- **utils**: Contains utility functions like custom error handling (`ApiError.js`), response formatting (`ApiResponse.js`), and asynchronous handling (`asyncHandler.js`).
- **config**: Holds configuration files like `db.js` for database connection.
- **app.js**: The main app file where all the middleware and routes are set up.
- **server.js**: Starts the server and listens on a specific port.

---

## Setup and Installation

Follow the steps below to set up the project locally.

1. **Clone the repository**:
    ```bash
    git clone https://github.com/JatinKumar1103/Logistics_And_Fleet_Mangement_RBAC.git
    cd Logistics_And_Fleet_Mangement_RBAC
    ```

2. **Install dependencies**:
    Make sure you have **Node.js** and **npm** installed. If not, you can download them from [here](https://nodejs.org/en/download/).
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file at the root of the project and add the following variables:
    ```env
    DB_URI=mongodb://localhost:27017/logistics-db
    JWT_SECRET=your_jwt_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    PORT=5000
    ```

4. **Run the application**:
    After setting up your environment, run the server:
    ```bash
    npm start
    ```
    This will start the application on the port specified in `.env` (default: `5000`).

---

## File Descriptions

### **controllers**
The **controllers** folder holds the core logic for various functionalities of the project.

- **admin.controller.js**: Handles routes and logic for the admin, such as assigning roles, viewing reports, etc.
- **driver.controller.js**: Manages tasks specific to drivers, such as viewing assigned tasks and updating vehicle status.
- **manager.controller.js**: Handles the functionality for managers, such as monitoring drivers and vehicles, and viewing tasks.
- **task.controller.js**: Manages task-related logic, such as assigning tasks to drivers and monitoring their status.
- **vehicle.controller.js**: Handles vehicle-related logic, such as updating vehicle status, assigning vehicles to drivers, and managing vehicles.

### **models**
Contains Mongoose schema definitions for the MongoDB collections.

- **task.model.js**: The Mongoose schema for tasks, including the title, description, assigned driver, and vehicle.
- **user.model.js**: The Mongoose schema for users, including fields like email, password, and role (admin, manager, driver).
- **vehicle.model.js**: The Mongoose schema for vehicles, including fields like model, license plate, status, and assigned driver.

### **routes**
Defines the routes for various API endpoints.

- **admin.routes.js**: Contains the routes for the admin, such as role assignment, user management, and viewing reports.
- **driver.routes.js**: Defines routes for drivers to view tasks and update vehicle status.
- **manager.routes.js**: Contains the routes for the manager, such as monitoring drivers and managing vehicles.
- **vehicle.routes.js**: Defines the routes for vehicle management, such as adding vehicles, assigning them to drivers, and updating their status.

### **middlewares**
Contains middlewares for authentication and permission handling.

- **auth.middleware.js**: Verifies JWT token for authentication.
- **permission.js**: Checks the user's role and permissions to ensure they can access specific routes.

### **utils**
Contains utility functions for error handling, response formatting, and asynchronous handling.

- **ApiError.js**: Custom error handler for throwing errors with status codes and messages.
- **ApiResponse.js**: Formats API responses in a consistent structure.
- **asyncHandler.js**: A utility to handle asynchronous code and pass errors to the next middleware.
- **generateTokens.js**: Generates access and refresh tokens for user authentication.

---

## How to Run

1. Clone the repository and install dependencies as mentioned above.
2. Set up your `.env` file with the necessary environment variables.
3. Run the app using:
    ```bash
    npm start
    ```
4. The server will be running at `http://localhost:5000`. You can now make requests to the API endpoints using Postman or any HTTP client.

---