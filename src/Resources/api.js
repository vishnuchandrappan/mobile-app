import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8000/api/",
  // baseURL:"https://api.hgvdrive.staging.on.logidots.com/apiapi.hgvdrive.staging.on.logidots.com/api",
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // window.location.href = "/logout";
      alert("Please Logout and login again");
    }
    return error;
  }
);

export default Axios;
