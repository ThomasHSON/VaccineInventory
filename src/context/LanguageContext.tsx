import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, Translations } from '../types';
import zhTW from '../i18n/zh-TW.json';
import en from '../i18n/en.json';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  switchLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  'zh-TW': zhTW as Translations,
  'en': en as Translations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh-TW');

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  const value: LanguageContextType = {
    language,
    translations: translations[language],
    switchLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
