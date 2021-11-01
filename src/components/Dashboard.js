import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContext } from "../context/UserProvider";

function Dashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const { login, logout, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      // const { data } = await axios
      //   .get(`${process.env.REACT_APP_SERVER_HOST}/profile`, {
      //     withCredentials: true,
      //   })
      //   .catch((err) => console.error(err));

      const employeeResponse = await axios
        .post("https://cs467quizcreation.wl.r.appspot.com/employee", {
          email: cookies.email,
          name: cookies.name,
        })
        .catch((err) => console.error(err));

      const cookieConfig = { path: "/", maxAge: 36000 };

      setCookie("id", employeeResponse.data.id, cookieConfig);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      {/* <p>{cookies.id}</p> */}
      <p>{cookies.name}</p>
      <p>{cookies.email}</p>
      <p>{cookies.auth}</p>
    </>
  );
}

export default Dashboard;
