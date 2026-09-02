from app.database import engine, Base
from app.models import Job

print("Database URL:", engine.url)
print("Registered tables:", Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")