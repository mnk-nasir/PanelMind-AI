from fastapi import APIRouter

router = APIRouter()

@router.post("/prepare")
def prepare_interview():
    # Pre-warms model
    return {"room_token": "dummy_livekit_token", "room_id": "room_123"}

@router.post("/{interview_id}/escalate")
def escalate_interview(interview_id: str):
    return {"status": "escalated"}

@router.get("/{interview_id}/report")
def get_report(interview_id: str):
    return {"score": 85, "url": "https://gcs..."}
