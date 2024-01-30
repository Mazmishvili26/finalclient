import React, { useContext, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContextProvider, UserContext } from "./context/userContext";

// import pages
import { Dashboard, Login, Register, GalleriaDetail, Profile } from "./pages";
// import components
import { Navbar } from "./components";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function PrivateRoute({ element }) {
  //
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return element;
}

function App() {
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);

  return (
    <UserContextProvider>
      <div className="main-container">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <Navbar setFilteredData={setFilteredData} />
          )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={<Dashboard filteredData={filteredData} />}
              />
            }
          />
          <Route
            path="/dashboard/:galeriaId"
            element={<PrivateRoute element={<GalleriaDetail />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
