
from typing import Optional, Any, List
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field


class RouteBase(BaseModel):
    name: str
    description: Optional[str] = None
    type: Optional[str] = None
    distance_km: Optional[float] = None
    elevation_gain_m: Optional[float] = None
    coordinates: Any  # JSON data representing coordinates


class RouteCreate(RouteBase):
    pass


class RouteUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    distance_km: Optional[float] = None
    elevation_gain_m: Optional[float] = None
    coordinates: Optional[Any] = None


class RouteResponse(RouteBase):
    id: UUID
    user_id: Optional[UUID] = None
    created_at: datetime
    
    class Config:
        orm_mode = True
