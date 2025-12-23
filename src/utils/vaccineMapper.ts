import { Vaccine } from '../types';
import { ApiVaccine } from '../services/vaccineApi';

export function mapApiVaccineToVaccine(apiVaccine: ApiVaccine): Vaccine {
  const inventory = parseInt(apiVaccine.Inventory) || 0;

  let inventoryStatus: 'adequate' | 'scarce' | 'outOfStock';
  if (inventory === 0) {
    inventoryStatus = 'outOfStock';
  } else if (inventory <= 3) {
    inventoryStatus = 'scarce';
  } else {
    inventoryStatus = 'adequate';
  }

  let type: 'subsidized' | 'selfPay' | 'healthInsurance';
  const customText = apiVaccine.CustomText1.trim();
  if (customText === '公費') {
    type = 'subsidized';
  } else if (customText === '健保') {
    type = 'healthInsurance';
  } else {
    type = 'selfPay';
  }

  return {
    id: apiVaccine.GUID,
    chineseName: apiVaccine.Name,
    englishName: apiVaccine.Scientific_Name,
    type,
    description: apiVaccine.ChineseName,
    inventory,
    inventoryStatus,
  };
}
