from fastapi import APIRouter, UploadFile, File
import uuid

router = APIRouter()

@router.post("/upload")
def upload_knowledge_file(file: UploadFile = File(...)):
    # Trigger celery task / extraction
    return {"job_id": str(uuid.uuid4()), "status": "processing"}

@router.get("/status/{job_id}")
def check_status(job_id: str):
    return {"job_id": job_id, "status": "completed", "progress": 100}
