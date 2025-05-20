# parlamento
Web app of El Parlamento. Both backend and frontend


# El Parlamento

A full-stack web application for "El Parlamento" - a Bolivian coffee shop that celebrates local culture, history, and gastronomy in the heart of La Paz.

## Project Overview

El Parlamento is more than a coffee shop; it's a cultural space housed in a historic building from 1909. The website showcases:

- Menu with historically-inspired dishes and beverages
- Event calendar and booking system
- Team information and testimonials
- About page with cultural and historical context
- Animated UI elements throughout for enhanced user experience

## Architecture

The project uses a modern full-stack architecture with separate frontend and backend services:

parlamento/
├── frontend_p/ # Next.js frontend application
├── backend_p/ # FastAPI backend service
└── render.yaml # Render deployment configuration


### Backend (FastAPI)

- REST API endpoints for menu, events, team, testimonials
- Static file serving for images via mounted directories
- CORS configured for cross-origin requests
- Event booking system

### Frontend (Next.js)

- Modern, responsive design with Tailwind CSS
- Custom UI components and animations using Motion One
- Client-side data fetching with environment-aware base URLs
- Sections: Home, About, Menu, Events, and Contact
- Smooth animations and transitions throughout

## Tech Stack

**Backend:**
- Python 3.11
- FastAPI
- Uvicorn (ASGI server)
- Pydantic

**Frontend:**
- Next.js 15.x
- React 19
- TypeScript
- Tailwind CSS
- Motion One (animations)
- Radix UI components
- React Hook Form

## Setup & Development

### Prerequisites

- Node.js 20.x
- Python 3.11
- npm or pnpm
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/AgredaLem023/parlamento.git
cd parlamento

# Set up Python virtual environment
cd backend_p
python -m venv par_venv
source par_venv/bin/activate  # On Windows: par_venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
# From the project root
cd frontend_p

# Install dependencies
npm install  # or: pnpm install

# Run development server
npm run dev  # or: pnpm dev
```

Visit `http://localhost:3000` to see the application running.

## Deployment

This project is configured for deployment on [Render](https://render.com) using the Blueprint deployment method:

1. Push your code to a GitHub repository
2. In Render, select "New Blueprint" and connect to your repository
3. Render will automatically detect and deploy both services defined in `render.yaml`

The deployment configuration provides:
- Backend service (`parlamento-backend`)
- Frontend service (`parlamento-frontend`)
- Automatic environment variable linking

## Environment Variables

### Backend
- `PORT` - Automatically set by Render

### Frontend
- `NEXT_PUBLIC_API_URL` - URL of the backend API (automatically set in Render from backend service)

## Project Structure Highlights

### Backend

- `main.py` - Main FastAPI application with all endpoints
- `public/` - Static files (images) served directly by FastAPI
- `requirements.txt` - Python dependencies

### Frontend

- `app/` - Next.js application routes and pages
- `components/` - Reusable React components
- `public/` - Static assets
- `styles/` - Global CSS and Tailwind configurations
- `lib/` - Utility functions and type definitions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2025 El Parlamento