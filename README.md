# KAM Lead Management System

## Project Overview

The KAM Lead Management System is a web-based platform designed for Key Account Managers (KAMs) in the restaurant industry. The system allows the management of leads, interactions, and account performance. The platform tracks leads, stores contact information, logs interactions, sets call plans, and monitors account performance to improve business outcomes.

### Key Features:
- **Lead Management**: Add and manage restaurant leads, track lead status.
- **Contact Management**: Multiple Points of Contact (POCs) per lead, managing contact details.
- **Interaction Tracking**: Record all interactions with leads, including calls and orders.
- **Call Planning**: Set call frequency, track upcoming calls, and manage call schedules.
- **Performance Tracking**: Track and evaluate account performance.

---

## System Requirements

- **Node.js**: v14.x or higher
- **npm**: v6.x or higher
- **Database**: PostgreSQL (or equivalent SQL database)

---

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/utsavhingar22/kam-lead-management.git
   cd kam-lead-management
2. **Install dependencies: If you are using npm or yarn:**
- npm install
- yarn install

3. **Set up environment variables**
   
Create a .env file in the root directory of the project and add the following:

DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=kam_lead_management
DB_PORT=5432
SECRET_KEY=your_secret_key

4. **Install SQL if not there**
   
5. **Create Database**

---

## Running Instructions

1. **Start the application**:
   After installing all dependencies and setting up the environment variables, you can start the application by running the following command:
   - If you're using `npm`:
     ```bash
     npm start
     ```
   - If you're using `yarn`:
     ```bash
     yarn start
     ```

