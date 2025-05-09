
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date

class BikeBase(BaseModel):
    name: str
    brand: Optional[str] = None
    model: Optional[str] = None
    type: Optional[str] = None
    image_url: Optional[str] = None
    purchase_date: Optional[date] = None
    initial_odometer_km: Optional[float] = None
    
class BikeCreate(BikeBase):
    pass
    
class BikeUpdate(BikeBase):
    name: Optional[str] = None
    
class BikeResponse(BikeBase):
    id: str
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True
