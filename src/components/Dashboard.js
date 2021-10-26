import React, { useEffect } from "react";
import axios from "axios";

const getUser = async () => {
  const response = await axios
    .get(`${process.env.REACT_APP_SERVER_HOST}/profile`, {
      withCredentials: true,
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(response);
};

function Dashboard() {
  useEffect(() => {
    getUser();
  }, []);

  return <span>Dashboard</span>;
}

export default Dashboard;
