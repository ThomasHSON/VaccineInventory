export interface ApiVaccineResponse {
  Data: ApiVaccine[];
  Code: number;
  Result: string;
}

export interface ApiVaccine {
  DeviceType: number;
  ChineseName: string;
  Scientific_Name: string;
  BarCode: string;
  BarCode1: string;
  BarCode2: string;
  Package: string;
  QRCode: string;
  CustomText1: string;
  CustomText2: string;
  CustomText3: string;
  Max_shipping: number;
  Max_Inventory: number;
  StorageName: string;
  IsWarning: boolean;
  DRUGKIND: string;
  IsAnesthetic: boolean;
  IsShapeSimilar: boolean;
  IsSoundSimilar: boolean;
  Min_Package_Num: string;
  Speaker: string;
  Area: string;
  GUID: string;
  Master_GUID: string;
  IP: string;
  Code: string;
  SKDIACODE: string;
  Name: string;
  Inventory: string;
  SortIndex: number;
  List_Validity_period: unknown[];
  List_Inventory: unknown[];
  List_Lot_number: unknown[];
}

export async function fetchVaccines(): Promise<ApiVaccineResponse> {
  // https://www.kutech.tw:4443/api/med_page/get_med_cloud
  // https://www.kutech.tw:4435/api/vaccine
  const response = await fetch('https://www.kutech.tw:4443/api/med_page/get_med_cloud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });


  console.log(await response.json());
  if (!response.ok) {
    throw new Error('Failed to fetch vaccine data');
  }

  return response.json();
}
