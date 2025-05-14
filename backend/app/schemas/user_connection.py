
from typing import Optional, Any
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel


class UserConnectionBase(BaseModel):
    provider: str
    provider_user_id: str
    scopes: Optional[str] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    expires_at: Optional[datetime] = None
    other_details: Optional[Any] = None


class UserConnectionCreate(UserConnectionBase):
    user_id: UUID


class UserConnectionUpdate(BaseModel):
    scopes: Optional[str] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    expires_at: Optional[datetime] = None
    other_details: Optional[Any] = None


class UserConnectionResponse(UserConnectionBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
