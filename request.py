from sqlalchemy import Column, String, Date, Text, DateTime, Boolean
from database.db import base

class Request(base):
    __tablename__ = "requests"
    request_id = Column(String, primary_key = True)
    customer_name = Column(String, nullable = False)
    email = Column(String, nullable = False)
    country = Column(String, nullable = False)
    timeZone = Column(String, nullable = False)
    category = Column(String, nullable = False)
    priority = Column(String, nullable = False)
    status = Column(String, nullable = False)
    assigned_owner = Column(String, nullable = False)
    due_date = Column(Date, nullable = False)
    notes = Column(Text, nullable = True)
    created_at = Column(DateTime, nullable = False)
    updated_at = Column(DateTime, nullable = False)
    is_archived = Column(Boolean, default = False)