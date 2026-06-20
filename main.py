from fastapi import FastAPI
from database.db import engine
from database.db import base
from request import Request
from routes.request_routes import router as request_router
from routes.metric_routes import router as metric_router


base.metadata.create_all(bind=engine)
app = FastAPI(title = "NorthStar Ops Tracker", description = "A simple request tracking system for NorthStar Ops", version = "1.0.0")
app.include_router(request_router)
app.include_router(metric_router)
@app.get("/")
def home():
    return {"message" : "Welcome to NorthStar Ops Tracker!!!!"}
