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
//movieCredits endpoints
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;

// Person details endpoints
const personDetailsEndpoints = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;

const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

//image endpoints
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
  //check errors when get api from internet
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};
//returns upcoming movies from the website
export const fetchUpcoming = () => {
  return apiCall(upcoming);
};
//returns trending movies from the website
export const fetchTrending = () => {
  return apiCall(trendingMovie);
};
//returns rated movies from the website
export const fetchRated = () => {
  return apiCall(topRated);
};
//returns details movies from the website
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
//search movies
export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
//returns credits movies from the website
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
//returns person details movies from the website
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoints(id));
};
export const fetchPersonMovies = (personId) => {
  return apiCall(personMoviesEndpoint(personId));
};
// fallback endpoints
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";

export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";
