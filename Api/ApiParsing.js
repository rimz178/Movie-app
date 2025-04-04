import axios from "axios";
import { TMDB_API_KEY } from "@env";
const apiBaseUrl = "https://api.themoviedb.org/3";

const apiKey = TMDB_API_KEY;

//upcoming endpoints
const upcoming = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}&region=FI`;
//trendinMovie endpoints
const trendingMovie = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}&region=FI`;
//toprated endpoints
const topRated = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&region=FI`;
//nowplaying endpoints
const nowPlaying = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&locale=FI`;

const trendingSeries = `${apiBaseUrl}/trending/tv/day?api_key=${apiKey}&region=FI`;

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
// Person movie endpoints
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

const watchProvidersEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/watch/providers?api_key=${apiKey}`;

const seriesDetailsEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}?api_key=${apiKey}`;
const seriesCreditsEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}/credits?api_key=${apiKey}`;
const seriesWatchProvidersEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}/watch/providers?api_key=${apiKey}`;

// Authentication endpoints
const requestTokenEndpoint = `${apiBaseUrl}/authentication/token/new?api_key=${apiKey}`;
const validateLoginEndpoint = `${apiBaseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`;
const createSessionEndpoint = `${apiBaseUrl}/authentication/session/new?api_key=${apiKey}`;

//image endpoints
export const image500 = (posterPath) =>
  posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
export const image342 = (posterPath) =>
  posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : null;
export const image185 = (posterPath) =>
  posterPath ? `https://image.tmdb.org/t/p/w185${posterPath}` : null;

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

// Authentication API calls
export const fetchRequestToken = async () => {
  try {
    const response = await axios.get(requestTokenEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching request token:", error);
    return {};
  }
};

export const validateWithLogin = async (username, password, requestToken) => {
  try {
    const response = await axios.post(validateLoginEndpoint, {
      username,
      password,
      request_token: requestToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error validating login:", error);
    return {};
  }
};

export const createSession = async (requestToken) => {
  try {
    const response = await axios.post(createSessionEndpoint, {
      request_token: requestToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
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
//returns now playing movies from the website
export const fetchNowPlaying = () => {
  return apiCall(nowPlaying);
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
//returns person movies from the website
export const fetchPersonMovies = (personId) => {
  return apiCall(personMoviesEndpoint(personId));
};

export const fetchWatchProviders = (id) => {
  return apiCall(watchProvidersEndpoint(id));
};

export const fetchTrendingSeries = () => {
  return apiCall(trendingSeries);
};

export const fetchSeriesDetails = async (id) => {
  return apiCall(seriesDetailsEndpoint(id));
};

export const fetchSeriesCredits = async (id) => {
  return apiCall(seriesCreditsEndpoint(id));
};

export const fetchSeriesWatchProviders = async (id) => {
  return apiCall(seriesWatchProvidersEndpoint(id));
};

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";

export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";
export const fallbackProviderLogo =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
