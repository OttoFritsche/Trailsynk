
from typing import List, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID

from app.core.auth import get_current_user
from app.schemas.route import RouteCreate, RouteUpdate, RouteResponse
from app.db import supabase

router = APIRouter()


@router.get("", response_model=List[RouteResponse])
async def get_routes(
    skip: int = 0,
    limit: int = 100,
    current_user: Dict = Depends(get_current_user)
):
    response = supabase.table("routes_data") \
                      .select("*") \
                      .eq("user_id", current_user["user_id"]) \
                      .range(skip, skip + limit - 1) \
                      .order("created_at", desc=True) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data


@router.get("/{route_id}", response_model=RouteResponse)
async def get_route(
    route_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    response = supabase.table("routes_data") \
                      .select("*") \
                      .eq("id", str(route_id)) \
                      .eq("user_id", current_user["user_id"]) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Route not found")
    
    return response.data[0]


@router.post("", response_model=RouteResponse)
async def create_route(
    route: RouteCreate,
    current_user: Dict = Depends(get_current_user)
):
    route_data = route.dict()
    route_data["user_id"] = current_user["user_id"]
    
    response = supabase.table("routes_data") \
                      .insert(route_data) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.put("/{route_id}", response_model=RouteResponse)
async def update_route(
    route_id: UUID,
    route: RouteUpdate,
    current_user: Dict = Depends(get_current_user)
):
    # First check if route exists and belongs to user
    check_response = supabase.table("routes_data") \
                           .select("id") \
                           .eq("id", str(route_id)) \
                           .eq("user_id", current_user["user_id"]) \
                           .execute()
    
    if hasattr(check_response, 'error') and check_response.error is not None:
        raise HTTPException(status_code=400, detail=str(check_response.error))
    
    if not check_response.data:
        raise HTTPException(status_code=404, detail="Route not found or you don't have permission")
    
    update_data = {k: v for k, v in route.dict().items() if v is not None}
    
    response = supabase.table("routes_data") \
                      .update(update_data) \
                      .eq("id", str(route_id)) \
                      .eq("user_id", current_user["user_id"]) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.delete("/{route_id}")
async def delete_route(
    route_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # First check if route exists and belongs to user
    check_response = supabase.table("routes_data") \
                           .select("id") \
                           .eq("id", str(route_id)) \
                           .eq("user_id", current_user["user_id"]) \
                           .execute()
    
    if hasattr(check_response, 'error') and check_response.error is not None:
        raise HTTPException(status_code=400, detail=str(check_response.error))
    
    if not check_response.data:
        raise HTTPException(status_code=404, detail="Route not found or you don't have permission")
    
    response = supabase.table("routes_data") \
                      .delete() \
                      .eq("id", str(route_id)) \
                      .eq("user_id", current_user["user_id"]) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return {"message": "Route deleted successfully"}
