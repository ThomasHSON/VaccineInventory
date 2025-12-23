export interface Vaccine {
  id: string;
  chineseName: string;
  englishName: string;
  type: 'subsidized' | 'selfPay' | 'healthInsurance';
  description: string;
  inventory: number;
  inventoryStatus: 'adequate' | 'scarce' | 'outOfStock';
}

export interface Translations {
  header: {
    title: string;
    bookAppointment: string;
    languageSwitch: string;
    smartVaxCabinet: string;
  };
  tabs: {
    inventory: string;
    search: string;
  };
  search: {
    placeholder: string;
    button: string;
    advancedSearch: string;
    confirm: string;
  };
  filters: {
    subsidized: string;
    selfPay: string;
    healthInsurance: string;
  };
  vaccines: {
    [key: string]: string;
  };
  table: {
    chineseName: string;
    englishName: string;
    type: string;
    description: string;
    inventory: string;
    adequate: string;
    scarce: string;
    outOfStock: string;
    units: string;
  };
  noData: string;
  loading: string;
}

export type Language = 'zh-TW' | 'en';
