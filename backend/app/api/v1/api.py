
from fastapi import APIRouter

from app.api.v1.endpoints import profile, bikes

api_router = APIRouter()

api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(bikes.router, prefix="/bikes", tags=["bikes"])
