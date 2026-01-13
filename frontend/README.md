# Frontend Application

A React application built with Vite for managing users with Firebase and OpenWeather integration.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── UserForm.jsx
│   │   ├── UserTable.jsx
│   │   └── ErrorAlert.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useUsers.js
│   ├── services/        # API services
│   │   ├── api.js
│   │   └── userService.js
│   ├── constants/       # Application constants
│   │   └── index.js
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .env.example
└── package.json
```

## Features

- **Component-Based Architecture**: Reusable, focused components
- **Custom Hooks**: Business logic separated into hooks
- **Service Layer**: Centralized API communication
- **Error Handling**: User-friendly error messages
- **Modern React**: Uses hooks and functional components

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: http://localhost:8080)
