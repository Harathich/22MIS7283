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


# Stage 2

## Database Selection

A relational database such as PostgreSQL or MySQL is suitable for the notification platform because the system handles structured data with clear relationships between students and notifications.

Relational databases provide:

- ACID compliance
- Better consistency
- Efficient querying
- Indexing support
- Reliable transaction handling

PostgreSQL is preferred because it supports scalability, indexing, and JSON-based operations efficiently.

---

## Main Database Tables

The system contains the following main tables:

- Students
- Notifications
- NotificationStatus

---

## Students Table

This table stores basic student information.

| Column Name | Data Type | Description |
|---|---|---|
| student_id | VARCHAR | Unique student identifier |
| student_name | VARCHAR | Name of student |
| email | VARCHAR | Student email address |
| department | VARCHAR | Student department |
| created_at | TIMESTAMP | Account creation timestamp |

---

## Notifications Table

This table stores all notifications generated in the system.

| Column Name | Data Type | Description |
|---|---|---|
| notification_id | VARCHAR | Unique notification identifier |
| student_id | VARCHAR | Student receiving notification |
| notification_type | VARCHAR | Placement, Event, Result etc |
| title | VARCHAR | Notification title |
| message | TEXT | Notification message |
| priority | VARCHAR | Low, Medium or High |
| created_at | TIMESTAMP | Notification creation time |

---

## NotificationStatus Table

This table stores the notification read status.

| Column Name | Data Type | Description |
|---|---|---|
| status_id | VARCHAR | Unique status identifier |
| notification_id | VARCHAR | Related notification |
| is_read | BOOLEAN | Read or unread status |
| read_at | TIMESTAMP | Timestamp when notification was opened |

---

## Relationships

- One student can receive many notifications
- One notification belongs to one student
- One notification has one status entry

---

## Database Indexing

Indexes improve query performance for large datasets. The following fields should be indexed:

- student_id
- notification_type
- created_at
- is_read

**Example:**

```sql
CREATE INDEX idx_student_id
ON Notifications(student_id);
```

---

## Pagination Strategy

When notification count becomes large, pagination should be used to avoid loading all notifications at once.

**Example:**

```
GET /api/notifications/22MIS7283?page=1&limit=20
```

This improves:

- Response time
- Frontend performance
- Database efficiency

---

## SQL Query Examples

**Fetch Latest Notifications**

```sql
SELECT *
FROM Notifications
WHERE student_id = '22MIS7283'
ORDER BY created_at DESC
LIMIT 20;
```

**Fetch Unread Notifications**

```sql
SELECT *
FROM Notifications n
JOIN NotificationStatus ns
ON n.notification_id = ns.notification_id
WHERE n.student_id = '22MIS7283'
AND ns.is_read = false;
```

---

## Database Optimization Strategies

To improve performance and scalability:

- Use indexing for frequently searched columns
- Use pagination for large datasets
- Archive old notifications periodically
- Use query optimization for high traffic operations
- Avoid unnecessary joins

---

## Scalability Considerations

As the number of students increases, notification traffic may grow rapidly during placement seasons and result announcements.

The system should support:

- Horizontal backend scaling
- Database replication
- Caching for frequently accessed data
- Asynchronous notification processing

---

## Backup and Reliability

Regular database backups should be maintained to avoid data loss. Additional reliability measures include:

- Replication
- Failover support
- Transaction logging
- Monitoring and alert systems

---

## Data Retention Policy

Old notifications older than one year can be archived into cold storage to reduce active database load while still preserving historical data.

# Stage 3

## Query Analysis

The existing query is:

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

---

## Is The Query Correct?

The query is functionally correct because it fetches unread notifications for a specific student ordered by latest notifications first.

However, the query may become very slow when the notifications table grows to millions of records.

---

## Why Is The Query Slow?

The table currently contains:

- 50,000 students
- 5,000,000 notifications

Without proper indexing, the database performs a full table scan to find matching rows. This increases query execution time significantly.

The sorting operation using `ORDER BY createdAt DESC` also becomes expensive when large datasets are involved.

---

## Problems In Current Query

- Full table scanning
- Expensive sorting
- Large number of unread notifications
- Poor scalability for high traffic systems

---

## Recommended Optimization

A composite index should be created on `(studentID, isRead, createdAt)`.

This allows the database to:

- Filter student notifications quickly
- Filter unread notifications efficiently
- Return sorted results faster

**Optimized Index:**

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);
```

---

## Expected Computational Cost

**Without Index**

Time complexity is approximately `O(n)` because the database scans large portions of the table.

**With Proper Index**

Time complexity improves closer to `O(log n)` because indexed searching is significantly faster.

---

## Should We Add Indexes On Every Column?

No. Adding indexes on every column is not effective.

**Why Adding Too Many Indexes Is Bad:**

- Increased storage usage
- Slower insert operations
- Slower update operations
- Increased index maintenance cost
- Reduced write performance

Indexes should only be created on:

- Frequently searched columns
- Filtering columns
- Sorting columns
- Join columns

**Better Indexing Strategy**

Useful indexes for this system include `studentID`, `isRead`, `createdAt`, and `notificationType`. Composite indexes are preferred for common query patterns.

---

## Query To Find Students Who Received Placement Notifications In Last 7 Days

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

---

## Additional Performance Improvements

To further improve scalability:

- Use pagination
- Archive old notifications
- Use caching for frequently accessed data
- Use read replicas for heavy read traffic
- Partition very large tables

**Pagination Example:**

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
ORDER BY createdAt DESC
LIMIT 20 OFFSET 0;
```

Pagination reduces memory usage and improves frontend loading speed.

---

## Final Recommendation

The notification system should use:

- Proper indexing
- Pagination
- Optimized query patterns
- Database scaling techniques

This ensures good performance even when the platform handles millions of notifications.

---