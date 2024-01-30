import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import useFetchData from "../../customHooks/useFetchData";

// import icons
import { logo } from "../../icons";

const API = "http://localhost:8001/galleria";

function Navbar({ setFilteredData }) {
  const location = useLocation();
  const { data: galleriaData } = useFetchData(API);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (galleriaData) {
      const filtered = galleriaData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [galleriaData, searchTerm]);

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div>
          <Link to="/dashboard">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </div>

        <div className="user-interface">
          {location.pathname === "/dashboard" && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}

          {location.pathname === "/profile" ? (
            <Link to="/dashboard">
              <h4 className="logo-title">Go back</h4>
            </Link>
          ) : (
            <Link to="/profile">
              <h4 className="logo-title">Profile</h4>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
