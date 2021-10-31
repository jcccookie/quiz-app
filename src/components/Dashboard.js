import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

function Dashboard() {
  const { login, logout, user, loading, setLoading, setError, error } =
    useContext(UserContext);

  const getUser = async () => {
    try {
      logout();
      setError(null);
      setLoading(true);

      const { data } = await axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/profile`, {
          withCredentials: true,
        })
        .catch((err) => console.error(err));

      const employeeResponse = await axios
        .post("https://cs467quizcreation.wl.r.appspot.com/employee", {
          email: data._json.email,
          name: data.displayName,
        })
        .catch((err) => console.error(err));

      login({
        id: employeeResponse.data.id,
        name: data.displayName,
        email: data._json.email,
        authId: data.id,
      });
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser(login);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!user.auth) return <div>User is invalid</div>;

  return (
    <>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.auth}</p>
    </>
  );
}

export default Dashboard;
