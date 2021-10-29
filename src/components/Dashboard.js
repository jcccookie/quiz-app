import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

const getUser = async (login) => {
  const { data } = await axios
    .get(`${process.env.REACT_APP_SERVER_HOST}/profile`, {
      withCredentials: true,
    })
    .catch((err) => console.error(err));

  const employeeResponse = await axios
    .post("https://cs467quizcreation.wl.r.appspot.com/employee", {
      email: data.email,
      name: data.displayName,
    })
    .catch((err) => console.error(err));

  login({
    id: employeeResponse.data.id,
    name: data.displayName,
    email: data.email,
    authId: data.id,
  });
};

function Dashboard() {
  const { login, user } = useContext(UserContext);

  useEffect(() => {
    getUser(login);
  }, []);

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
