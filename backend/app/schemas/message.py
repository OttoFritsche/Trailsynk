
from typing import Optional
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel


class MessageBase(BaseModel):
    content: str
    conversation_id: UUID


class MessageCreate(MessageBase):
    pass


class MessageUpdate(BaseModel):
    content: Optional[str] = None


class MessageResponse(MessageBase):
    id: UUID
    sender_id: Optional[UUID] = None
    sent_at: datetime
    
    class Config:
        orm_mode = True


class ConversationBase(BaseModel):
    type: str
    group_id: Optional[UUID] = None


class ConversationCreate(ConversationBase):
    pass


class ConversationUpdate(BaseModel):
    type: Optional[str] = None
    group_id: Optional[UUID] = None


class ConversationResponse(ConversationBase):
    id: UUID
    created_at: datetime
    
    class Config:
        orm_mode = True


class ParticipantBase(BaseModel):
    user_id: UUID
    conversation_id: UUID


class ParticipantCreate(ParticipantBase):
    pass


class ParticipantResponse(ParticipantBase):
    id: UUID
    joined_at: datetime
    
    class Config:
        orm_mode = True
