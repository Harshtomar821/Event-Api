# Project Title

# Event Management API

This is a simple **Event Management REST API** built with **Node.js, Express, and MongoDB**.  
It allows creating events, registering users, cancelling registrations, listing upcoming events, and fetching event statistics.

---

## Features

- **User Management**
  - Create a user (`name`, `email`)
- **Event Management**

  - Create an event (`title`, `event_at`, `location`, `capacity`)
  - Fetch event details including registered users
  - Register a user for an event
  - Cancel registration
  - List upcoming events (sorted by date ascending, then location alphabetically)
  - Get event statistics (total registrations, remaining capacity, percentage used)

- **Validation & Business Rules**
  - Event capacity ≤ 1000
  - No duplicate registrations
  - Cannot register for past events
  - Proper HTTP status codes and meaningful error messages
  - Input validation via middleware

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB / Mongoose**
- **dotenv** (for environment variables)

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <"https://github.com/Harshtomar821/Event-Api/new/main/Event-Api">
cd event-management-api
```
