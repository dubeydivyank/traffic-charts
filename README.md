## Prerequisites

-   Docker
-   Docker Compose

## Project Structure

-   `frontend/` - Frontend application
-   `backend/` - NestJS backend application
-   `docker-compose.yml` - Docker configuration for all services

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/dubeydivyank/traffic-charts.git
cd traffic-charts
```

2. Start the application using Docker Compose:

```bash
docker-compose up --build
```

This will start the following services:

-   Frontend application on http://localhost:5173
-   Backend API on http://localhost:3000
-   MySQL database on port 3306
-   phpMyAdmin for data on http://localhost:9483

## Accessing the Services

-   Frontend: http://localhost:5173
-   Backend API: http://localhost:3000/api
-   phpMyAdmin: http://localhost:9483/index.php?route=/database/structure&db=traffic_db

## Stopping the Application

To stop all services:

```bash
docker-compose down
```

## Database

The MySQL database is configured with the following credentials:

-   Database: traffic_db
-   Username: user
-   Password: abc123
-   Port: 3306

You can manage the database through phpMyAdmin at http://localhost:9483/index.php?route=/database/structure&db=traffic_db

## Folder Structure

### Frontend

The frontend is built with react. The `src` directory contains the main application code organized into:

-   `api/`: API integration and service calls
-   `components/ui`: Reusable shadcn UI components
-   `lib/`: Utility functions and shared code
-   `modules/`: feature specific components
-   Core files: `App.tsx`, `main.tsx`, and `index.css`

### Backend

The backend follows NestJS's modular architecture. The `src` directory contains:

-   `modules/`: Feature-specific modules, controllers, and services
-   `database/`: Database configuration and migrations
-   Core files: `app.module.ts`, `app.controller.ts`, `app.service.ts`, and `main.ts`

## Architecture

### Frontend

-   Built with React.js
-   Serves as the user interface for traffic management
-   Communicates with the backend through RESTful APIs

### Backend (NestJS)

-   RESTful API server built with NestJS framework
-   Handles business logic and data processing
-   Provides API endpoints for frontend communication

### Database Layer

-   MySQL database for persistent data storage
-   phpMyAdmin for database management and monitoring
-   Structured to handle traffic-related data efficiently

### Infrastructure

-   Containerized using Docker
-   Services are orchestrated using Docker Compose
-   Each component runs in its own isolated container
-   Volumes are used for persistent data and development hot-reloading

### Communication Flow

1. Frontend makes API requests to the NestJS backend
2. Backend processes requests and interacts with the database
3. Database stores and retrieves data as needed
4. Results are sent back through the API to the frontend

---

---

---

## Scalability

There are 2 primary approaches we can use scale this application.

-   Vertical Scaling: Increasing the resourses of a single machine by adding more RAM, CPU or storage
-   Horizontal Scaling: Adding more machine to handle increased workload

### Scaling from 5 RPS to 50 RPS

-   We can increase the server resourses if needed
-   We can implement proper database indexes for frequently queried fields
-   Fetch only the necessary columns and avoid using SELECT \*
-   Implement cashing for frequently accessed data

### Scaling from 50 RPS to 500 RPS

-   We can deploy multiple instances of our application and add a load balancer to distribute traffic among the instances
-   We can introduce read-only replicas of the primary database to offload read traffic from primary database.
-   We can consider breaking down our application into microservices and can scale each service independently based on the load.
-   We can implement a CDN if we have to deliver any static content
