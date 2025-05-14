
from typing import List, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID

from app.core.auth import get_current_user
from app.schemas.group import (
    GroupCreate, GroupUpdate, GroupResponse,
    GroupMemberCreate, GroupMemberUpdate, GroupMemberResponse
)
from app.db import supabase

router = APIRouter()


# Group endpoints
@router.get("", response_model=List[GroupResponse])
async def get_groups(
    skip: int = 0,
    limit: int = 100,
    current_user: Dict = Depends(get_current_user)
):
    # Get groups where the user is a member
    member_response = supabase.table("group_members") \
                            .select("group_id") \
                            .eq("member_id", current_user["user_id"]) \
                            .execute()
    
    if hasattr(member_response, 'error') and member_response.error is not None:
        raise HTTPException(status_code=400, detail=str(member_response.error))
    
    # Extract group IDs
    group_ids = [item["group_id"] for item in member_response.data]
    
    if not group_ids:
        return []
    
    # Get group details
    response = supabase.table("groups") \
                      .select("*") \
                      .in_("id", group_ids) \
                      .range(skip, skip + limit - 1) \
                      .order("created_at", desc=True) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data


@router.get("/{group_id}", response_model=GroupResponse)
async def get_group(
    group_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # First check if user is a member of the group
    member_check = supabase.table("group_members") \
                         .select("*") \
                         .eq("group_id", str(group_id)) \
                         .eq("member_id", current_user["user_id"]) \
                         .execute()
    
    if hasattr(member_check, 'error') and member_check.error is not None:
        raise HTTPException(status_code=400, detail=str(member_check.error))
    
    if not member_check.data:
        raise HTTPException(status_code=403, detail="You're not a member of this group")
    
    # Get group details
    response = supabase.table("groups") \
                      .select("*") \
                      .eq("id", str(group_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Group not found")
    
    return response.data[0]


@router.post("", response_model=GroupResponse)
async def create_group(
    group: GroupCreate,
    current_user: Dict = Depends(get_current_user)
):
    group_data = group.dict()
    group_data["creator_id"] = current_user["user_id"]
    
    # Create the group
    response = supabase.table("groups") \
                      .insert(group_data) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    new_group = response.data[0]
    
    # Add creator as a member with admin role
    member_data = {
        "group_id": new_group["id"],
        "member_id": current_user["user_id"],
        "role": "admin"
    }
    
    member_response = supabase.table("group_members") \
                            .insert(member_data) \
                            .execute()
    
    if hasattr(member_response, 'error') and member_response.error is not None:
        # If adding member fails, delete the group
        supabase.table("groups").delete().eq("id", new_group["id"]).execute()
        raise HTTPException(status_code=400, detail=str(member_response.error))
    
    return new_group


@router.put("/{group_id}", response_model=GroupResponse)
async def update_group(
    group_id: UUID,
    group: GroupUpdate,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is an admin of the group
    admin_check = supabase.table("group_members") \
                        .select("*") \
                        .eq("group_id", str(group_id)) \
                        .eq("member_id", current_user["user_id"]) \
                        .eq("role", "admin") \
                        .execute()
    
    if hasattr(admin_check, 'error') and admin_check.error is not None:
        raise HTTPException(status_code=400, detail=str(admin_check.error))
    
    if not admin_check.data:
        raise HTTPException(status_code=403, detail="Only group admins can update group details")
    
    update_data = {k: v for k, v in group.dict().items() if v is not None}
    
    response = supabase.table("groups") \
                      .update(update_data) \
                      .eq("id", str(group_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.delete("/{group_id}")
async def delete_group(
    group_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is the creator of the group
    group_check = supabase.table("groups") \
                        .select("*") \
                        .eq("id", str(group_id)) \
                        .eq("creator_id", current_user["user_id"]) \
                        .execute()
    
    if hasattr(group_check, 'error') and group_check.error is not None:
        raise HTTPException(status_code=400, detail=str(group_check.error))
    
    if not group_check.data:
        raise HTTPException(status_code=403, detail="Only the group creator can delete the group")
    
    # Delete all group members first
    members_delete = supabase.table("group_members") \
                           .delete() \
                           .eq("group_id", str(group_id)) \
                           .execute()
    
    if hasattr(members_delete, 'error') and members_delete.error is not None:
        raise HTTPException(status_code=400, detail=str(members_delete.error))
    
    # Now delete the group
    response = supabase.table("groups") \
                      .delete() \
                      .eq("id", str(group_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return {"message": "Group deleted successfully"}


# Group members endpoints
@router.get("/{group_id}/members", response_model=List[GroupMemberResponse])
async def get_group_members(
    group_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is a member of the group
    member_check = supabase.table("group_members") \
                         .select("*") \
                         .eq("group_id", str(group_id)) \
                         .eq("member_id", current_user["user_id"]) \
                         .execute()
    
    if hasattr(member_check, 'error') and member_check.error is not None:
        raise HTTPException(status_code=400, detail=str(member_check.error))
    
    if not member_check.data:
        raise HTTPException(status_code=403, detail="You're not a member of this group")
    
    # Get all members
    response = supabase.table("group_members") \
                      .select("*") \
                      .eq("group_id", str(group_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data


@router.post("/{group_id}/members", response_model=GroupMemberResponse)
async def add_group_member(
    group_member: GroupMemberCreate,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is an admin of the group
    admin_check = supabase.table("group_members") \
                        .select("*") \
                        .eq("group_id", str(group_member.group_id)) \
                        .eq("member_id", current_user["user_id"]) \
                        .eq("role", "admin") \
                        .execute()
    
    if hasattr(admin_check, 'error') and admin_check.error is not None:
        raise HTTPException(status_code=400, detail=str(admin_check.error))
    
    if not admin_check.data:
        raise HTTPException(status_code=403, detail="Only group admins can add members")
    
    # Add the new member
    response = supabase.table("group_members") \
                      .insert(group_member.dict()) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    return response.data[0]


@router.put("/{group_id}/members/{member_id}", response_model=GroupMemberResponse)
async def update_group_member(
    group_id: UUID,
    member_id: UUID,
    member_update: GroupMemberUpdate,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is an admin of the group
    admin_check = supabase.table("group_members") \
                        .select("*") \
                        .eq("group_id", str(group_id)) \
                        .eq("member_id", current_user["user_id"]) \
                        .eq("role", "admin") \
                        .execute()
    
    if hasattr(admin_check, 'error') and admin_check.error is not None:
        raise HTTPException(status_code=400, detail=str(admin_check.error))
    
    if not admin_check.data:
        raise HTTPException(status_code=403, detail="Only group admins can update member roles")
    
    # Update the member role
    response = supabase.table("group_members") \
                      .update(member_update.dict()) \
                      .eq("group_id", str(group_id)) \
                      .eq("member_id", str(member_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Group member not found")
    
    return response.data[0]


@router.delete("/{group_id}/members/{member_id}")
async def remove_group_member(
    group_id: UUID,
    member_id: UUID,
    current_user: Dict = Depends(get_current_user)
):
    # Check if user is an admin of the group or the member themselves
    admin_check = supabase.table("group_members") \
                        .select("*") \
                        .eq("group_id", str(group_id)) \
                        .eq("member_id", current_user["user_id"]) \
                        .eq("role", "admin") \
                        .execute()
    
    is_admin = bool(admin_check.data)
    is_self = str(member_id) == current_user["user_id"]
    
    if not (is_admin or is_self):
        raise HTTPException(
            status_code=403, 
            detail="Only group admins can remove members, or members can remove themselves"
        )
    
    # Remove the member
    response = supabase.table("group_members") \
                      .delete() \
                      .eq("group_id", str(group_id)) \
                      .eq("member_id", str(member_id)) \
                      .execute()
    
    if hasattr(response, 'error') and response.error is not None:
        raise HTTPException(status_code=400, detail=str(response.error))
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Group member not found")
    
    return {"message": "Member removed from group successfully"}
