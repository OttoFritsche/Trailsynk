
from typing import Optional, Any, List
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field


class ActivityBase(BaseModel):
    name: str
    type: Optional[str] = None
    distance_km: Optional[float] = None
    elevation_gain_m: Optional[float] = None
    elapsed_time_seconds: Optional[int] = None
    moving_time_seconds: Optional[int] = None
    average_speed_kph: Optional[float] = None
    max_speed_kph: Optional[float] = None
    average_heartrate_bpm: Optional[float] = None
    max_heartrate_bpm: Optional[float] = None
    average_cadence_rpm: Optional[float] = None
    average_watts: Optional[float] = None
    route_id: Optional[UUID] = None
    map_polyline: Optional[str] = None
    strava_activity_id: Optional[int] = None
    external_id: Optional[str] = None


class ActivityCreate(ActivityBase):
    pass


class ActivityUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    distance_km: Optional[float] = None
    elevation_gain_m: Optional[float] = None
    elapsed_time_seconds: Optional[int] = None
    moving_time_seconds: Optional[int] = None
    average_speed_kph: Optional[float] = None
    max_speed_kph: Optional[float] = None
    average_heartrate_bpm: Optional[float] = None
    max_heartrate_bpm: Optional[float] = None
    average_cadence_rpm: Optional[float] = None
    average_watts: Optional[float] = None
    route_id: Optional[UUID] = None
    map_polyline: Optional[str] = None


class ActivityResponse(ActivityBase):
    id: UUID
    user_id: Optional[UUID] = None
    created_at: datetime
    start_date: datetime
    kudos_count: Optional[int] = None
    comment_count: Optional[int] = None
    athlete_count: Optional[int] = None
    private: Optional[bool] = None
    trainer: Optional[bool] = None
    commute: Optional[bool] = None
    
    class Config:
        orm_mode = True
