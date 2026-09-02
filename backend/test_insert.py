from app.database import SessionLocal
from app.models import Job

db = SessionLocal()

job = Job(
    title="Python Backend Developer",
    company="Test Company",
    location="Bangalore",
    salary="6 LPA",
    skills="Python, FastAPI, PostgreSQL",
    job_url="https://example.com/job",
    source="Test"
)

db.add(job)
db.commit()
db.refresh(job)

print("Job inserted successfully!")
print("Job ID:", job.id)

db.close()