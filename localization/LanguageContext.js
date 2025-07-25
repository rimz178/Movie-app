import React, { createContext, useContext, useState } from "react";
import fi from "./fi.json";
import en from "./en.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("fi");
  const strings = language === "fi" ? fi : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, strings }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
