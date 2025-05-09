
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.auth import get_current_user
from app.schemas.bike import BikeCreate, BikeUpdate, BikeResponse
from app.db import supabase
from typing import Dict, List

router = APIRouter()

@router.get("", response_model=List[BikeResponse])
async def get_bikes(current_user: Dict = Depends(get_current_user)):
    """
    Get all bikes for the current user.
    """
    try:
        # Get all bikes for the user from Supabase
        response = supabase.table("bikes").select("*").eq("user_id", current_user["user_id"]).execute()
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get bikes: {str(e)}",
        )

@router.post("", response_model=BikeResponse, status_code=status.HTTP_201_CREATED)
async def create_bike(bike: BikeCreate, current_user: Dict = Depends(get_current_user)):
    """
    Create a new bike for the current user.
    """
    try:
        # Convert the Pydantic model to a dictionary
        bike_data = bike.dict()
        # Add the user_id to the bike data
        bike_data["user_id"] = current_user["user_id"]
        
        # Insert the new bike into Supabase
        response = supabase.table("bikes").insert(bike_data).execute()
        data = response.data
        
        if not data or len(data) == 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create bike",
            )
        
        # Return the created bike
        return data[0]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create bike: {str(e)}",
        )

@router.put("/{bike_id}", response_model=BikeResponse)
async def update_bike(
    bike_id: str, 
    bike_update: BikeUpdate, 
    current_user: Dict = Depends(get_current_user)
):
    """
    Update a specific bike for the current user.
    """
    try:
        # First, check if the bike exists and belongs to the user
        check_response = supabase.table("bikes").select("id").eq("id", bike_id).eq("user_id", current_user["user_id"]).execute()
        
        if not check_response.data or len(check_response.data) == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bike not found or you don't have permission to update it",
            )
        
        # Convert the Pydantic model to a dictionary, excluding unset fields
        update_data = bike_update.dict(exclude_unset=True)
        
        # Update the bike in Supabase
        response = supabase.table("bikes").update(update_data).eq("id", bike_id).eq("user_id", current_user["user_id"]).execute()
        data = response.data
        
        if not data or len(data) == 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update bike",
            )
        
        # Return the updated bike
        return data[0]
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update bike: {str(e)}",
        )

@router.delete("/{bike_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_bike(bike_id: str, current_user: Dict = Depends(get_current_user)):
    """
    Delete a specific bike for the current user.
    """
    try:
        # First, check if the bike exists and belongs to the user
        check_response = supabase.table("bikes").select("id").eq("id", bike_id).eq("user_id", current_user["user_id"]).execute()
        
        if not check_response.data or len(check_response.data) == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bike not found or you don't have permission to delete it",
            )
        
        # Delete the bike from Supabase
        supabase.table("bikes").delete().eq("id", bike_id).eq("user_id", current_user["user_id"]).execute()
        
        # Return no content
        return None
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete bike: {str(e)}",
        )
