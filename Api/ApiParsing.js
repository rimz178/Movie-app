import axios from "axios";
const apiBaseUrl = "https://api.themoviedb.org/3";
import Constants from "expo-constants";
import { logger } from "../utils/logger";

const apiKey =
  Constants.extra?.TMDB_API_KEY ||
  Constants.expoConfig?.extra?.TMDB_API_KEY ||
  Constants.manifest?.extra?.TMDB_API_KEY;

// Luo axios-instanssi Bearer-tokenilla
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

// Endpointeista pois api_key-parametri
const upcoming = "/movie/upcoming?language=en-US&region=FI";
const trendingMovie = "/trending/movie/day?language=en-US&region=FI";
const topRated = "/movie/top_rated?language=en-US&region=FI";
const nowPlaying = "/movie/now_playing?language=en-US&region=FI";
const trendingSeries = "/trending/tv/day?language=en-US&region=FI";
const topRatedSeries = "/tv/top_rated?language=en-US&region=FI";
const airingTodaySeries = "/tv/on_the_air?language=en-US&region=FI";
const searchMoviesEndpoint = "/search/movie";
const searchSeriesEndpoint = "/search/tv";
const searchPeopleEndpoint = "/search/person";
const popularSeriesEndpoint = "/tv/popular?language=en-US&region=FI";

const movieDetailsEndpoint = (id) => `/movie/${id}`;
const movieCreditsEndpoint = (id) => `/movie/${id}/credits`;
const personDetailsEndpoints = (id) => `/person/${id}`;
const personMoviesEndpoint = (id) => `/person/${id}/movie_credits`;
const personSeriesEndpoint = (id) => `/person/${id}/tv_credits`;
const watchProvidersEndpoint = (id) => `/movie/${id}/watch/providers`;
const seriesDetailsEndpoint = (id) => `/tv/${id}`;
const seriesCreditsEndpoint = (id) => `/tv/${id}/credits`;
const seriesWatchProvidersEndpoint = (id) => `/tv/${id}/watch/providers`;

const requestTokenEndpoint = "/authentication/token/new";
const validateLoginEndpoint = "/authentication/token/validate_with_login";
const createSessionEndpoint = "/authentication/session/new";

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

  try {
    const response = await axiosInstance.request(options);
    return response.data;
  } catch (error) {
    logger.log("error", error);
    return {};
  }
};

export const fetchRequestToken = async () => {
  try {
    const response = await axiosInstance.get(requestTokenEndpoint);
    return response.data;
  } catch (error) {
    logger.error("Error fetching request token:", error);
    return {};
  }
};

export const validateWithLogin = async (username, password, requestToken) => {
  try {
    const response = await axiosInstance.post(validateLoginEndpoint, {
      username,
      password,
      request_token: requestToken,
    });
    return response.data;
  } catch (error) {
    logger.error("Error validating login:", error);
    return {};
  }
};

export const createSession = async (requestToken) => {
  try {
    const response = await axiosInstance.post(createSessionEndpoint, {
      request_token: requestToken,
    });
    return response.data;
  } catch (error) {
    logger.error("Error creating session:", error);
    return {};
  }
};

export const fetchUpcoming = () => apiCall(upcoming);
export const fetchTrending = () => apiCall(trendingMovie);
export const fetchRated = () => apiCall(topRated);
export const fetchNowPlaying = () => apiCall(nowPlaying);
export const fetchMovieDetails = (id) => apiCall(movieDetailsEndpoint(id));
export const searchMovies = (params) => apiCall(searchMoviesEndpoint, params);
export const searchSeries = (params) => apiCall(searchSeriesEndpoint, params);
export const searchPeople = (params) => apiCall(searchPeopleEndpoint, params);
export const fetchMovieCredits = (id) => apiCall(movieCreditsEndpoint(id));
export const fetchPersonDetails = (id) => apiCall(personDetailsEndpoints(id));
export const fetchPersonMovies = (personId) =>
  apiCall(personMoviesEndpoint(personId));
export const fetchPersonSeries = (personId) =>
  apiCall(personSeriesEndpoint(personId));
export const fetchWatchProviders = (id) => apiCall(watchProvidersEndpoint(id));
export const fetchTrendingSeries = () => apiCall(trendingSeries);
export const fetchTopRatedSeries = () => apiCall(topRatedSeries);
export const fetchSeriesDetails = (id) => apiCall(seriesDetailsEndpoint(id));
export const fetchSeriesCredits = (id) => apiCall(seriesCreditsEndpoint(id));
export const fetchSeriesWatchProviders = (id) =>
  apiCall(seriesWatchProvidersEndpoint(id));
export const fetchPopularSeries = () => apiCall(popularSeriesEndpoint);
export const fetchAiringTodaySeries = () => apiCall(airingTodaySeries);

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";
export const fallbackProviderLogo =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
