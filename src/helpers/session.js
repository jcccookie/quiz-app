import axios from "axios";
import Cookies from "js-cookie";

export const checkSession = async () => {
  const response = await axios
    .get(`${process.env.REACT_APP_SERVER_HOST}/session`, {
      params: {
        sessionId: Cookies.get("session"),
        email: Cookies.get("email"),
      },
    })
    .catch((err) => console.log(err));

  if (response?.status !== 200) {
    throw new Error("Session is expired. Please login again");
  }
};
