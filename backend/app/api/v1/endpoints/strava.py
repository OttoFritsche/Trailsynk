
from typing import Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse
import urllib.parse
import secrets
import time
from datetime import datetime, timedelta
import requests

from app.core.auth import get_current_user
from app.schemas.user_connection import UserConnectionCreate, UserConnectionUpdate
from app.db import supabase
from app.core.config import settings

router = APIRouter()

# Constants for Strava API
STRAVA_CLIENT_ID = "YOUR_STRAVA_CLIENT_ID"  # Replace with actual client ID or environment variable
STRAVA_CLIENT_SECRET = "YOUR_STRAVA_CLIENT_SECRET"  # Replace with actual client secret or environment variable
STRAVA_AUTH_URL = "https://www.strava.com/oauth/authorize"
STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token"
STRAVA_API_BASE = "https://www.strava.com/api/v3"
STRAVA_REDIRECT_URI = "http://localhost:8000/api/v1/strava/callback"  # Update based on your actual URL


@router.get("/auth")
async def authorize_strava(request: Request):
    """
    Redirect the user to Strava's authorization page.
    """
    # Generate a random state string to prevent CSRF attacks
    state = secrets.token_urlsafe(16)
    
    # Store state in a session or database (placeholder - implement actual storage)
    # session["strava_auth_state"] = state
    
    # Build authorization URL
    params = {
        "client_id": STRAVA_CLIENT_ID,
        "redirect_uri": STRAVA_REDIRECT_URI,
        "response_type": "code",
        "approval_prompt": "auto",
        "scope": "read,activity:read_all,profile:read_all",
        "state": state
    }
    
    auth_url = f"{STRAVA_AUTH_URL}?{urllib.parse.urlencode(params)}"
    return RedirectResponse(url=auth_url)


@router.get("/callback")
async def strava_callback(
    code: Optional[str] = None, 
    state: Optional[str] = None, 
    error: Optional[str] = None,
    request: Request = None
):
    """
    Handle the OAuth callback from Strava.
    """
    # Check for errors
    if error:
        raise HTTPException(status_code=400, detail=f"Strava authorization error: {error}")
    
    if not code:
        raise HTTPException(status_code=400, detail="Missing authorization code")
    
    # Verify state (placeholder - implement actual verification)
    # stored_state = session.pop("strava_auth_state", None)
    # if not stored_state or stored_state != state:
    #     raise HTTPException(status_code=400, detail="Invalid state parameter")
    
    # Exchange the code for an access token
    token_data = {
        "client_id": STRAVA_CLIENT_ID,
        "client_secret": STRAVA_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code"
    }
    
    try:
        # Make a POST request to Strava to get the tokens
        token_response = requests.post(STRAVA_TOKEN_URL, data=token_data)
        token_response.raise_for_status()
        token_info = token_response.json()
        
        # Extract token data
        access_token = token_info.get("access_token")
        refresh_token = token_info.get("refresh_token")
        expires_at = datetime.fromtimestamp(token_info.get("expires_at"))
        athlete = token_info.get("athlete", {})
        athlete_id = str(athlete.get("id"))
        
        # Get user ID from JWT (placeholder - implement actual JWT decoding)
        # user_id = get_user_id_from_jwt()
        
        # Temporary workaround: Redirect to frontend with token info
        # In a real implementation, you would store these tokens in your database
        frontend_url = "http://localhost:3000/profile?strava_connected=true"
        return RedirectResponse(url=frontend_url)
        
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to get Strava token: {str(e)}")


@router.post("/connect")
async def connect_strava(
    token_data: Dict,
    current_user: Dict = Depends(get_current_user)
):
    """
    Save Strava connection tokens for the authenticated user.
    
    This endpoint is called from the frontend after successful OAuth flow.
    """
    try:
        # Extract token information
        access_token = token_data.get("access_token")
        refresh_token = token_data.get("refresh_token")
        expires_at = datetime.fromtimestamp(token_data.get("expires_at"))
        athlete_id = str(token_data.get("athlete_id"))
        
        if not all([access_token, refresh_token, athlete_id]):
            raise HTTPException(status_code=400, detail="Missing required token information")
        
        # Check if a connection already exists
        existing_connection = supabase.table("user_connections") \
                                    .select("*") \
                                    .eq("user_id", current_user["user_id"]) \
                                    .eq("provider", "strava") \
                                    .execute()
        
        connection_data = {
            "provider": "strava",
            "provider_user_id": athlete_id,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "expires_at": expires_at.isoformat(),
            "scopes": "read,activity:read_all,profile:read_all",
            "user_id": current_user["user_id"],
            "other_details": token_data.get("athlete", {})
        }
        
        if existing_connection.data:
            # Update existing connection
            connection_id = existing_connection.data[0]["id"]
            response = supabase.table("user_connections") \
                            .update(connection_data) \
                            .eq("id", connection_id) \
                            .execute()
        else:
            # Create new connection
            response = supabase.table("user_connections") \
                            .insert(connection_data) \
                            .execute()
        
        if hasattr(response, 'error') and response.error is not None:
            raise HTTPException(status_code=400, detail=str(response.error))
        
        return {"message": "Strava connection saved successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save Strava connection: {str(e)}")


