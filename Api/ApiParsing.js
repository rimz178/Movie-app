import axios from "axios";
import { TMDB_API_KEY } from "@env";
const apiBaseUrl = "https://api.themoviedb.org/3";

const apiKey = TMDB_API_KEY;

const upcoming = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}&region=FI`;

const trendingMovie = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}&region=FI`;

const topRated = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&region=FI`;

const nowPlaying = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&locale=FI`;

const trendingSeries = `${apiBaseUrl}/trending/tv/day?api_key=${apiKey}`;

const topRatedSeries = `${apiBaseUrl}/tv/top_rated?api_key=${apiKey}`;

const airingTodaySeries = `${apiBaseUrl}/tv/on_the_air?api_key=${apiKey}&locale=FI`;

const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const searchSeriesEndpoint = `${apiBaseUrl}/search/tv?api_key=${apiKey}`;

const searchPeopleEndpoint = `${apiBaseUrl}/search/person?api_key=${apiKey}`;

const popularSeriesEndpoint = `${apiBaseUrl}/tv/popular?api_key=${apiKey}`;

const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;

const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;

const personDetailsEndpoints = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;

const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

const personSeriesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/tv_credits?api_key=${apiKey}`;

const watchProvidersEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/watch/providers?api_key=${apiKey}`;

const seriesDetailsEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}?api_key=${apiKey}`;

const seriesCreditsEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}/credits?api_key=${apiKey}`;

const seriesWatchProvidersEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}/watch/providers?api_key=${apiKey}`;

const requestTokenEndpoint = `${apiBaseUrl}/authentication/token/new?api_key=${apiKey}`;
const validateLoginEndpoint = `${apiBaseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`;
const createSessionEndpoint = `${apiBaseUrl}/authentication/session/new?api_key=${apiKey}`;

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
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

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

export const fetchUpcoming = () => {
  return apiCall(upcoming);
};

export const fetchTrending = () => {
  return apiCall(trendingMovie);
};

export const fetchRated = () => {
  return apiCall(topRated);
};

export const fetchNowPlaying = () => {
  return apiCall(nowPlaying);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};

export const searchSeries = (params) => {
  return apiCall(searchSeriesEndpoint, params);
};

export const searchPeople = (params) => {
  return apiCall(searchPeopleEndpoint, params);
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoints(id));
};

export const fetchPersonMovies = (personId) => {
  return apiCall(personMoviesEndpoint(personId));
};
export const fetchPersonSeries = (personId) => {
  return apiCall(personSeriesEndpoint(personId));
};
export const fetchWatchProviders = (id) => {
  return apiCall(watchProvidersEndpoint(id));
};

export const fetchTrendingSeries = () => {
  return apiCall(trendingSeries);
};

export const fetchTopRatedSeries = () => {
  return apiCall(topRatedSeries);
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
export const fetchPopularSeries = () => {
  return apiCall(popularSeriesEndpoint);
};
export const fetchAiringTodaySeries = () => {
  return apiCall(airingTodaySeries);
};
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";

export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";
export const fallbackProviderLogo =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
