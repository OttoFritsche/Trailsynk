
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.auth import get_current_user
from app.schemas.profile import ProfileUpdate, ProfileResponse
from app.db import supabase
from typing import Dict

router = APIRouter()

@router.get("", response_model=ProfileResponse)
async def get_profile(current_user: Dict = Depends(get_current_user)):
    """
    Get the current user's profile.
    """
    try:
        # Get the profile data from Supabase
        response = supabase.table("profiles").select("*").eq("id", current_user["user_id"]).execute()
        data = response.data
        
        if not data or len(data) == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found",
            )
        
        # Return the first (and only) profile
        return data[0]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get profile: {str(e)}",
        )

@router.put("", response_model=ProfileResponse)
async def update_profile(
    profile_update: ProfileUpdate, 
    current_user: Dict = Depends(get_current_user)
):
    """
    Update the current user's profile.
    """
    try:
        # Convert the Pydantic model to a dictionary, excluding unset fields
        update_data = profile_update.dict(exclude_unset=True)
        
        # Update the profile in Supabase
        response = supabase.table("profiles").update(update_data).eq("id", current_user["user_id"]).execute()
        data = response.data
        
        if not data or len(data) == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found or not updated",
            )
        
        # Return the updated profile
        return data[0]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update profile: {str(e)}",
        )
