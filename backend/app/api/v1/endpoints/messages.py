
from typing import List, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID

from app.core.auth import get_current_user
from app.schemas.message import (
    MessageCreate, MessageUpdate, MessageResponse,
    ConversationCreate, ConversationResponse,
    ParticipantCreate, ParticipantResponse
)
from app.db import supabase

router = APIRouter()


# Conversation endpoints
@router.get("/conversations", response_model=List[ConversationResponse])
async def get_conversations(
    skip: int = 0,
    limit: int = 100,
    current_user: Dict = Depends(get_current_user)
):
    # Get conversations where the user is a participant
    participant_response = supabase.table("participants") \
                                .select("conversation_id") \
                                .eq("user_id", current_user["user_id"]) \
                                .execute()
    
    if hasattr(participant_response, 'error') and participant_response.error is not None:
        raise HTTPException(status_code=400, detail=str(participant_response.error))
    
    conversation_ids = [item["conversation_id"] for item in participant_response.data]
    
    if not conversation_ids:
        return []
    
    # Get conversation details
    response = supabase.table("conversations") \
                      .select("*") \
                      .in_("id", conversation_ids) \
                      .range(skip, skip + limit - 1) \
                      .order("created_at", desc=True) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data


@router.get("/conversations/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(
    conversation_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is a participant
    participant_check = supabase.table("participants") \
                            .select("*") \
                            .eq("conversation_id", str(conversation_id)) \
                            .eq("user_id", current_user["user_id"]) \
                            .execute()
    
    if hasattr(participant_check, 'error') and participant_check.error is not None:
        raise HTTPException(status_code=400, detail=str(participant_check.error))
    
    if not participant_check.data:
        raise HTTPException(status_code=403, detail="You're not a participant in this conversation")
    
    # Get conversation
    response = supabase.table("conversations") \
                      .select("*") \
                      .eq("id", str(conversation_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return response.data[0]


@router.post("/conversations", response_model=ConversationResponse)
async def create_conversation(
    conversation: ConversationCreate,
    current_user: Dict = Depends(get_current_user)
):
    # Create conversation
    response = supabase.table("conversations") \
                      .insert(conversation.dict()) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    new_conversation = response.data[0]
    
    # Add current user as participant
    participant_data = {
        "conversation_id": new_conversation["id"],
        "user_id": current_user["user_id"]
    }
    
    participant_response = supabase.table("participants") \
                                .insert(participant_data) \
                                .execute()
    
    if hasattr(participant_response, 'error') and participant_response.error is not None:
        # Rollback conversation creation
        supabase.table("conversations").delete().eq("id", new_conversation["id"]).execute()
        raise HTTPException(status_code=400, detail=str(participant_response.error))
    
    return new_conversation


# Message endpoints
@router.get("/conversations/{conversation_id}/messages", response_model=List[MessageResponse])
async def get_messages(
    conversation_id: UUID,
    skip: int = 0,
    limit: int = 50,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is a participant
    participant_check = supabase.table("participants") \
                            .select("*") \
                            .eq("conversation_id", str(conversation_id)) \
                            .eq("user_id", current_user["user_id"]) \
                            .execute()
    
    if hasattr(participant_check, 'error') and participant_check.error is not None:
        raise HTTPException(status_code=400, detail=str(participant_check.error))
    
    if not participant_check.data:
        raise HTTPException(status_code=403, detail="You're not a participant in this conversation")
    
    # Get messages
    response = supabase.table("messages") \
                      .select("*") \
                      .eq("conversation_id", str(conversation_id)) \
                      .range(skip, skip + limit - 1) \
                      .order("sent_at", desc=True) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data


@router.post("/conversations/{conversation_id}/messages", response_model=MessageResponse)
async def create_message(
    conversation_id: UUID,
    message: MessageCreate,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is a participant
    participant_check = supabase.table("participants") \
                            .select("*") \
                            .eq("conversation_id", str(conversation_id)) \
                            .eq("user_id", current_user["user_id"]) \
                            .execute()
    
    if hasattr(participant_check, 'error') and participant_check.error is not None:
        raise HTTPException(status_code=400, detail=str(participant_check.error))
    
    if not participant_check.data:
        raise HTTPException(status_code=403, detail="You're not a participant in this conversation")
    
    # Create message
    message_data = message.dict()
    message_data["sender_id"] = current_user["user_id"]
    
    response = supabase.table("messages") \
                      .insert(message_data) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.put("/messages/{message_id}", response_model=MessageResponse)
async def update_message(
    message_id: UUID,
    message: MessageUpdate,
    current_user: Dict = Depends(get_current_user)
):
    # Check if message exists and belongs to user
    check_response = supabase.table("messages") \
                           .select("*") \
                           .eq("id", str(message_id)) \
                           .eq("sender_id", current_user["user_id"]) \
                           .execute()
    
    if hasattr(check_response, 'error') and check_response.error is not None:
        raise HTTPException(status_code=400, detail=str(check_response.error))
    
    if not check_response.data:
        raise HTTPException(status_code=404, detail="Message not found or you don't have permission")
    
    update_data = {k: v for k, v in message.dict().items() if v is not None}
    
    response = supabase.table("messages") \
                      .update(update_data) \
                      .eq("id", str(message_id)) \
                      .eq("sender_id", current_user["user_id"]) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.delete("/messages/{message_id}")
async def delete_message(
    message_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # Check if message exists and belongs to user
    check_response = supabase.table("messages") \
                           .select("*") \
                           .eq("id", str(message_id)) \
                           .eq("sender_id", current_user["user_id"]) \
                           .execute()
    
    if hasattr(check_response, 'error') and check_response.error is not None:
        raise HTTPException(status_code=400, detail=str(check_response.error))
    
    if not check_response.data:
        raise HTTPException(status_code=404, detail="Message not found or you don't have permission")
    
    response = supabase.table("messages") \
                      .delete() \
                      .eq("id", str(message_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return {"message": "Message deleted successfully"}


# Participants endpoints
@router.get("/conversations/{conversation_id}/participants", response_model=List[ParticipantResponse])
async def get_participants(
    conversation_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is a participant
    participant_check = supabase.table("participants") \
                            .select("*") \
                            .eq("conversation_id", str(conversation_id)) \
                            .eq("user_id", current_user["user_id"]) \
                            .execute()
    
    if hasattr(participant_check, 'error') and participant_check.error is not None:
        raise HTTPException(status_code=400, detail=str(participant_check.error))
    
    if not participant_check.data:
        raise HTTPException(status_code=403, detail="You're not a participant in this conversation")
    
    # Get all participants
    response = supabase.table("participants") \
                      .select("*") \
                      .eq("conversation_id", str(conversation_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data


@router.post("/conversations/{conversation_id}/participants", response_model=ParticipantResponse)
async def add_participant(
    conversation_id: UUID,
    participant: ParticipantCreate,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is a participant
    participant_check = supabase.table("participants") \
                            .select("*") \
                            .eq("conversation_id", str(conversation_id)) \
                            .eq("user_id", current_user["user_id"]) \
                            .execute()
    
    if hasattr(participant_check, 'error') and participant_check.error is not None:
        raise HTTPException(status_code=400, detail=str(participant_check.error))
    
    if not participant_check.data:
        raise HTTPException(status_code=403, detail="You're not a participant in this conversation")
    
    # Add new participant
    response = supabase.table("participants") \
                      .insert(participant.dict()) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.delete("/conversations/{conversation_id}/participants/{user_id}")
async def remove_participant(
    conversation_id: UUID,
    user_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # Check if the conversation is a group chat (can't remove from direct messages)
    conversation_check = supabase.table("conversations") \
                              .select("*") \
                              .eq("id", str(conversation_id)) \
                              .execute()
    
    if hasattr(conversation_check, 'error') and conversation_check.error is not None:
        raise HTTPException(status_code=400, detail=str(conversation_check.error))
    
    if not conversation_check.data:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Check if user is removing themselves or if they're an admin in the group
    is_self = str(user_id) == current_user["user_id"]
    
    if not is_self:
        # TODO: Add admin check logic for group chats
        # For now, only allow self-removal
        raise HTTPException(status_code=403, detail="You can only remove yourself from a conversation")
    
    # Remove participant
    response = supabase.table("participants") \
                      .delete() \
                      .eq("conversation_id", str(conversation_id)) \
                      .eq("user_id", str(user_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Participant not found")
    
    return {"message": "Participant removed successfully"}
