from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import SessionLocal
from app.models import Job
from app.routers.auth import get_current_user


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# =========================
# GET JOBS
# =========================

@router.get("/")
def get_jobs(
    search: Optional[str] = None,
    location: Optional[str] = None,
    company: Optional[str] = None,
    source: Optional[str] = None,
    skip: int = 0,
    limit: int = 5,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    query = db.query(Job)

    if search:
        query = query.filter(
            Job.title.ilike(f"%{search}%")
        )

    if location:
        query = query.filter(
            Job.location.ilike(f"%{location}%")
        )

    if company:
        query = query.filter(
            Job.company.ilike(f"%{company}%")
        )

    if source:
        query = query.filter(
            Job.source.ilike(f"%{source}%")
        )

    total = query.count()

    jobs = (
        query
        .order_by(Job.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return {
        "total": total,
        "jobs": jobs
    }


# =========================
# JOB STATISTICS
# =========================

@router.get("/stats")
def get_job_stats(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    total_jobs = db.query(Job).count()

    total_companies = (
        db.query(Job.company)
        .distinct()
        .count()
    )

    total_locations = (
        db.query(Job.location)
        .filter(Job.location.isnot(None))
        .distinct()
        .count()
    )

    source_counts = {}

    sources = (
        db.query(Job.source)
        .filter(Job.source.isnot(None))
        .all()
    )

    for source in sources:

        source_name = source[0]

        if source_name in source_counts:
            source_counts[source_name] += 1
        else:
            source_counts[source_name] = 1

    return {
        "total_jobs": total_jobs,
        "total_companies": total_companies,
        "total_locations": total_locations,
        "source_counts": source_counts
    }
@router.get("/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job

