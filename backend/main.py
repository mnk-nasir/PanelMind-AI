import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="PanelMind AI Backend",
    description="API for the PanelMind AI Interview Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "PanelMind AI Backend is running."}

@app.get("/health")
def health_check():
    # To be expanded with DB/Redis health checks
    return {"status": "healthy"}

from app.api.router import router as api_router
from app.api.websockets import ws_router as websocket_router

app.include_router(api_router, prefix="/api/v1")
app.include_router(websocket_router)

