from app.database import engine
from sqlalchemy import inspect

print("Database:", engine.url.database)

inspector = inspect(engine)

print("Tables:", inspector.get_table_names())