from pydantic import BaseModel
from datetime import datetime

class NotificationResponse(BaseModel):
    id: str
    user_id: str
    type: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
