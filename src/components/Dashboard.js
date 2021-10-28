import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

const getUser = async () => {
  const { data } = await axios
    .get(`${process.env.REACT_APP_SERVER_HOST}/profile`, {
      withCredentials: true,
    })
    .catch((err) => console.error(err));

  const { id } = await axios
    .post("https://cs467quizcreation.wl.r.appspot.com/employee", {
      email: data.email,
      name: data.displayName,
    })
    .catch((err) => console.error(err));

  console.log(id);

  // return {
  //   id,
  //   name: data.displayName,
  //   email: data.email,
  // };
};

function Dashboard() {
  useEffect(() => {
    getUser();
    // console.log(id, name, email);
  }, []);

  const { login } = useContext(UserContext);

  return <span>Dashboard</span>;
}

export default Dashboard;
