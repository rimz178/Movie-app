export const DISCOVERY_GENRES = [
  { movieId: 28, tvId: 10759, key: "Action" },
  { movieId: 12, tvId: 10759, key: "Adventure" },
  { movieId: 16, tvId: 16, key: "Animation" },
  { movieId: 35, tvId: 35, key: "Comedy" },
  { movieId: 80, tvId: 80, key: "Crime" },
  { movieId: 18, tvId: 18, key: "Drama" },
  { movieId: 27, tvId: 9648, key: "Horror" },
  { movieId: 10749, tvId: 18, key: "Romance" },
  { movieId: 878, tvId: 10765, key: "SciFi" },
  { movieId: 53, tvId: 9648, key: "Thriller" },
  { movieId: 99, tvId: 99, key: "Documentary" },
  { movieId: 14, tvId: 10765, key: "Fantasy" },
];

export const getDiscoveryGenreConfig = (genreId) =>
  DISCOVERY_GENRES.find(
    (genre) => genre.movieId === genreId || genre.tvId === genreId,
  );
