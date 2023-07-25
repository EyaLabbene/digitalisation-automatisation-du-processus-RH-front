import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../api";

function UserDetails() {
  const [user, setUser] = useState(null);
  const { state } = useLocation();
  const fetchData = async (id) => {
    console.log("Before API call");
    console.log(id);
    const response = await api.get(`/user/` + id);
    console.log("after API call");
    console.log(response);
    setUser(response.data);
  };
  useEffect(() => {
    fetchData(state._id);
  }, []);

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <h1>{user.Username}'s Profile</h1>
      <p>
        <strong>First Name:</strong> {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last_name}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
      <p>
        <strong>Date of birth:</strong> {user.date_of_birth}
      </p>
      <p>
        <strong>Username:</strong> {user.Username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <a>check details</a>
    </div>
  );
}

export default UserDetails;
