
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class ProfileBase(BaseModel):
    username: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    age: Optional[int] = None
    riding_preferences: Optional[List[str]] = None
    is_profile_complete: Optional[bool] = None

class ProfileUpdate(ProfileBase):
    """
    Schema for profile update requests
    """
    pass

class ProfileResponse(ProfileBase):
    """
    Schema for profile response
    """
    id: str
    created_at: Optional[datetime] = None
