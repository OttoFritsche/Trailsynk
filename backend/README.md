
# TrailSynk API

Backend API for TrailSynk, a cycling application built with FastAPI and Supabase.

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file based on `.env.example`
5. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

## API Documentation

When the application is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── api.py
│   │       └── endpoints/
│   │           ├── profile.py
│   │           └── bikes.py
│   ├── core/
│   │   ├── auth.py
│   │   └── config.py
│   ├── schemas/
│   │   ├── bike.py
│   │   └── profile.py
│   └── db.py
├── main.py
├── requirements.txt
└── .env.example
```
