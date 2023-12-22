import config from "react-native-config";
import axios from "axios";
import { apiKey } from "../constant/apiKey";

const apiBaseUrl = "https://api.themoviedb.org/3/";
const upcoming = `${apiBaseUrl}movie/upcoming?api_key=${apiKey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};
export const fetchUpcoming = () => {
  return apiCall(upcoming);
};
