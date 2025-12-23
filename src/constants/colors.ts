export const colors = {
  primary: {
    main: '#007AAF',
    dark: '#005a85',
    light: '#0095d1',
  },
  secondary: {
    main: '#F4B400',
    light: '#FFD54F',
  },
  status: {
    adequate: '#007AAF',
    scarce: '#FF8A00',
  },
  neutral: {
    darkGray: '#333333',
    mediumGray: '#666666',
    lightGray: '#EFEFEF',
    border: '#D4D4D4',
    white: '#FFFFFF',
    black: '#000000',
  },
};

export const textColors = {
  primary: colors.neutral.darkGray,
  secondary: colors.neutral.mediumGray,
  light: colors.neutral.lightGray,
};

export const buttonStyles = {
  primary: {
    bg: colors.primary.main,
    text: colors.neutral.white,
    hover: colors.primary.dark,
  },
  secondary: {
    text: colors.secondary.main,
    border: colors.secondary.main,
  },
  tab: {
    active: {
      bg: colors.neutral.black,
      text: colors.secondary.main,
    },
    inactive: {
      bg: colors.neutral.lightGray,
      text: colors.neutral.darkGray,
    },
  },
};
