# Campus Notification Platform — API Documentation

## Overview

The campus notification platform delivers real-time updates related to placements, examination results, project reviews, and campus events. It supports notification creation, retrieval, unread tracking, deletion, and real-time delivery for connected users.

The backend follows REST API architecture using JSON-based communication between the frontend and backend services. The system is designed to be scalable, reliable, and easy to extend for future notification types.

---

## Main Features

- Create notifications for students
- Fetch notifications for a specific student
- Mark notifications as read
- Delete notifications
- Filter notifications by notification type
- Real-time notification delivery using WebSockets
- Persistent notification storage
- Unread notification tracking

---

## Notification Schema

```json
{
  "id": "uuid",
  "studentId": "22MIS7283",
  "notificationType": "Placement",
  "title": "Microsoft Hiring",
  "message": "Registration closes tonight",
  "priority": "High",
  "isRead": false,
  "createdAt": "2026-05-16T10:00:00Z"
}
```

---

## API Reference

### 1. Create Notification

**Endpoint**
```
POST /api/notifications
```

**Description**

Used by administrators or backend services to create a new notification for a student.

**Request Headers**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "studentId": "22MIS7283",
  "notificationType": "Placement",
  "title": "Amazon Hiring",
  "message": "Online assessment starts tomorrow",
  "priority": "High"
}
```

**Success Response**
```json
{
  "success": true,
  "message": "Notification created successfully",
  "notificationId": "N101"
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Failed to create notification"
}
```

---

### 2. Fetch Notifications For Student

**Endpoint**
```
GET /api/notifications/22MIS7283
```

**Description**

Fetches all notifications belonging to a specific student, ordered by latest first.

**Request Headers**
```
Authorization: Bearer <token>
```

**Success Response**
```json
{
  "success": true,
  "notifications": [
    {
      "id": "N101",
      "notificationType": "Placement",
      "title": "Amazon Hiring",
      "message": "Assessment starts tomorrow",
      "priority": "High",
      "isRead": false,
      "createdAt": "2026-05-16T11:30:00Z"
    },
    {
      "id": "N102",
      "notificationType": "Event",
      "title": "Hackathon",
      "message": "Registration is open",
      "priority": "Medium",
      "isRead": true,
      "createdAt": "2026-05-15T09:15:00Z"
    }
  ]
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Unable to fetch notifications"
}
```

---

### 3. Mark Notification As Read

**Endpoint**
```
PATCH /api/notifications/N101/read
```

**Description**

Updates the notification status from unread to read.

**Request Headers**
```
Authorization: Bearer <token>
```

**Success Response**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Notification not found"
}
```

---

### 4. Delete Notification

**Endpoint**
```
DELETE /api/notifications/N101
```

**Description**

Removes a notification from the system.

**Request Headers**
```
Authorization: Bearer <token>
```

**Success Response**
```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Failed to delete notification"
}
```

---

### 5. Filter Notifications By Type

**Endpoint**
```
GET /api/notifications/22MIS7283?type=Placement
```

**Description**

Filters notifications by category such as `Placement`, `Event`, or `Result`.

**Success Response**
```json
{
  "success": true,
  "notifications": [
    {
      "id": "N201",
      "notificationType": "Placement",
      "title": "Adobe Hiring",
      "message": "Coding round scheduled",
      "priority": "High",
      "isRead": false,
      "createdAt": "2026-05-16T08:30:00Z"
    }
  ]
}
```

---

### 6. Fetch Unread Notifications

**Endpoint**
```
GET /api/notifications/22MIS7283/unread
```

**Description**

Returns only unread notifications for the student.

**Success Response**
```json
{
  "success": true,
  "count": 3,
  "notifications": []
}
```

---

## Real-Time Notification Design

The platform uses **WebSockets** for real-time notification delivery. Whenever a new notification is created, the backend immediately pushes it to connected student clients without requiring a page refresh.

If a student is offline, notifications remain stored in the database and are fetched automatically during the next login or application refresh.

The frontend establishes a persistent WebSocket connection after successful authentication.

### Notification Flow

1. Admin or backend service creates a notification
2. Notification service validates the payload
3. Notification is stored in the database
4. Real-time event is pushed through WebSocket
5. Frontend receives and displays the notification
6. Student can mark the notification as read

---

## Error Handling

| Scenario | Response |
|---|---|
| Invalid request payload | `{ "success": false, "message": "Invalid request payload" }` |
| Unauthorized access | `{ "success": false, "message": "Unauthorized access" }` |
| Notification not found | `{ "success": false, "message": "Notification not found" }` |
| Internal server error | `{ "success": false, "message": "Internal server error" }` |

---

## Security Considerations

- All APIs require authorization tokens
- Sensitive student data is protected
- Input validation is performed before processing requests
- Rate limiting can be applied to avoid abuse
- HTTPS communication is recommended

---

## Architecture Overview

The frontend client communicates with the backend notification service using REST APIs. Real-time updates are delivered through WebSocket connections. Notifications are stored in persistent storage for reliability and future retrieval.

### Backend Layers

| Layer | Responsibility |
|---|---|
| Route Layer | Defines API endpoints and maps to controllers |
| Controller Layer | Handles request/response logic |
| Service Layer | Contains business logic |
| Database Layer | Manages persistent storage |
| WebSocket Event Layer | Pushes real-time events to connected clients |

This layered architecture improves maintainability, scalability, and debugging.