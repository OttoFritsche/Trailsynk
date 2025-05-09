
from typing import Optional
from pydantic import BaseModel
from datetime import date

class BikeBase(BaseModel):
    name: str
    brand: Optional[str] = None
    model: Optional[str] = None
    type: Optional[str] = None
    image_url: Optional[str] = None
    purchase_date: Optional[date] = None
    initial_odometer_km: Optional[float] = None

class BikeCreate(BikeBase):
    """
    Schema for bike creation requests
    """
    pass

class BikeUpdate(BikeBase):
    """
    Schema for bike update requests
    All fields are optional for updates
    """
    name: Optional[str] = None

class BikeResponse(BikeBase):
    """
    Schema for bike response
    """
    id: str
    user_id: str
    created_at: Optional[date] = None
