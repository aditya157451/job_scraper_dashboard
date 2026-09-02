import requests

from bs4 import BeautifulSoup

from app.database import SessionLocal
from app.models import Job


def scrape_jobs():

    url = "http://127.0.0.1:9000/"

    response = requests.get(
        url,
        timeout=10
    )

    print("Status:", response.status_code)

    response.raise_for_status()

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    jobs = soup.select("div.job")

    job_data = []


    for job in jobs:

        title = job.select_one(
            ".job-title"
        ).get_text(strip=True)

        company = job.select_one(
            ".company"
        ).get_text(strip=True)

        location = job.select_one(
            ".location"
        ).get_text(strip=True)

        salary = job.select_one(
            ".salary"
        ).get_text(strip=True)

        skills = job.select_one(
            ".skills"
        ).get_text(strip=True)

        job_url = job.select_one(
            ".job-link"
        )["href"]


        job_data.append({

            "title": title,

            "company": company,

            "location": location,

            "salary": salary,

            "skills": skills,

            "job_url": job_url

        })


    return job_data



def save_jobs_to_db(jobs):

    db = SessionLocal()

    new_jobs = 0
    duplicate_jobs = 0

    try:

        for job_data in jobs:

            # Check for duplicate URL
            existing_job = db.query(Job).filter(
                Job.job_url == job_data["job_url"]
            ).first()


            if existing_job:

                print(
                    f"Skipping duplicate: "
                    f"{job_data['title']} "
                    f"-> {job_data['job_url']}"
                )

                duplicate_jobs += 1

                continue


            # Save new job
            job = Job(

                title=job_data["title"],

                company=job_data["company"],

                location=job_data["location"],

                salary=job_data["salary"],

                skills=job_data["skills"],

                job_url=job_data["job_url"],

                source="Local Scraper"

            )

            db.add(job)

            new_jobs += 1


        db.commit()


        print()
        print("Scraping completed!")
        print(f"New jobs saved: {new_jobs}")
        print(f"Duplicate jobs skipped: {duplicate_jobs}")


    except Exception as e:

        db.rollback()

        print("Database error:", e)


    finally:

        db.close()



if __name__ == "__main__":

    jobs = scrape_jobs()

    print(f"Found {len(jobs)} jobs")

    save_jobs_to_db(jobs)

