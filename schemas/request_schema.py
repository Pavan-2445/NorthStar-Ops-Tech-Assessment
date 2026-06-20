from pydantic import BaseModel, EmailStr
from datetime import date, datetime
class RequestCreate(BaseModel):
    customer_name: str
    email: EmailStr
    country: str
    timeZone: str
    category: str
    priority: str
    status: str
    assigned_owner: str
    due_date: date
    notes: str | None = None

class RequestCreatedResponse(BaseModel):
    request_id: str
    created_at: datetime
    message: str

class RequestUpdate(BaseModel):
    priority: str | None = None
    assigned_owner: str | None = None
    status: str | None = None
    due_date: date | None = None
    notes: str | None = None

class RequestResponse(BaseModel):
    request_id: str
    customer_name: str
    email: EmailStr
    country: str
    timeZone: str
    category: str
    priority: str
    status: str
    assigned_owner: str
    due_date: date
    notes: str | None = None
    created_at: datetime
    updated_at: datetime
    is_archived: bool

    class Config:
        #orm mode
        from_attributes = True  

