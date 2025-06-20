# Task Manager API

A simple Node.js and Express-based REST API for managing tasks. Supports CRUD operations, filtering, sorting, and priority management.

## Overview
This project provides a task management API with the following features:
- Create, read, update, and delete tasks
- Filter tasks by completion status
- Sort tasks by creation date
- Assign and filter tasks by priority (low, medium, high)

## Setup Instructions

1. **Clone the repository** (if needed):
   ```sh
   git clone <repo-url>
   cd task-manager-api-Nizamudeen-Yooncekutty
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the server:**
   ```sh
   node app.js
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints

### 1. Get All Tasks
- **Endpoint:** `GET /tasks`
- **Query Parameters:**
  - `completed` (optional): `true` or `false` to filter by completion status
  - `sort` (optional): `asc` or `desc` to sort by creation date (default: `desc`)
- **Example:**
  ```sh
  curl "http://localhost:3000/tasks?completed=true&sort=asc"
  ```

### 2. Get Task by ID
- **Endpoint:** `GET /tasks/:id`
- **Example:**
  ```sh
  curl http://localhost:3000/tasks/1
  ```

### 3. Get Tasks by Priority
- **Endpoint:** `GET /tasks/priority/:level`
- **Path Parameter:**
  - `level`: `low`, `medium`, or `high`
- **Example:**
  ```sh
  curl http://localhost:3000/tasks/priority/high
  ```

### 4. Create a Task
- **Endpoint:** `POST /tasks`
- **Body:**
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "completed": false,           // optional, default: false
    "priority": "medium"         // optional, default: medium
  }
  ```
- **Example:**
  ```sh
  curl -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"New Task","description":"Details","priority":"high"}'
  ```

### 5. Update a Task
- **Endpoint:** `PUT /tasks/:id`
- **Body:** (any or all fields)
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "priority": "low"
  }
  ```
- **Example:**
  ```sh
  curl -X PUT http://localhost:3000/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"completed":true,"priority":"low"}'
  ```

### 6. Delete a Task
- **Endpoint:** `DELETE /tasks/:id`
- **Example:**
  ```sh
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Notes
- All responses are in JSON format.
- Invalid input or non-existent IDs return appropriate HTTP error codes (400, 404).

---

Feel free to extend this project or integrate it with a frontend!
