import uuid
from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.dialects.postgresql import UUID

Base = declarative_base()

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    subscription_plan = Column(String, default="Free")
    stripe_customer_id = Column(String, nullable=True)

    users = relationship("User", back_populates="organization")

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"))
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, default="candidate")
    free_questions_used = Column(Integer, default=0)

    organization = relationship("Organization", back_populates="users")
    documents = relationship("Document", back_populates="uploader")
    interviews = relationship("Interview", back_populates="user")

class Document(Base):
    __tablename__ = "documents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    type = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    extraction_status = Column(String, default="pending")

    uploader = relationship("User", back_populates="documents")
    chunks = relationship("Chunk", back_populates="document")

class Chunk(Base):
    __tablename__ = "chunks"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"))
    content = Column(Text, nullable=False)
    # The actual vector might be stored in Vertex AI, but here's a placeholder
    # vector_embed = Column(ARRAY(Float)) 

    document = relationship("Document", back_populates="chunks")

class Interview(Base):
    __tablename__ = "interviews"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String, default="scheduled")
    avatar_preference = Column(String, default="female")
    mode = Column(String, default="panel")

    user = relationship("User", back_populates="interviews")
    evaluation = relationship("Evaluation", back_populates="interview", uselist=False)

class Evaluation(Base):
    __tablename__ = "evaluations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    interview_id = Column(UUID(as_uuid=True), ForeignKey("interviews.id"))
    overall_score = Column(Integer, nullable=True)
    criteria_scores = Column(JSON, nullable=True)
    report_gcs_url = Column(String, nullable=True)

    interview = relationship("Interview", back_populates="evaluation")
