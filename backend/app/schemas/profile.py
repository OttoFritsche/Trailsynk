
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime

class ProfileBase(BaseModel):
    username: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    riding_preferences: Optional[List[str]] = None
    cycling_preferences: Optional[Dict] = None
    
class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: str
    created_at: Optional[datetime] = None
    is_profile_complete: Optional[bool] = False
    
    class Config:
        from_attributes = True
