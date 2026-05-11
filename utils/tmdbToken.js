import Constants from "expo-constants";

export const getTmdbBearerToken = () => {
  const rawToken =
    Constants.extra?.TMDB_BEARER_TOKEN ||
    Constants.expoConfig?.extra?.TMDB_BEARER_TOKEN ||
    Constants.manifest?.extra?.TMDB_BEARER_TOKEN ||
    "";

  return rawToken.trim().replace(/^"|"$/g, "");
};
