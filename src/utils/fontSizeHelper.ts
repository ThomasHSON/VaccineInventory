import { FontSizeLevel, fontSizeClasses } from '../context/FontSizeContext';

export const getFontSizeClass = (fontSize: FontSizeLevel, level: keyof typeof fontSizeClasses.small): string => {
  return fontSizeClasses[fontSize][level];
};
