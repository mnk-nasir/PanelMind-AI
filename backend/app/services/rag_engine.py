import os
import fitz  # PyMuPDF
from uuid import UUID

from langchain_text_splitters import RecursiveCharacterTextSplitter

# We define a stub for storing vector data locally if Vertex isn't connected yet.
# In a real setup, we'd use Vertex Search.
MOCK_VECTOR_STORE = {}

def extract_text_from_pdf(file_path: str) -> str:
    """Extract full text from a PDF file using PyMuPDF."""
    text = ""
    try:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text()
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

def chunk_document_text(text: str) -> list[str]:
    """Splits a large document text into semantic overlapping chunks."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False,
    )
    return splitter.split_text(text)

def embed_and_store_chunks(document_id: UUID, chunks: list[str]):
    """
    Submits chunks to Vertex AI Embeddings and stores the resulting vectors.
    """
    # In a full flow, you would call vertex_ai.generate_embeddings(chunk)
    # For now, we stub the storage
    mock_embeddings = []
    for i, chunk in enumerate(chunks):
        mock_embedding = [0.1, 0.2, 0.3] # Placeholder vector
        mock_embeddings.append({
            "chunk_id": f"{document_id}_{i}",
            "text": chunk,
            "vector": mock_embedding
        })
    
    MOCK_VECTOR_STORE[str(document_id)] = mock_embeddings
    return len(mock_embeddings)

def process_knowledge_document(document_id: UUID, file_path: str):
    """
    Main orchestration step for the RAG pipeline background worker.
    """
    # 1. Extract
    full_text = extract_text_from_pdf(file_path)
    
    # 2. Chunk
    chunks = chunk_document_text(full_text)
    
    # 3. Embed & Store
    total_stored = embed_and_store_chunks(document_id, chunks)
    
    return {"status": "success", "chunks_processed": total_stored}
