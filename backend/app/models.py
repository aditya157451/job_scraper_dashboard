from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class Job(Base):

    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    company = Column(String, nullable=False)

    location = Column(String)

    salary = Column(String)

    skills = Column(String)

    job_url = Column(String, unique=True, nullable=False)

    source = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)
    
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    password = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )