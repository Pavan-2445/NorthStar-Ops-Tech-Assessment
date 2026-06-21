from datetime import datetime, timedelta
from database.db import SessionLocal
from request import Request

db = SessionLocal()
seed_requests = [

{
    "request_id": "REQ-1001",
    "customer_name": "Maya Thompson",
    "email": "maya@example.com",
    "country": "United States",
    "timeZone": "Eastern",
    "category": "Sales Lead",
    "priority": "High",
    "status": "New",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1002",
    "customer_name": "Andre Brooks",
    "email": "andre@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Technical Issue",
    "priority": "Urgent",
    "status": "In Progress",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1003",
    "customer_name": "Lena Carter",
    "email": "lena@example.com",
    "country": "United States",
    "timeZone": "Central",
    "category": "Billing",
    "priority": "Medium",
    "status": "Waiting on Customer",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1004",
    "customer_name": "Noah Williams",
    "email": "noah@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Appointment Follow-up",
    "priority": "High",
    "status": "New",
    "assigned_owner": "Ops Agent 3"
},

{
    "request_id": "REQ-1005",
    "customer_name": "Priya Shah",
    "email": "priya@example.com",
    "country": "United States",
    "timeZone": "Pacific",
    "category": "General Question",
    "priority": "Low",
    "status": "Resolved",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1006",
    "customer_name": "Marcus Reed",
    "email": "marcus@example.com",
    "country": "United States",
    "timeZone": "Mountain",
    "category": "Technical Issue",
    "priority": "Urgent",
    "status": "New",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1007",
    "customer_name": "Olivia Chen",
    "email": "olivia@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Sales Lead",
    "priority": "Medium",
    "status": "In Progress",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1008",
    "customer_name": "Daniel King",
    "email": "daniel@example.com",
    "country": "United States",
    "timeZone": "Eastern",
    "category": "Billing",
    "priority": "High",
    "status": "Closed",
    "assigned_owner": "Ops Agent 3"
},

{
    "request_id": "REQ-1009",
    "customer_name": "Aisha Morgan",
    "email": "aisha@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Appointment Follow-up",
    "priority": "Medium",
    "status": "Waiting on Customer",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1010",
    "customer_name": "Ethan Lewis",
    "email": "ethan@example.com",
    "country": "United States",
    "timeZone": "Pacific",
    "category": "General Question",
    "priority": "Low",
    "status": "New",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1011",
    "customer_name": "Sophia Turner",
    "email": "sophia@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Sales Lead",
    "priority": "Urgent",
    "status": "New",
    "assigned_owner": "Ops Agent 3"
},

{
    "request_id": "REQ-1012",
    "customer_name": "Ryan Cooper",
    "email": "ryan@example.com",
    "country": "United States",
    "timeZone": "Central",
    "category": "Technical Issue",
    "priority": "High",
    "status": "In Progress",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1013",
    "customer_name": "Grace Miller",
    "email": "grace@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Billing",
    "priority": "Medium",
    "status": "Resolved",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1014",
    "customer_name": "Benjamin Scott",
    "email": "ben@example.com",
    "country": "United States",
    "timeZone": "Eastern",
    "category": "Appointment Follow-up",
    "priority": "Low",
    "status": "Closed",
    "assigned_owner": "Ops Agent 3"
},

{
    "request_id": "REQ-1015",
    "customer_name": "Chloe Davis",
    "email": "chloe@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "General Question",
    "priority": "Medium",
    "status": "New",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1016",
    "customer_name": "Jacob White",
    "email": "jacob@example.com",
    "country": "United States",
    "timeZone": "Mountain",
    "category": "Technical Issue",
    "priority": "Urgent",
    "status": "In Progress",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1017",
    "customer_name": "Emily Parker",
    "email": "emily@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Sales Lead",
    "priority": "High",
    "status": "Resolved",
    "assigned_owner": "Ops Agent 3"
},

{
    "request_id": "REQ-1018",
    "customer_name": "Michael Hall",
    "email": "michael@example.com",
    "country": "United States",
    "timeZone": "Central",
    "category": "Billing",
    "priority": "Low",
    "status": "Waiting on Customer",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1019",
    "customer_name": "Natalie Green",
    "email": "natalie@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Appointment Follow-up",
    "priority": "High",
    "status": "New",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1020",
    "customer_name": "William Adams",
    "email": "william@example.com",
    "country": "United States",
    "timeZone": "Pacific",
    "category": "General Question",
    "priority": "Medium",
    "status": "Closed",
    "assigned_owner": "Ops Agent 3"
},

{
    "request_id": "REQ-1021",
    "customer_name": "Harper Wilson",
    "email": "harper@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Technical Issue",
    "priority": "Urgent",
    "status": "New",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1022",
    "customer_name": "Lucas Baker",
    "email": "lucas@example.com",
    "country": "United States",
    "timeZone": "Eastern",
    "category": "Sales Lead",
    "priority": "High",
    "status": "In Progress",
    "assigned_owner": "Ops Agent 2"
},

{
    "request_id": "REQ-1023",
    "customer_name": "Zoe Roberts",
    "email": "zoe@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "Billing",
    "priority": "Medium",
    "status": "Resolved",
    "assigned_owner": "Ops Agent 3"
},

{
    "request_id": "REQ-1024",
    "customer_name": "Henry Nelson",
    "email": "henry@example.com",
    "country": "United States",
    "timeZone": "Mountain",
    "category": "Appointment Follow-up",
    "priority": "Low",
    "status": "Waiting on Customer",
    "assigned_owner": "Ops Agent 1"
},

{
    "request_id": "REQ-1025",
    "customer_name": "Ella Mitchell",
    "email": "ella@example.com",
    "country": "Canada",
    "timeZone": "Atlantic",
    "category": "General Question",
    "priority": "High",
    "status": "New",
    "assigned_owner": "Ops Agent 2"
}

]

for request_data in seed_requests:
    request = Request(
        request_id=request_data["request_id"],
        customer_name=request_data["customer_name"],
        email=request_data["email"],
        country=request_data["country"],
        timeZone=request_data["timeZone"],
        category=request_data["category"],
        priority=request_data["priority"],
        status=request_data["status"],
        assigned_owner=request_data["assigned_owner"],
        due_date=datetime.utcnow().date() + timedelta(days=7),
        notes="This is a sample note for the request.",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        is_archived=False
    )
    db.add(request)
    db.commit()
    print(f"Seeded request: {request.request_id} - {request.customer_name} successfully.")