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

# Stage 4

## Problem Statement

Currently, notifications are fetched from the database every time a student opens or refreshes the application page.

As the number of users grows, continuously querying the database for every page load creates excessive database traffic and increases response time.

This results in:

- Slower notification loading
- Increased server load
- Poor user experience
- Scalability problems

---

## Recommended Solution

The best solution is to introduce caching and real-time communication mechanisms. The system should avoid repeatedly fetching unchanged notification data from the database.

---

## Proposed Architecture Improvements

The improved architecture includes:

- Redis caching
- WebSocket based real-time updates
- Pagination
- Lazy loading
- Database replication

---

## 1. Redis Caching

Frequently accessed notifications should be temporarily stored in Redis cache. Instead of querying the database every time:

- The backend first checks Redis
- If cache exists, notifications are returned immediately
- Otherwise data is fetched from the database and cached

**Benefits of Redis:**

- Faster response time
- Reduced database load
- Better scalability
- Improved user experience

**Tradeoffs of Redis:**

- Additional infrastructure setup
- Cache invalidation complexity
- Increased memory usage

---

## 2. WebSocket Based Real-Time Updates

Instead of polling the backend repeatedly, the frontend should maintain a WebSocket connection. Whenever a new notification is created:

- Backend pushes the notification instantly
- Frontend updates without refresh

**Benefits of WebSockets:**

- Real-time communication
- Reduced unnecessary API requests
- Lower database traffic
- Better user experience

**Tradeoffs of WebSockets:**

- Persistent connection management
- Higher server memory usage
- Slightly more complex implementation

---

## 3. Pagination

Notifications should be loaded in smaller batches instead of fetching the entire dataset.

**Example:**

```
GET /api/notifications/22MIS7283?page=1&limit=20
```

**Benefits of Pagination:**

- Faster API response
- Reduced memory usage
- Better frontend rendering performance

**Tradeoffs of Pagination:**

- Additional frontend handling
- Multiple requests needed for older notifications

---

## 4. Lazy Loading

Older notifications should only load when the user scrolls further. This prevents unnecessary data transfer during initial page load.

**Benefits of Lazy Loading:**

- Faster initial loading
- Reduced bandwidth usage
- Improved frontend responsiveness

---

## 5. Database Replication

Read replicas can be introduced to distribute notification read traffic across multiple database servers. Write operations happen on the primary database while read operations use replicas.

**Benefits of Replication:**

- Better scalability
- Improved read performance
- Reduced primary database load

**Tradeoffs of Replication:**

- Replication lag
- Increased infrastructure complexity
- Higher maintenance cost

---

## Additional Improvements

Other performance optimizations include:

- Compressing API responses
- Indexing frequently queried columns
- Archiving old notifications
- Using CDN for static assets
- Batching notification requests

---

## Final Recommendation

The most effective architecture for this system is:

- PostgreSQL for persistent storage
- Redis for caching
- WebSockets for real-time delivery
- Pagination and lazy loading for frontend optimization
- Read replicas for scalability

This combination provides high performance, low latency, better scalability, and improved user experience.

---

# Stage 5

## Problems In Current Implementation

The current implementation processes notifications sequentially:

```python
function notify_all(student_ids: array, message: string):
    for student_id in student_ids:
        send_email(student_id, message)
        save_to_db(student_id, message)
        push_to_app(student_id, message)
```

This implementation has several major problems when handling large scale notifications.

---

## Main Problems

**1. Sequential Processing Is Slow**

The system sends notifications one by one. If 50,000 students must receive notifications, total execution time becomes extremely large, and one slow email API call delays the entire process.

**2. Single Point of Failure**

If the email API fails midway, remaining students may never receive notifications and the system state becomes inconsistent. For example, if 20,000 students are processed and the email API crashes, the remaining 30,000 students are never notified.

**3. No Retry Mechanism**

Failed notifications are permanently lost because there is no retry logic.

**4. Tight Coupling**

The operations — sending email, saving to database, and pushing real-time updates — are tightly connected. Failure in one operation affects the others.

**5. Poor Scalability**

This implementation cannot efficiently handle placement season traffic, bulk notifications, or concurrent users.

---

## Recommended Architecture

The system should use asynchronous event-driven processing using message queues.

Recommended technologies:

- RabbitMQ
- Kafka
- BullMQ
- Redis Queues

---

## Improved Notification Flow

1. Notification request received
2. Notification saved in database
3. Notification job added to queue
4. Workers process jobs asynchronously
5. Email service sends emails
6. WebSocket service pushes real-time notifications
7. Failed jobs are retried automatically

---

## Why Save To Database First?

Saving notifications first ensures reliability. Even if email delivery fails or WebSocket delivery fails, the notification still exists in persistent storage and can be retried later. This prevents data loss.

---

## Should Email And DB Save Happen Together?

No. Database storage and email sending should be separated because database operations are critical while email delivery is external and unreliable. The notification must exist in the database even if email delivery temporarily fails.

---

## Retry Mechanism

Failed jobs should automatically retry after delay intervals.

**Example retry strategy:**

- Retry after 1 minute
- Retry after 5 minutes
- Retry after 15 minutes

After maximum retry attempts, the job moves to a dead letter queue and system administrators are notified.

---

## Improved Pseudocode

```python
function notify_all(student_ids, message):

    notification_id = save_notification_to_db(message)

    for student_id in student_ids:
        add_job_to_queue({
            student_id,
            notification_id,
            message
        })


worker process_notification_job(job):

    try:
        send_email(job.student_id, job.message)
        push_to_app(job.student_id, job.message)
        mark_job_success(job)

    except Exception:
        retry_job(job)
```

---

## Benefits Of Queue Based Architecture

- Faster processing
- Better scalability
- Fault tolerance
- Retry support
- Parallel processing
- Improved reliability

---

## Parallel Processing

Multiple workers can process notifications simultaneously.

**Example:**

- Worker 1 handles students 1 to 10,000
- Worker 2 handles students 10,001 to 20,000

This drastically reduces notification delivery time.

---

## Dead Letter Queue

Jobs that continuously fail should move to a dead letter queue for manual investigation. This prevents infinite retries and resource wastage.

---

## Monitoring And Logging

The system should track:

- Failed notifications
- Retry attempts
- Processing time
- Queue size
- Delivery success rate

This improves debugging and observability.

---

## Final Recommendation

The best architecture for large scale campus notifications is:

- Asynchronous queue based processing
- Database first persistence
- Retry mechanisms
- Worker based parallel execution
- Real-time WebSocket delivery

This architecture ensures scalability, reliability, high availability, and fault tolerance.

# Stage 6

## Priority Notification System

The product manager requested a Priority Inbox feature that displays the top unread notifications based on importance and recency.

The priority is determined using:
- notification type weight
- recency score

---

# Priority Order

The notification weights are:

| Type | Weight |
|---|---|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

Placement notifications receive highest priority because they are most critical for students.

---

# Ranking Logic

The final priority score is calculated using:

```txt
Final Score =
(Type Weight × 100) + Recency Score