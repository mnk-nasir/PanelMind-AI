from fastapi import APIRouter
from app.api.auth import router as auth_router
from app.api.knowledge import router as knowledge_router
from app.api.interview import router as interview_router

router = APIRouter()

@router.get("/health")
def api_health():
    return {"status": "ok", "layer": "api"}

router.include_router(auth_router, prefix="/auth", tags=["Auth"])
router.include_router(knowledge_router, prefix="/knowledge", tags=["Knowledge Base"])
router.include_router(interview_router, prefix="/interview", tags=["Interviews"])
