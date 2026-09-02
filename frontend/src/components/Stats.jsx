
function Stats({ stats }) {

  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>📊 Total Jobs</h3>
        <p>{stats.total_jobs}</p>
      </div>

      <div className="stat-card">
        <h3>🏢 Companies</h3>
        <p>{stats.total_companies}</p>
      </div>

      <div className="stat-card">
        <h3>📍 Locations</h3>
        <p>{stats.total_locations}</p>
      </div>

      <div className="stat-card">
        <h3>🆕 Latest Jobs</h3>
        <p>{stats.total_jobs}</p>
      </div>

    </div>
  );
}

export default Stats;

