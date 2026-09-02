from app.database import SessionLocal
from app.models import Job
from datetime import datetime, timedelta
import random


companies = [
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
    "HCLTech",
    "Tech Mahindra",
    "Capgemini",
    "Deloitte",
    "IBM",
    "Microsoft",
    "Amazon",
    "Google",
    "Oracle",
    "Adobe",
    "Flipkart",
    "Swiggy",
    "Zomato",
    "Razorpay",
    "PhonePe",
    "Paytm",
    "Meesho",
    "CRED",
    "Zoho",
    "Freshworks",
    "Walmart",
    "SAP",
    "Salesforce",
    "Cisco",
    "Nvidia"
]


jobs_data = [
    ("Python Backend Developer", "Python, FastAPI, PostgreSQL"),
    ("React Developer", "JavaScript, React, HTML, CSS"),
    ("Full Stack Developer", "React, Node.js, PostgreSQL"),
    ("Software Engineer", "Python, Java, SQL"),
    ("Data Analyst", "Python, Pandas, SQL, Excel"),
    ("Machine Learning Engineer", "Python, NumPy, Pandas, Scikit-learn"),
    ("Frontend Developer", "HTML, CSS, JavaScript, React"),
    ("Backend Developer", "Python, FastAPI, PostgreSQL"),
    ("DevOps Engineer", "Docker, Linux, AWS, Kubernetes"),
    ("Cloud Engineer", "AWS, Azure, Docker"),
    ("Data Scientist", "Python, Pandas, Machine Learning"),
    ("AI Engineer", "Python, LLM, RAG, LangChain"),
    ("Java Developer", "Java, Spring Boot, SQL"),
    ("Software Developer", "Python, JavaScript, Git"),
    ("QA Engineer", "Python, Selenium, API Testing"),
]


locations = [
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Mumbai",
    "Delhi",
    "Gurgaon",
    "Noida",
    "Chennai",
    "Kolkata",
    "Remote"
]


sources = [
    "LinkedIn",
    "Indeed",
    "Naukri",
    "Local Scraper"
]


def seed_jobs():

    db = SessionLocal()

    try:

        # Number of jobs to create
        number_of_jobs = 100

        for i in range(number_of_jobs):

            title, skills = random.choice(jobs_data)

            company = random.choice(companies)

            location = random.choice(locations)

            source = random.choice(sources)

            salary = random.choice([
                "3-6 LPA",
                "4-7 LPA",
                "5-8 LPA",
                "6-10 LPA",
                "8-12 LPA",
                "10-15 LPA",
                "12-18 LPA"
            ])

            job = Job(
                title=title,
                company=company,
                location=location,
                salary=salary,
                skills=skills,
                job_url=f"https://example.com/jobs/seed-{i}-{random.randint(1000, 9999)}",
                source=source,
                created_at=datetime.utcnow() - timedelta(
                    days=random.randint(0, 30)
                )
            )

            db.add(job)

        db.commit()

        print("Successfully inserted 100 jobs!")

    except Exception as e:

        db.rollback()

        print("Error:", e)

    finally:

        db.close()


if __name__ == "__main__":
    seed_jobs()