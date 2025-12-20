# 🚗 PickMeUp – Frontend

PickMeUp is a ride-sharing web app built using a microservices architecture.  
This repository contains the **frontend SPA**, served through **NGINX** and communicating with backend services via an API gateway.

---

## 🚀 Tech Stack

- React + Vite
- React Router DOM
- Axios REST client
- JWT authentication
- Protected routing
- Docker container for deployment
- NGINX reverse proxy

---

# 🔀 Routing Overview

This project has **two routing layers**:

---

## 1️⃣ Backend Routing via NGINX API Gateway

All API requests are routed through the gateway.  
These route prefixes correspond to backend microservices:

| NGINX Route Prefix | Microservice |
|---|---|
| `/api/auth/` | Auth / User Service |
| `/api/users/` | User Service |
| `/api/rides/` | Ride Service |
| `/api/bookings/` | Booking Service |
| `/api/notifications/` | Notification Service |

## 2️⃣ Frontend Client-Side Routes (React Router DOM)

### Public Routes

| Path | Description |
|---|---|
| `/` | Home Page |
| `/rides` | All available rides |
| `/rides/:rideId` | Ride details |
| `/book/:rideId` | Booking form |
| `/booking/:bookingId` | Booking details |
| `/offer-ride` | Driver ride posting |
| `/login` | Login page |
| `/signup` | Signup page |
| `/logout` | Logout action |
| `/profile` | User profile |

### Protected Dashboard Routes

The dashboard requires authentication.

| Path | Description |
|---|---|
| `/dashboard` | Dashboard index |
| `/dashboard/notifications` | Notifications |
| `/dashboard/booking` | User bookings |
| `/dashboard/rides` | User posted rides |
| `/dashboard/profile` | User profile |

---

## 🧭 Route Structure (Tree)

```
/
├─ login
├─ signup
├─ logout
├─ dashboard
│ ├─ notifications
│ ├─ booking
│ ├─ rides
│ └─ profile
├─ rides
│ └─ :rideId
├─ book/:rideId
├─ booking/:bookingId
├─ offer-ride
├─ profile
└─ (index) Home
```