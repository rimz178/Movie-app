import config from "react-native-config";
import axios from "axios";
import { apiKey } from "../constant/apiKey";

const apiBaseUrl = "https://api.themoviedb.org/3/";
const upcoming = `${apiBaseUrl}movie/upcoming?api_key=${apiKey}`;
const trendingMovie = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const topRated = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

//Search endpoint
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

//moviedetails endpoints
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;

export const image500 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
export const image342 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
export const image185 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;

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
export const fetchTrending = () => {
  return apiCall(trendingMovie);
};
export const fetchRated = () => {
  return apiCall(topRated);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
