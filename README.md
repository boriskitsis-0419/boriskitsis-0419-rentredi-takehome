# User Management System

A full-stack application for managing users with location and timezone data integration.

## Architecture

This project demonstrates a professional, scalable architecture with clear separation of concerns:

- **Backend**: Express.js REST API with modular structure
- **Frontend**: React application with component-based architecture
- **Database**: Firebase Realtime Database
- **External APIs**: OpenWeather API for geocoding and timezone data

## Project Structure

```
.
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── config/      # Configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # Route definitions
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utility functions
│   └── package.json
│
└── frontend/         # React application
    ├── src/
    │   ├── components/  # React components
    │   ├── hooks/       # Custom hooks
    │   ├── services/    # API services
    │   └── constants/   # Constants
    └── package.json
```

## Key Features

### Backend
- ✅ Clean architecture with separation of concerns
- ✅ Centralized error handling
- ✅ Input validation middleware
- ✅ Service layer for business logic
- ✅ Environment-based configuration

### Frontend
- ✅ Component-based architecture
- ✅ Custom hooks for state management
- ✅ Service layer for API communication
- ✅ Error handling and user feedback
- ✅ Modern React patterns

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Realtime Database
- OpenWeather API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. Start the development server:
```bash
npm run dev
```

## API Documentation

See [backend/README.md](./backend/README.md) for detailed API documentation.

## Development

- Backend runs on `http://localhost:8080` by default
- Frontend runs on `http://localhost:5173` by default (Vite)

## Technologies

- **Backend**: Express.js, Firebase Admin SDK, Axios
- **Frontend**: React, Vite, Axios
- **Database**: Firebase Realtime Database
- **External APIs**: OpenWeather API

## License

ISC

