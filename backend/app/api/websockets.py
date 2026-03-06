from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json
import asyncio

from app.services.vertex_ai import generate_interview_questions

# We define a separate router for WebSockets
ws_router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, room_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[room_id] = websocket

    def disconnect(self, room_id: str):
        if room_id in self.active_connections:
            del self.active_connections[room_id]

    async def send_personal_message(self, message: str, room_id: str):
        if room_id in self.active_connections:
            await self.active_connections[room_id].send_text(message)

manager = ConnectionManager()

@ws_router.websocket("/ws/interview/{room_id}")
async def interview_orchestrator(websocket: WebSocket, room_id: str):
    """
    This endpoint acts as the central brain during the LiveKit session.
    When Deepgram STT transcripts arrive, or standard frontend texts arrive,
    we route them here, run our Agents, and push responses back to elevenlabs/HeyGen.
    """
    await manager.connect(room_id, websocket)
    try:
        # 1. Warm up the connection with initial context
        welcome_msg = json.dumps({
            "type": "system", 
            "content": "Connected to PanelMind Intelligence Engine. Beginning analysis buffer..."
        })
        await manager.send_personal_message(welcome_msg, room_id)
        
        while True:
            # 2. Wait for incoming user transcript frames
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            if payload.get("type") == "transcript":
                user_text = payload.get("content", "")
                
                # 3. Stream back thinking state
                thinking_msg = json.dumps({"type": "state", "status": "processing"})
                await manager.send_personal_message(thinking_msg, room_id)
                
                # 4. Invoke LLM logic (mocked response logic here for low-latency)
                # In actual implementation, we yield streaming chunks here
                await asyncio.sleep(1) # Simulating LLM turn-around time
                
                # Standard response fallback
                ai_text = f"You mentioned: '{user_text}'. Could you elaborate further on how that applies to scaling?"
                
                # 5. Broadcast back for TTS and logging
                response_msg = json.dumps({"type": "ai_response", "content": ai_text})
                await manager.send_personal_message(response_msg, room_id)
                
    except WebSocketDisconnect:
        manager.disconnect(room_id)
