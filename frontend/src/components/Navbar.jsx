import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        💼 JobHub
      </div>

      <div className="nav-title">
        Job Scraper Dashboard
      </div>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;