@router.post("/sync")
async def sync_strava_activities(
    current_user: Dict = Depends(get_current_user)
):
    """
    Sync activities from Strava for the authenticated user.
    """
    try:
        # Get the user's Strava connection
        connection_response = supabase.table("user_connections") \
                                  .select("*") \
                                  .eq("user_id", current_user["user_id"]) \
                                  .eq("provider", "strava") \
                                  .execute()
        
        if hasattr(connection_response, 'error') and connection_response.error is not None:
            raise HTTPException(status_code=400, detail=str(connection_response.error))
        
        if not connection_response.data:
            raise HTTPException(status_code=404, detail="No Strava connection found for user")
        
        connection = connection_response.data[0]
        
        # Check if token is expired and refresh if needed
        now = datetime.now()
        token_expires_at = datetime.fromisoformat(connection["expires_at"].replace("Z", "+00:00"))
        
        access_token = connection["access_token"]
        
        if token_expires_at <= now:
            # Refresh the token
            refresh_data = {
                "client_id": STRAVA_CLIENT_ID,
                "client_secret": STRAVA_CLIENT_SECRET,
                "grant_type": "refresh_token",
                "refresh_token": connection["refresh_token"]
            }
            
            refresh_response = requests.post(STRAVA_TOKEN_URL, data=refresh_data)
            refresh_response.raise_for_status()
            
            token_info = refresh_response.json()
            access_token = token_info["access_token"]
            refresh_token = token_info["refresh_token"]
            expires_at = datetime.fromtimestamp(token_info["expires_at"])
            
            # Update the stored token
            update_response = supabase.table("user_connections") \
                                .update({
                                    "access_token": access_token,
                                    "refresh_token": refresh_token,
                                    "expires_at": expires_at.isoformat()
                                }) \
                                .eq("id", connection["id"]) \
                                .execute()
        
        # Get activities from Strava
        # This is a placeholder - in a real implementation, you would:
        # 1. Find the most recent activity already imported
        # 2. Use 'after' parameter to only get new activities
        # 3. Handle pagination for large numbers of activities
        activities_url = f"{STRAVA_API_BASE}/athlete/activities"
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        
        # For this demo, just get the last 30 days of activities
        after = int((datetime.now() - timedelta(days=30)).timestamp())
        params = {
            "after": after,
            "per_page": 100  # Maximum allowed by Strava
        }
        
        # Placeholder for the actual API call
        # activities_response = requests.get(activities_url, headers=headers, params=params)
        # activities_response.raise_for_status()
        # strava_activities = activities_response.json()
        
        # Placeholder data for demonstration
        strava_activities = [
            {
                "id": 1234567890,
                "name": "Morning Ride",
                "type": "Ride",
                "start_date": "2023-01-01T09:00:00Z",
                "distance": 20000,  # meters
                "moving_time": 3600,  # seconds
                "elapsed_time": 4000,  # seconds
                "total_elevation_gain": 500,  # meters
                "average_speed": 5.5,  # meters/second
                "max_speed": 10.2,  # meters/second
                "average_cadence": 85,
                "average_watts": 200,
                "kilojoules": 720,
                "average_heartrate": 145,
                "max_heartrate": 175
            }
        ]
        
        # Process and store each activity
        activities_imported = 0
        for strava_activity in strava_activities:
            # Check if activity already exists
            existing_check = supabase.table("activities") \
                                .select("id") \
                                .eq("strava_activity_id", strava_activity["id"]) \
                                .execute()
            
            if existing_check.data:
                continue  # Skip if already imported
            
            # Convert to our format
            activity_data = {
                "name": strava_activity["name"],
                "type": strava_activity["type"],
                "strava_activity_id": strava_activity["id"],
                "start_date": strava_activity["start_date"],
                "distance_km": strava_activity["distance"] / 1000,  # convert to km
                "elevation_gain_m": strava_activity["total_elevation_gain"],
                "moving_time_seconds": strava_activity["moving_time"],
                "elapsed_time_seconds": strava_activity["elapsed_time"],
                "average_speed_kph": strava_activity["average_speed"] * 3.6,  # convert m/s to km/h
                "max_speed_kph": strava_activity["max_speed"] * 3.6,  # convert m/s to km/h
                "user_id": current_user["user_id"]
            }
            
            # Add optional fields if present
            if "average_cadence" in strava_activity:
                activity_data["average_cadence_rpm"] = strava_activity["average_cadence"]
            
            if "average_watts" in strava_activity:
                activity_data["average_watts"] = strava_activity["average_watts"]
            
            if "average_heartrate" in strava_activity:
                activity_data["average_heartrate_bpm"] = strava_activity["average_heartrate"]
            
            if "max_heartrate" in strava_activity:
                activity_data["max_heartrate_bpm"] = strava_activity["max_heartrate"]
            
            # Insert into database (this is a placeholder - actual implementation would include error handling)
            # supabase.table("activities").insert(activity_data).execute()
            activities_imported += 1
        
        return {
            "message": f"Strava sync completed",
            "activities_imported": activities_imported
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to sync Strava activities: {str(e)}")
