import axios from "axios";

// export default axios.create({
//   baseURL: 'https://api.shrtco.de/v2/',
// });

const apiClient = axios.create({
  baseURL: "http://localhost:7777",
  timeout: 1000,
});

export const setUrl = async (data) => {
  try {
    const res= await apiClient.post("/setUrl", data);
    return res.data;
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getUrl = async (data) => {
  try {
    const res= await apiClient.post("/getUrl", data);
    return res.data;
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
