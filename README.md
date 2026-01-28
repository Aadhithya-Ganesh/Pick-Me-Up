# 🚗 PickMeUp – Ride Sharing Microservices Platform

PickMeUp is a scalable, event-driven microservices-based ride-sharing platform.  
Each service is independently deployable, containerized, and communicates via REST and RabbitMQ events.

The platform enables :

- User Authentication + JWT
- Drivers to create rides
- Users to book rides
- Notifications via event consumption
- API Gateway routing via Nginx

## 🏗 Architecture Overview

PickMeUp is implemented following microservices principles and deployed as containerized workloads.

### System Components

| Component                              | Responsibilities                                        |
| -------------------------------------- | ------------------------------------------------------- |
| **Frontend Pod (React)**               | UI for users                                            |
| **NGINX Gateway Pod**                  | Routes `/api/*` endpoints to backend services           |
| **User Service Pod (FastAPI)**         | Authentication, user creation, JWT handling             |
| **Ride Service Pod (FastAPI)**         | Ride creation, listing rides, driver responses          |
| **Booking Service Pod (FastAPI)**      | Booking rides, Redis locking to prevent race conditions |
| **Notification Service Pod (FastAPI)** | Consumes booking/ride events + sends notifications      |
| **RabbitMQ Broker Pod**                | Event communication between services                    |
| **PostgreSQL DB per service**          | Decoupled data storage                                  |
| **Redis**                              | Handling racing conditions while booking                |

## ⚙ Platform Workflow

### 1. User authenticates

- User credentials validated
- JWT generated + stored

### 2. Driver creates ride

- Ride Service stores ride details
- `ride.published` event emitted

### 3. User books ride

- Booking Service validates seat availability
- Booking confirmed + event published

### 4. Notifications

- Notification Service consumes events
- Sends real-time notification messages

## 🔀 API Routing via Gateway

All external traffic goes through NGINX:

- /api/auth/
- /api/users/
- /api/rides/
- /api/bookings/
- /api/notifications/

Services communicate internally via Docker DNS/K8s networking.

## 🧱 Data Management

PickMeUp follows a **database per microservice** pattern:

- `users_db`
- `rides_db`
- `bookings_db`
- `notifications_db`

This enforces service boundaries and independent schema evolution.

## 📨 Event-Driven Messaging

RabbitMQ transports domain events including:

- `ride.published`
- `booking.created`
- `booking.confirmed`
- `booking.cancelled`

These enable eventual consistency and decoupled workflows.

## 🛠 Tech Stack

| Category   | Tools               |
| ---------- | ------------------- |
| Languages  | Python              |
| Frameworks | FastAPI             |
| Frontend   | React               |
| Databases  | PostgreSQL          |
| Messaging  | RabbitMQ            |
| Locking    | Redis               |
| Gateway    | NGINX               |
| Security   | JWT                 |
| Deployment | Docker / Kubernetes |

## 🚀 Docker deployment

#### Prerequisites

[Docker](https://www.docker.com/)

#### Steps

1. In the root directory

```bash
docker compose up --build
```

2. Visit the below url

```bash
localhost
```

NOTE: If certain services fail to start, It because of descripency in to order in which they have to start. It happens sometimes and to ensure the services are started properly, follow the below steps instead.

```bash
docker compose up rabbitmq database redis adminer --build
```

```bash
docker compose up ride-service user-service booking-service notification-service --build
```

```bash
docker compose up frontend --build
```

To stop the services

```bash
docker compose downn # include -v to remove the volumes
```

## 🚀 Kubernetes Deployment

#### prerequisites

[minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download)
[kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

NOTE: Since the deployment is done with minikube, the app is not working properly in Mac systems. Use Windows or Linux for testing.

#### Steps

1. Start Minikube

```bash
minikube start --driver=docker
```

2. Go into the kubernetes folder

```bash
cd kubernetes
```

3. Apply the deployments and services to the minikube cluster

```bash
kubectl apply -f .
```

4. Forward the port of the frontend service to the host machine

```bash
kubectl port-forward service/frontend 80:80
```

5. Visit

```bash
localhost
```

6. Delete the deployments

```bash
kubectl delete -f .
```
