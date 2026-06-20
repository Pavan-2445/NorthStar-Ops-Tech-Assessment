from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from request import Request
from datetime import datetime, date
from schemas.request_schema import RequestCreate, RequestUpdate

router = APIRouter(
    prefix = "/requests",
    tags = ["Requests"]
)

@router.get("/")
def get_all_requests(
    archived: bool = False,
    overdue: bool = False,
    country: str | None = None,
    category: str | None = None,
    priority: str | None = None,
    status: str | None = None,
    assigned_owner: str | None = None,
    db: Session = Depends(get_db)
): 
    query = db.query(Request).filter(Request.is_archived == archived)
    if overdue is True:
        query = query.filter(Request.due_date < date.today())
    if overdue is False:
        query = query.filter(Request.due_date >= date.today())
    if country:
        query = query.filter(Request.country == country)
    if category:
        query = query.filter(Request.category == category)
    if priority:
        query = query.filter(Request.priority == priority)
    if status:
        query = query.filter(Request.status == status)
    if assigned_owner:
        query = query.filter(Request.assigned_owner == assigned_owner)
    requests = query.all()
    return requests
    # requests = (
    #     db.query(Request).filter(Request.is_archived == archived).all()
    # )
    # return requests

@router.post("/")
def create_request(
    request: RequestCreate,
    db: Session = Depends(get_db)
):
    last_request = (
        db.query(Request)
        .order_by(Request.request_id.desc())
        .first()
    )
    if not last_request:
        next_id = "REQ-1001"
    else:
        last_num = int(last_request.request_id.split("-")[1])
        next_id = f"REQ-{last_num + 1}"
    new_request = Request(
        request_id = next_id,
        customer_name = request.customer_name,
        email = request.email,
        country = request.country,
        timeZone = request.timeZone,
        category = request.category,
        priority = request.priority,
        status = request.status,
        assigned_owner = request.assigned_owner,
        due_date = request.due_date,
        notes = request.notes,
        created_at = datetime.now(),
        updated_at = datetime.now(),
        is_archived = False
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return { 
        "message": "Request created successfully",
        "request":  new_request.request_id}

@router.get("/{request_id}")
def get_request_by_id(
    request_id: str,
    db: Session = Depends(get_db)
):
    request = db.query(Request).filter(Request.request_id == request_id, Request.is_archived == False).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    return request

@router.patch("/{request_id}")
def update_request(
    request_id : str,
    request_data : RequestUpdate,
    db: Session = Depends(get_db)
):
    request = db.query(Request).filter(Request.request_id == request_id, Request.is_archived == False).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    update_data = request_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(request, key, value)
    request.updated_at = datetime.utcnow()

    # if request_data.priority is not None:
    #     request.priority = request_data.priority
    # if request_data.assigned_owner is not None:
    #     request.assigned_owner = request_data.assigned_owner
    # if request_data.status is not None:
    #     request.status = request_data.status
    # if request_data.due_date is not None:
    #     request.due_date = request_data.due_date
    # if request_data.notes is not None:
    #     request.notes = request_data.notes
    # request.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(request)
    return {"message": "Request updated successfully", "request_id": request.request_id}

@router.delete("/{request_id}")
def archive_request(
    request_id: str,
    db: Session = Depends(get_db)
):
    request = db.query(Request).filter(Request.request_id == request_id, Request.is_archived == False).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    request.is_archived = True
    request.updated_at = datetime.utcnow()
    db.commit()
    return {"message": "Request archived successfully", "request_id": request.request_id}

# @router.get("/archived")
# def get_archived_requests(
#     db: Session = Depends(get_db)
# ):
#     archived_requests = db.query(Request).filter(Request.is_archived == True).all()
#     return archived_requests