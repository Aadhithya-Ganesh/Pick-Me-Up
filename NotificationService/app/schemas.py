from pydantic import BaseModel
from datetime import datetime

class NotificationResponse(BaseModel):
    id: str
    user_id: str
    type: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True
