from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    return {"token": "dummy_jwt_token", "user_id": "123"}

@router.post("/register")
def register(data: LoginRequest):
    return {"token": "dummy_jwt_token", "user_id": "123"}
