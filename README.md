# ProdCare

ProdCare is a backend system for managing support tickets and analyzing production errors using AI.

## Features

- User Authentication (JWT)
- Role-based Authorization (Admin / Client)
- AI Error Analysis
- Logs Monitoring
- Ticket Management

## Tech Stack

- Node.js
- Express.js
- JWT Authentication
- Bcrypt
- REST API

## API Routes

### User
POST /api/users/register  
POST /api/users/login  
GET /api/users/profile  
GET /api/users/admin  

### AI
POST /api/ai/analyze

### Logs
GET /api/logs

### Tickets
GET /api/tickets  

## Run Locally

```bash
cd backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:5000
```

## Future Improvements

- AI-powered error debugging
- Vector database for logs
- Frontend dashboard
- Docker deployment
- Cloud hosting