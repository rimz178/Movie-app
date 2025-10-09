export const GENRE_KEYWORDS = {
  28: ["action", "toiminta", "action movie"],
  12: ["adventure", "seikkailu"],
  16: ["animation", "animaatio", "anime", "cartoon"],
  35: ["comedy", "komedia", "hauska", "funny", "komédia"],
  80: ["crime", "rikos", "rikollinen", "mafia"],
  18: ["drama", "draama"],
  27: ["horror", "kauhu", "scary", "pelottava"],
  10749: ["romance", "romantiikka", "rakkaus", "love"],
  878: ["sci-fi", "scifi", "tiede", "avaruus", "science fiction"],
  53: ["thriller", "jännitys", "suspense"],
};

export const detectGenreFromText = (searchText) => {
  const lowerText = searchText.toLowerCase().trim();

  for (const [genreId, keywords] of Object.entries(GENRE_KEYWORDS)) {
    if (
      keywords.some(
        (keyword) => lowerText === keyword || lowerText.includes(keyword),
      )
    ) {
      return parseInt(genreId);
    }
  }

  return null;
};
