import React, { useContext } from "react";
import "./Profile.css";
import { UserContext } from "../../context/userContext";

function Profile() {
  const { user, setUser } = useContext(UserContext);

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <div className="profile-container">
      <h1>My profile</h1>
      <div>
        <span>Email</span>
        <div className="user-profile">
          <p>{user.email}</p>
        </div>
      </div>

      <div>
        <span>Username</span>
        <div className="user-profile">
          <p>{user.name}</p>
        </div>
      </div>

      <div>
        <button className="logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
