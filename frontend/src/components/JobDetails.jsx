import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";


function JobDetails() {

  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchJob = async () => {

      try {

        const token =
          localStorage.getItem("access_token");

        // No token
        if (!token) {
          navigate("/login");
          return;
        }


        const response = await fetch(
          `http://127.0.0.1:8000/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        // Token invalid or expired
        if (response.status === 401) {

          localStorage.removeItem("access_token");

          navigate("/login");

          return;
        }


        if (!response.ok) {
          throw new Error("Job not found");
        }


        const data = await response.json();

        setJob(data);

      } catch (err) {

        console.error(err);

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };


    fetchJob();

  }, [jobId, navigate]);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <p className="status">
        Loading job...
      </p>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <p className="error">
        {error}
      </p>
    );

  }


  // =========================
  // JOB DETAILS
  // =========================

  return (

    <main className="details-container">

      <Link
        to="/"
        className="back-button"
      >
        ← Back to Jobs
      </Link>


      <div className="details-card">

        <div className="details-header">

          <div>

            <h1>
              {job.title}
            </h1>

            <h3>
              🏢 {job.company}
            </h3>

          </div>


          <span className="source-badge">
            {job.source || "Unknown"}
          </span>

        </div>


        <div className="details-info">

          <p>
            <strong>📍 Location</strong>
            <br />
            {job.location || "Not specified"}
          </p>


          <p>
            <strong>💰 Salary</strong>
            <br />
            {job.salary || "Not specified"}
          </p>


          <p>
            <strong>🛠️ Skills</strong>
            <br />
            {job.skills || "Not specified"}
          </p>

        </div>


        <div className="details-description">

          <h2>
            Job Information
          </h2>

          <p>
            This job was collected by JobHub from{" "}
            {job.source || "an external source"}.
          </p>

          <p>
            Review the job requirements and
            apply through the original job posting.
          </p>

        </div>


        <a
          href={job.job_url}
          target="_blank"
          rel="noopener noreferrer"
          className="apply-button details-apply"
        >
          Apply for this Job →
        </a>

      </div>

    </main>

  );

}


export default JobDetails;

