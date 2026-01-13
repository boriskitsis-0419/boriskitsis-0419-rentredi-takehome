# Backend API

A RESTful API built with Express.js, Firebase, and OpenWeather API integration.

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── app.js       # Express app setup
│   │   └── firebase.js  # Firebase initialization
│   ├── controllers/     # Request handlers
│   │   └── userController.js
│   ├── middleware/      # Express middleware
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── routes/          # Route definitions
│   │   ├── index.js
│   │   └── userRoutes.js
│   ├── services/        # Business logic
│   │   ├── userService.js
│   │   └── weatherService.js
│   ├── utils/           # Utility functions
│   │   └── validation.js
│   └── index.js         # Application entry point
├── .env.example         # Environment variables template
├── .gitignore
└── package.json
```

## Features

- **Separation of Concerns**: Clean architecture with controllers, services, and routes
- **Error Handling**: Centralized error handling middleware
- **Validation**: Input validation middleware
- **Firebase Integration**: User data persistence
- **OpenWeather API**: Location and timezone data fetching

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your configuration:
```bash
cp .env.example .env
```

3. Configure your Firebase service account credentials:
   - Place your Firebase service account JSON file in the project root
   - Set `GOOGLE_APPLICATION_CREDENTIALS` in `.env` to point to the file

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `GET /api/users/:id/utc-offset` - Get user's UTC offset

## Environment Variables

See `.env.example` for required environment variables.

