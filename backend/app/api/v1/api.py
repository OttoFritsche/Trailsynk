
from fastapi import APIRouter

from app.api.v1.endpoints import profile, bikes

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(bikes.router, prefix="/bikes", tags=["bikes"])

# Additional routers will be added here as the application grows
# Example:
# api_router.include_router(activities.router, prefix="/activities", tags=["activities"])
