
from fastapi import APIRouter

from app.api.v1.endpoints import (
    profile, bikes, activities, routes, groups, messages, strava
)

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(bikes.router, prefix="/bikes", tags=["bikes"])
api_router.include_router(activities.router, prefix="/activities", tags=["activities"])
api_router.include_router(routes.router, prefix="/routes", tags=["routes"])
api_router.include_router(groups.router, prefix="/groups", tags=["groups"])
api_router.include_router(messages.router, prefix="/messages", tags=["messages"])
api_router.include_router(strava.router, prefix="/strava", tags=["strava"])

# Additional routers will be added here as the application grows
