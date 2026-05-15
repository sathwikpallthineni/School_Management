# School Management API

A REST API built using Node.js, Express.js, and MySQL for managing school data.

## Features

- Add new schools
- Fetch schools sorted by proximity
- Input validation using Joi
- MySQL cloud database integration

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- Joi

---

## Live API

Base URL:

```text
https://your-render-url.onrender.com
```

---

## API Endpoints

### 1. Add School

**POST**

```
https://school-management-vspn.onrender.com/addSchool
```

#### Request Body

```json
{
  "name": "ABC School",
  "address": "Hyderabad",
  "latitude": 17.3850,
  "longitude": 78.4867
}
```

---

### 2. List Schools

**GET**

```text
https://school-management-vspn.onrender.com/listSchools?latitude=17.3850&longitude=78.4867
```

Returns schools sorted based on distance from user location.

---

## Database Schema

```sql
CREATE TABLE schools(
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30) NOT NULL,
   address VARCHAR(50) NOT NULL,
   latitude FLOAT NOT NULL,
   longitude FLOAT NOT NULL
);
```

---

## Deployment

Backend deployed on Render:

```https://school-management-vspn.onrender.com```

Postman collection JSON included in repository.

---
