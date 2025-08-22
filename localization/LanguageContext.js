import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fi from "./fi.json";
import en from "./en.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("fi");
  const [loading, setLoading] = useState(true);
  const strings = language === "fi" ? fi : en;

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem("app_language");
      if (storedLang && (storedLang === "fi" || storedLang === "en")) {
        setLanguage(storedLang);
      }
      setLoading(false);
    };
    loadLanguage();
  }, []);

  if (loading) return null;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, strings }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
