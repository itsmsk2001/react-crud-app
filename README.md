# React CRUD Application (Full Stack MERN)

A simple React-based CRUD application with a Node.js/Express/MongoDB backend.

## Features
-   Create, Read, Update, Delete (CRUD) operations for managed users.
-   Configuration-driven form generation (Extensible).
-   Input validation.
-   Responsive UI using Bootstrap 5.

## Prerequisites
-   Node.js (v14+)
-   MongoDB (Running locally or a connection string)

## Setup & Running

### 1. Backend Setup
Navigate to the server directory:
```bash
cd server
```
Install dependencies:
```bash
npm install
```
Start the server:
```bash
node server.js
```
The server will start on `http://localhost:5000` and connect to MongoDB.

### 2. Frontend Setup
Open a new terminal and navigate to the client directory:
```bash
cd client
```
Install dependencies:
```bash
npm install
```
Start the application:
```bash
npm run dev
```
The application will run on `http://localhost:5173` (or similar).

## Extensibility

To add a new field (e.g., "Address"):

1.  **Backend:** Update the User Schema in `server/models/User.js`:
    ```javascript
    address: { type: String, required: false }
    ```

2.  **Frontend:** Update the field configuration in `client/src/config/fields.js`:
    ```javascript
    {
        name: 'address',
        label: 'Address',
        type: 'text',
        required: false,
        placeholder: 'Enter address'
    }
    ```

The UI (Form and List) will automatically update to include the new field.
