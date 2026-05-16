# Backend Assessment Submission

## Candidate Information

- Roll Number: 22MIS7283
- Track: Backend Development

---

# Project Structure

```txt
22MIS7283
│
├── logging_middleware
├── vehicle_maintenance_scheduler
├── notification_app_be
├── screenshots
└── notification_system_design.md
```

---

# Modules Implemented

## 1. Logging Middleware

Reusable logging middleware integrated across backend services.

### Features

- Centralized logging
- External logging API integration
- Validation for stack, level and package
- Error handling support

---

## 2. Vehicle Maintenance Scheduler

Backend microservice for optimizing vehicle maintenance scheduling.

### APIs Implemented

- GET /depots
- GET /vehicles
- POST /optimize

### Features

- Vehicle optimization logic
- Mechanic hour constraints
- Maximum impact scheduling
- Logger integration

---

## 3. Notification System Design

Implemented all stages from Stage 1 to Stage 6.

### Included Topics

- REST API Design
- Database Design
- Query Optimization
- Scalability Improvements
- Reliable Notification Delivery
- Priority Notification System

---

## 4. Priority Notification System

Implemented priority based notification sorting using:

- Notification type weight
- Recency based ordering

---

# Tech Stack

- Node.js
- Express.js
- JavaScript
- REST APIs
- Postman

---

# Screenshots Included

Screenshots are available inside the `screenshots` folder for:

- Authentication APIs
- Logging Middleware
- Vehicle Scheduler APIs
- Priority Notification Output

---

# Run Instructions

## Logging Middleware

```bash
cd logging_middleware
npm install
node src/utils/testLogger.js
```

---

## Vehicle Maintenance Scheduler

```bash
cd vehicle_maintenance_scheduler
npm install
node app.js
```

---

## Priority Notifications

```bash
cd notification_app_be
node priority_notifications.js
```
