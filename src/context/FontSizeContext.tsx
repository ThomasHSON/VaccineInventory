import React, { createContext, useContext, useState, useCallback } from 'react';

export type FontSizeLevel = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSizeLevel;
  setFontSize: (size: FontSizeLevel) => void;
  getScaleFactor: () => number;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

const SCALE_FACTORS: Record<FontSizeLevel, number> = {
  small: 1,
  medium: 1.2,
  large: 1.5,
};

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontsizeState] = useState<FontSizeLevel>('small');

  const setFontSize = useCallback((size: FontSizeLevel) => {
    setFontsizeState(size);
    localStorage.setItem('fontSize', size);
  }, []);

  const getScaleFactor = useCallback(() => SCALE_FACTORS[fontSize], [fontSize]);

  const value: FontSizeContextType = {
    fontSize,
    setFontSize,
    getScaleFactor,
  };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within FontSizeProvider');
  }
  return context;
};

export const fontSizeClasses = {
  small: {
    xs: 'text-base',
    sm: 'text-lg',
    base: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
  },
  medium: {
    xs: 'text-lg',
    sm: 'text-xl',
    base: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
  },
  large: {
    xs: 'text-xl',
    sm: 'text-2xl',
    base: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
    '2xl': 'text-6xl',
  },
};
