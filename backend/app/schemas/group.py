
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field


class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None
    group_type: Optional[str] = None
    image_url: Optional[str] = None


class GroupCreate(GroupBase):
    pass


class GroupUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    group_type: Optional[str] = None
    image_url: Optional[str] = None


class GroupResponse(GroupBase):
    id: UUID
    creator_id: Optional[UUID] = None
    created_at: datetime
    
    class Config:
        orm_mode = True


class GroupMemberBase(BaseModel):
    role: Optional[str] = None


class GroupMemberCreate(GroupMemberBase):
    group_id: UUID
    member_id: UUID


class GroupMemberUpdate(BaseModel):
    role: Optional[str] = None


class GroupMemberResponse(GroupMemberBase):
    id: UUID
    group_id: UUID
    member_id: UUID
    joined_at: datetime
    
    class Config:
        orm_mode = True
