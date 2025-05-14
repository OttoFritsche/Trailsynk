
from typing import List, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID

from app.core.auth import get_current_user
from app.schemas.activity import ActivityCreate, ActivityUpdate, ActivityResponse
from app.db import supabase

router = APIRouter()


@router.get("", response_model=List[ActivityResponse])
async def get_activities(
    skip: int = 0,
    limit: int = 100,
    current_user: Dict = Depends(get_current_user)
):
    response = supabase.table("activities") \
                      .select("*") \
                      .eq("user_id", current_user["user_id"]) \
                      .range(skip, skip + limit - 1) \
                      .order("created_at", desc=True) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data


@router.get("/{activity_id}", response_model=ActivityResponse)
async def get_activity(
    activity_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    response = supabase.table("activities") \
                      .select("*") \
                      .eq("id", str(activity_id)) \
                      .eq("user_id", current_user["user_id"]) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    return response.data[0]


@router.post("", response_model=ActivityResponse)
async def create_activity(
    activity: ActivityCreate,
    current_user: Dict = Depends(get_current_user)
):
    activity_data = activity.dict()
    activity_data["user_id"] = current_user["user_id"]
    
    response = supabase.table("activities") \
                      .insert(activity_data) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.put("/{activity_id}", response_model=ActivityResponse)
async def update_activity(
    activity_id: UUID,
    activity: ActivityUpdate,
    current_user: Dict = Depends(get_current_user)
):
    # First check if activity exists and belongs to user
    check_response = supabase.table("activities") \
                           .select("id") \
                           .eq("id", str(activity_id)) \
                           .eq("user_id", current_user["user_id"]) \
                           .execute()
    
    if hasattr(check_response, 'error') and check_response.error is not None:
        raise HTTPException(status_code=400, detail=str(check_response.error))
    
    if not check_response.data:
        raise HTTPException(status_code=404, detail="Activity not found or you don't have permission")
    
    update_data = {k: v for k, v in activity.dict().items() if v is not None}
    
    response = supabase.table("activities") \
                      .update(update_data) \
                      .eq("id", str(activity_id)) \
                      .eq("user_id", current_user["user_id"]) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.delete("/{activity_id}")
async def delete_activity(
    activity_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # First check if activity exists and belongs to user
    check_response = supabase.table("activities") \
                           .select("id") \
                           .eq("id", str(activity_id)) \
                           .eq("user_id", current_user["user_id"]) \
                           .execute()
    
    if hasattr(check_response, 'error') and check_response.error is not None:
        raise HTTPException(status_code=400, detail=str(check_response.error))
    
    if not check_response.data:
        raise HTTPException(status_code=404, detail="Activity not found or you don't have permission")
    
    response = supabase.table("activities") \
                      .delete() \
                      .eq("id", str(activity_id)) \
                      .eq("user_id", current_user["user_id"]) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return {"message": "Activity deleted successfully"}
