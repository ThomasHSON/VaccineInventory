import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFontSize } from '../context/FontSizeContext';
import { getFontSizeClass } from '../utils/fontSizeHelper';
import { Vaccine } from '../types';

interface VaccineTableProps {
  vaccines: Vaccine[];
  typeFilter?: 'subsidized' | 'selfPay' | 'healthInsurance' | null;
}

const TYPE_LABELS: Record<string, string> = {
  subsidized: '公費',
  selfPay: '自費',
  healthInsurance: '健保',
};

export const VaccineTable: React.FC<VaccineTableProps> = ({ vaccines, typeFilter }) => {
  const { translations } = useLanguage();
  const { fontSize } = useFontSize();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filteredVaccines = typeFilter
    ? vaccines.filter((v) => v.type === typeFilter)
    : vaccines;

  return (
    <div className="w-full overflow-x-auto border border-[#D4D4D4] rounded">
      <table className="w-full min-w-max">
        <thead>
          <tr className="bg-[#000000]">
            <th className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-white ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} font-semibold whitespace-nowrap`}>
              {translations.table.chineseName}
            </th>
            <th className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-white ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} font-semibold whitespace-nowrap`}>
              {translations.table.englishName}
            </th>
            <th className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-white ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} font-semibold whitespace-nowrap`}>
              {translations.table.type}
            </th>
            <th className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-white ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} font-semibold whitespace-nowrap`}>
              {translations.table.description}
            </th>
            <th className={`px-4 sm:px-6 py-2 sm:py-3 text-center text-white ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} font-semibold whitespace-nowrap`}>
              {translations.table.inventory}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredVaccines.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className={`px-4 sm:px-6 py-3 text-center text-[#666666] ${getFontSizeClass(fontSize, 'sm')} sm:${getFontSizeClass(fontSize, 'base')}`}
              >
                {translations.noData}
              </td>
            </tr>
          ) : (
            filteredVaccines.map((vaccine, index) => (
              <tr
                key={vaccine.id}
                onMouseEnter={() => setHoveredRow(vaccine.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-t border-[#D4D4D4] transition-colors ${
                  hoveredRow === vaccine.id
                    ? 'bg-[#E8F4FF]'
                    : index % 2 === 0
                      ? 'bg-white'
                      : 'bg-[#EFEFEF]'
                }`}
              >
                <td className={`px-4 sm:px-6 py-2 sm:py-3 ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} text-[#333333] font-medium`}>
                  {vaccine.chineseName}
                </td>
                <td className={`px-4 sm:px-6 py-2 sm:py-3 ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} text-[#333333]`}>
                  {vaccine.englishName}
                </td>
                <td className={`px-4 sm:px-6 py-2 sm:py-3 ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} text-[#333333]`}>
                  {TYPE_LABELS[vaccine.type]}
                </td>
                <td className={`px-4 sm:px-6 py-2 sm:py-3 ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} text-[#666666]`}>
                  {vaccine.description}
                </td>
                <td className="px-4 sm:px-6 py-2 sm:py-3 text-center">
                  <span
                    className={`${getFontSizeClass(fontSize, 'xs')} font-medium mt-1 ${
                      vaccine.inventoryStatus === 'adequate'
                        ? 'text-[#007AAF]'
                        : vaccine.inventoryStatus === 'scarce'
                          ? 'text-[#FF8A00]'
                          : 'text-[#FF0000]'
                    }`}
                  >
                    {vaccine.inventoryStatus === 'adequate'
                      ? translations.table.adequate
                      : vaccine.inventoryStatus === 'scarce'
                        ? translations.table.scarce
                        : translations.table.outOfStock}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
