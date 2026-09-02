import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import Stats from "./components/Stats";
import JobDetails from "./components/JobDetails";
import JobAnalytics from "./components/JobAnalytics";

import "./App.css";


/* =========================
   PROTECTED ROUTE
========================= */

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


/* =========================
   DASHBOARD
========================= */

function Dashboard() {

  const [jobs, setJobs] = useState([]);

  const [totalJobs, setTotalJobs] = useState(0);

  const [stats, setStats] = useState({
    total_jobs: 0,
    total_companies: 0,
    total_locations: 0,
    source_counts: {}
  });

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("newest");

  const [page, setPage] = useState(1);

  const limit = 2;


  /* =========================
     FETCH JOBS
  ========================= */

  const fetchJobs = async (
    currentPage = 1,
    currentSearch = search,
    currentLocation = location,
    currentCompany = company,
    currentSource = source
  ) => {

    setLoading(true);
    setError("");

    try {

      const params = new URLSearchParams();

      if (currentSearch.trim()) {
        params.append(
          "search",
          currentSearch.trim()
        );
      }

      if (currentLocation.trim()) {
        params.append(
          "location",
          currentLocation.trim()
        );
      }

      if (currentCompany.trim()) {
        params.append(
          "company",
          currentCompany.trim()
        );
      }

      if (currentSource) {
        params.append(
          "source",
          currentSource
        );
      }

      params.append(
        "skip",
        (currentPage - 1) * limit
      );

      params.append(
        "limit",
        limit
      );

      const url =
        `http://127.0.0.1:8000/jobs/?${params.toString()}`;

      console.log("FETCH URL:", url);

      const token =
        localStorage.getItem("access_token");

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {

        if (response.status === 401) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          return;
        }

        throw new Error(
          "Failed to fetch jobs"
        );
      }

      const data = await response.json();

      console.log("API DATA:", data);
      console.log("JOBS:", data.jobs);

      setJobs(data.jobs || []);
      setTotalJobs(data.total || 0);

    } catch (err) {

      console.error(err);
      setError(err.message);

    } finally {

      setLoading(false);

    }
  };


  /* =========================
     FETCH STATS
  ========================= */

  const fetchStats = async () => {

    try {

      const token =
        localStorage.getItem("access_token");

      const response = await fetch(
        "http://127.0.0.1:8000/jobs/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {

        if (response.status === 401) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          return;
        }

        throw new Error(
          "Failed to fetch statistics"
        );
      }

      const data = await response.json();

      setStats(data);

    } catch (err) {

      console.error(err);

    }
  };


  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {

    fetchJobs(1);
    fetchStats();

  }, []);


  /* =========================
     SEARCH
  ========================= */

  const handleSearch = () => {

    setPage(1);

    fetchJobs(
      1,
      search,
      location,
      company,
      source
    );
  };


  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {

    setSearch("");
    setLocation("");
    setCompany("");
    setSource("");

    setPage(1);

    fetchJobs(
      1,
      "",
      "",
      "",
      ""
    );
  };


  /* =========================
     PAGINATION
  ========================= */

  const handleNext = () => {

    const totalPages = Math.ceil(
      totalJobs / limit
    );

    if (page < totalPages) {

      const nextPage = page + 1;

      setPage(nextPage);

      fetchJobs(
        nextPage,
        search,
        location,
        company,
        source
      );
    }
  };


  const handlePrevious = () => {

    if (page > 1) {

      const previousPage = page - 1;

      setPage(previousPage);

      fetchJobs(
        previousPage,
        search,
        location,
        company,
        source
      );
    }
  };


  /* =========================
     SORT
  ========================= */

  const sortedJobs = [...jobs].sort(
    (a, b) => {

      if (sortBy === "title") {

        return a.title.localeCompare(
          b.title
        );
      }

      if (sortBy === "company") {

        return a.company.localeCompare(
          b.company
        );
      }

      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      );
    }
  );


  const totalPages = Math.ceil(
    totalJobs / limit
  );


  /* =========================
     DASHBOARD UI
  ========================= */

  return (

    <div>

      <Navbar />

      <main className="container">

        {/* HERO */}

        <div className="hero">

          <h1>
            Find Your Next Job 🚀
          </h1>

          <p>
            Search jobs collected from
            multiple sources.
          </p>

        </div>


        {/* SEARCH */}

        <SearchBar
          search={search}
          setSearch={setSearch}

          location={location}
          setLocation={setLocation}

          company={company}
          setCompany={setCompany}

          source={source}
          setSource={setSource}

          onSearch={handleSearch}
          onClear={clearFilters}
        />


        {/* STATS */}

        <Stats stats={stats} />


        {/* ANALYTICS */}

        <JobAnalytics stats={stats} />


        {/* LOADING */}

        {loading && (

          <p className="status">
            Loading jobs...
          </p>

        )}


        {/* ERROR */}

        {error && (

          <p className="error">
            {error}
          </p>

        )}


        {!loading && !error && (

          <section>

            {/* RESULTS HEADER */}

            <div className="results-header">

              <h2>
                Available Jobs
              </h2>

              <span>
                {totalJobs} Jobs Found
              </span>

            </div>


            {/* SORT */}

            <div className="sort-container">

              <label htmlFor="sort">
                Sort by:
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
              >

                <option value="newest">
                  Newest
                </option>

                <option value="title">
                  Job Title
                </option>

                <option value="company">
                  Company
                </option>

              </select>

            </div>


            {/* JOBS */}

            {jobs.length === 0 ? (

              <div className="no-jobs">

                <h3>
                  No jobs found
                </h3>

                <p>
                  Try changing your
                  search or filters.
                </p>

              </div>

            ) : (

              <>

                <div className="job-grid">

                  {sortedJobs.map(
                    (job) => (

                      <JobCard
                        key={job.id}
                        job={job}
                      />

                    )
                  )}

                </div>


                {/* PAGINATION */}

                <div className="pagination">

                  <button
                    disabled={page === 1}
                    onClick={
                      handlePrevious
                    }
                  >
                    ← Previous
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={
                      page >= totalPages
                    }
                    onClick={handleNext}
                  >
                    Next →
                  </button>

                </div>

              </>

            )}

          </section>

        )}

      </main>

    </div>

  );
}


/* =========================
   APP ROUTER
========================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* PROTECTED DASHBOARD */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* PROTECTED JOB DETAILS */}

        <Route
          path="/jobs/:jobId"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;

