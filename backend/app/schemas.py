from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class JobResponse(BaseModel):
    id: int
    title: str
    company: str
    location: Optional[str] = None
    salary: Optional[str] = None
    skills: Optional[str] = None
    job_url: str
    source: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True