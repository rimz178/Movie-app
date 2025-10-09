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
      keywords.some((keyword) => {
        if (lowerText === keyword) return true;
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const isSingleWord = !/\s/.test(keyword);
        const regex = isSingleWord
          ? new RegExp(`\\b${escapedKeyword}\\b`, "i")
          : new RegExp(`${escapedKeyword}`, "i");
        return regex.test(lowerText);
      })
    ) {
      return parseInt(genreId, 10);
    }
  }

  return null;
};