2. **Database Migration**:
   If this is your first time running the application, you'll need to run the database migration to create the necessary tables:
   ```bash
   npm run migrate

---

## Test Execution Guide

### Running Tests

To run the tests for the project, you need to have all the dependencies installed first. After installing the dependencies (using `npm install` or `yarn install`), follow these steps to execute the tests.

1. **Install testing dependencies**:
   Ensure you have testing dependencies like `jest`, `mocha`, `chai`, or any other testing library installed. If not, you can install them by running:
   - Using npm:
     ```bash
     npm install --save-dev jest mocha chai
     ```
   - Using yarn:
     ```bash
     yarn add --dev jest mocha chai
     ```

2. **Run tests**:
   Once the testing dependencies are installed, you can run the tests by using the following command:
   - Using npm:
     ```bash
     npm test
     ```
   - Using yarn:
     ```bash
     yarn test
     ```

3. **Test coverage**:
   If you want to check the test coverage, you can use the following command (this depends on the test runner you're using):
   - Using npm:
     ```bash
     npm run test:coverage
     ```
   - Using yarn:
     ```bash
     yarn test:coverage
     ```

4. **Test a specific file**:
   To run tests for a specific file or folder, you can specify the path to the file:
   - Using npm:
     ```bash
     npm test path/to/testfile
     ```
   - Using yarn:
     ```bash
     yarn test path/to/testfile
     ```

5. **Check test results**:
   After running the tests, the results will be displayed in the terminal or command prompt. Look for the summary, including:
   - The number of tests passed
   - The number of tests failed (if any)
   - Any error messages or stack traces for failed tests

### Writing Tests

- Create test files in the `tests` directory (or similar).
- Ensure each test case is isolated and tests one unit of functionality at a time.
- Use mock data for database operations and external API calls to ensure tests run without dependencies.

### Troubleshooting

- If tests are failing, check the error logs and stack traces for clues.
- Ensure that the application is running and connected to the correct environment (e.g., local or test database).

---

## API Documentation

This API documentation describes the available endpoints and how to interact with them for the Kam Lead Management System.

### Base URL

http://localhost:3000/api (Running in Local Server or you can use any third pary server service)


### Authentication

All endpoints require authentication. Use the `Authorization` header with a Bearer token obtained after logging in via the `/api/auth/login` endpoint.

### Endpoints

#### 1. **Authentication**

- **POST** `/api/auth/login`
  - **Description**: Logs in a user and returns an authentication token.
  - **Request Body**:
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
  - **Response**:
    - **200 OK**: Successfully logged in
      ```json
      {
        "token": "your_jwt_token"
      }
      ```
    - **401 Unauthorized**: Invalid credentials

#### 2. **Leads**

- **POST** `/api/leads`
  - **Description**: Adds a new lead (restaurant).
  - **Request Body**:
    ```json
    {
      "name": "Restaurant Name",
      "contact": "Contact Name",
      "phone": "Phone Number",
      "email": "email@example.com"
    }
    ```
  - **Response**:
    - **201 Created**: Successfully created lead
      ```json
      {
        "id": 1,
        "name": "Restaurant Name",
        "contact": "Contact Name",
        "phone": "Phone Number",
        "email": "email@example.com"
      }
      ```
    - **400 Bad Request**: Missing required fields

- **GET** `/api/leads`
  - **Description**: Retrieves all leads.
  - **Response**:
    - **200 OK**: List of leads
      ```json
      [
        {
          "id": 1,
          "name": "Restaurant Name",
          "contact": "Contact Name",
          "phone": "Phone Number",
          "email": "email@example.com"
        },
        {
          "id": 2,
          "name": "Another Restaurant",
          "contact": "Another Contact",
          "phone": "Phone Number",
          "email": "email@example.com"
        }
      ]
      ```

#### 3. **Call Plans**

- **POST** `/api/call-plans`
  - **Description**: Adds a new call plan for a lead.
  - **Request Body**:
    ```json
    {
      "leadId": 1,
      "frequency": 7,
      "nextCallDate": "2024-12-30",
      "time": "10:00:00"
    }
    ```
  - **Response**:
    - **201 Created**: Successfully created call plan
      ```json
      {
        "id": 1,
        "leadId": 1,
        "frequency": 7,
        "nextCallDate": "2024-12-30",
        "time": "10:00:00"
      }
      ```
    - **400 Bad Request**: Missing required fields

- **GET** `/api/call-plans/:leadId`
  - **Description**: Retrieves all call plans for a specific lead.
  - **Response**:
    - **200 OK**: List of call plans
      ```json
      [
        {
          "id": 1,
          "leadId": 1,
          "frequency": 7,
          "nextCallDate": "2024-12-30",
          "time": "10:00:00"
        }
      ]
      ```

- **PUT** `/api/call-plans/:id`
  - **Description**: Updates an existing call plan.
  - **Request Body**:
    ```json
    {
      "leadId": 1,
      "frequency": 14,
      "nextCallDate": "2025-01-06",
      "time": "14:00:00"
    }
    ```
  - **Response**:
    - **200 OK**: Successfully updated call plan
      ```json
      {
        "id": 1,
        "leadId": 1,
        "frequency": 14,
        "nextCallDate": "2025-01-06",
        "time": "14:00:00"
      }
      ```

- **DELETE** `/api/call-plans/:id`
  - **Description**: Deletes a call plan.
  - **Response**:
    - **204 No Content**: Successfully deleted call plan

#### 4. **Points of Contact (POC)**

- **POST** `/api/leads/:leadId/pocs`
  - **Description**: Adds a point of contact for a specific lead.
  - **Request Body**:
    ```json
    {
      "name": "POC Name",
      "role": "POC Role",
      "phone": "POC Phone",
      "email": "poc@example.com"
    }
    ```
  - **Response**:
    - **201 Created**: Successfully created POC
      ```json
      {
        "id": 1,
        "leadId": 1,
        "name": "POC Name",
        "role": "POC Role",
        "phone": "POC Phone",
        "email": "poc@example.com"
      }
      ```

- **GET** `/api/leads/:leadId/pocs`
  - **Description**: Retrieves all points of contact for a specific lead.
  - **Response**:
    - **200 OK**: List of POCs
      ```json
      [
        {
          "id": 1,
          "leadId": 1,
          "name": "POC Name",
          "role": "POC Role",
          "phone": "POC Phone",
          "email": "poc@example.com"
        }
      ]
      ```

### Error Codes

- **400 Bad Request**: Missing or invalid input data.
- **401 Unauthorized**: Missing or invalid authentication token.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: Server-side error.

## Sample Usage Examples

### 1. **Add a New Lead**

**Request**:
```bash
curl -X POST "http://localhost:3000/api/leads" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "name": "Restaurant Name",
    "contact": "Contact Name",
    "phone": "Phone Number",
    "email": "email@example.com"
}'
 ```
### 2. **Retrieve All Leads**

**Request**:
```bash
curl -X GET "http://localhost:3000/api/leads" \
-H "Authorization: Bearer your_jwt_token"
 ```
### 3. **Add a Point of Contact (POC)**

```bash
curl -X POST "http://localhost:3000/api/leads/1/pocs" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "name": "POC Name",
    "role": "POC Role",
    "phone": "POC Phone",
    "email": "poc@example.com"
}'
 ```
### 4. **4. Retrieve All Points of Contact (POC)**
```bash
curl -X GET "http://localhost:3000/api/leads/1/pocs" \
-H "Authorization: Bearer your_jwt_token"
```
### 5. **Add a Call Plan for a Lead**
```bash
curl -X POST "http://localhost:3000/api/call-plans" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "leadId": 1,
    "frequency": 7,
    "nextCallDate": "2024-12-30",
    "time": "10:00:00"
}'
```
### 6. **Retrieve Call Plans for a Lead**
```bash
curl -X GET "http://localhost:3000/api/call-plans/1" \
-H "Authorization: Bearer your_jwt_token"
```
### 7. **Update a Call Plan**
```bash
curl -X PUT "http://localhost:3000/api/call-plans/1" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "leadId": 1,
    "frequency": 14,
    "nextCallDate": "2025-01-05",
    "time": "14:00:00"
}'
```
### 8. **Delete a Call Plan**
```bash
curl -X DELETE "http://localhost:3000/api/call-plans/1" \
-H "Authorization: Bearer your_jwt_token"
```










