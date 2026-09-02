import { Link } from "react-router-dom";

function JobCard({ job }) {
  const skills = job.skills
    ? job.skills.split(",").map((skill) => skill.trim())
    : [];

  return (
    <div className="job-card">

      <div className="job-header">
        <h2>{job.title}</h2>

        <span className="source-badge">
          {job.source || "Unknown"}
        </span>
      </div>

      <p className="company">
        🏢 {job.company}
      </p>

      <p className="job-location">
        📍 {job.location || "Location not specified"}
      </p>

      <p className="salary">
        💰 {job.salary || "Salary not specified"}
      </p>

      <div className="skills">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              className="skill-badge"
              key={index}
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="skill-badge">
            Skills not specified
          </span>
        )}
      </div>

      <div className="job-footer">

        <span className="job-source">
          {job.source || "Job Source"}
        </span>

        <div className="job-actions">

          <Link
            to={`/jobs/${job.id}`}
            className="details-button"
          >
            View Details
          </Link>

          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="apply-button"
          >
            Apply Now →
          </a>

        </div>

      </div>

    </div>
  );
}

export default JobCard;