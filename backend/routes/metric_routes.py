from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from request import Request
from datetime import date
from sqlalchemy import func

router = APIRouter(
    prefix = "/metrics",
    tags = ["Metrics"]
)
@router.get("/")
def get_metrics(
    db: Session = Depends(get_db)
):
    total_requests = db.query(Request).filter(Request.is_archived == False).count()
    overdue_requests = db.query(Request).filter(Request.is_archived == False, Request.due_date < date.today()).count()
    country_data = (
        db.query(Request.country, func.count(Request.request_id))
        .filter(Request.is_archived == False)
        .group_by(Request.country)
        .all()
    )
    requests_by_country = {country: count for country, count in country_data}
    category_data = (
        db.query(Request.category, func.count(Request.request_id))
        .filter(Request.is_archived == False)
        .group_by(Request.category)
        .all()
    )
    requests_by_category = {category: count for category, count in category_data}
    priority_data = (
        db.query(Request.priority, func.count(Request.request_id))
        .filter(Request.is_archived == False)
        .group_by(Request.priority)
        .all()
    )
    requests_by_priority = {priority: count for priority, count in priority_data}
    status_data = (
        db.query(Request.status, func.count(Request.request_id))
        .filter(Request.is_archived == False)
        .group_by(Request.status)
        .all()
    )
    requests_by_status = {status: count for status, count in status_data}
    urgent_requests = db.query(Request).filter(Request.is_archived == False, Request.priority == "Urgent").count()
    open_requests = db.query(Request).filter(Request.is_archived == False, Request.status.in_(["New", "In Progress", "Waiting on Customer"])).count()
    return {
        "total_requests": total_requests,
        "overdue_requests": overdue_requests,
        "requests_by_country": requests_by_country,
        "requests_by_category": requests_by_category,
        "requests_by_priority": requests_by_priority,
        "requests_by_status": requests_by_status,
        "urgent_requests": urgent_requests,
        "open_requests": open_requests
    }