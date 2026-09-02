
function JobAnalytics({ stats }) {

  const sourceCounts = stats.source_counts || {};

  const sources = Object.entries(sourceCounts);

  const totalJobs = stats.total_jobs || 0;

  return (
    <div className="analytics-card">

      <h2>📊 Jobs by Source</h2>

      {sources.length === 0 ? (

        <p>No source data available.</p>

      ) : (

        <div className="source-list">

          {sources.map(([source, count]) => {

            const percentage =
              totalJobs > 0
                ? (count / totalJobs) * 100
                : 0;

            return (

              <div
                className="source-row"
                key={source}
              >

                <div className="source-info">

                  <span>
                    {source}
                  </span>

                  <strong>
                    {count}
                  </strong>

                </div>


                <div className="progress-bar">

                  <div
                    className="progress"
                    style={{
                      width: `${percentage}%`
                    }}
                  ></div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default JobAnalytics;

