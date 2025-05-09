
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TrailSynk API"
    PROJECT_DESCRIPTION: str = "API for TrailSynk cycling application"
    API_V1_STR: str = "/api/v1"
    
    # CORS settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Supabase settings
    SUPABASE_URL: str
    SUPABASE_SERVICE_KEY: str
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
