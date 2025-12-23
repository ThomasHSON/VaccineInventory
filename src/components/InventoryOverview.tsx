import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFontSize } from '../context/FontSizeContext';
import { getFontSizeClass } from '../utils/fontSizeHelper';
import { Vaccine } from '../types';
import { VaccineTable } from './VaccineTable';

interface InventoryOverviewProps {
  vaccines: Vaccine[];
  selectedFilter: 'subsidized' | 'selfPay' | 'healthInsurance' | null;
  onFilterChange: (filter: 'subsidized' | 'selfPay' | 'healthInsurance' | null) => void;
}

export const InventoryOverview: React.FC<InventoryOverviewProps> = ({
  vaccines,
  selectedFilter,
  onFilterChange
}) => {
  const { translations } = useLanguage();
  const { fontSize } = useFontSize();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          {['subsidized', 'selfPay', 'healthInsurance'].map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange(
                selectedFilter === type ? null : (type as any)
              )}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} font-medium transition-all ${
                selectedFilter === type
                  ? 'bg-[#007AAF] text-white hover:bg-[#005a85]'
                  : 'bg-[#EFEFEF] text-[#333333] hover:bg-[#D4D4D4]'
              }`}
            >
              {translations.filters[type as keyof typeof translations.filters]}
            </button>
          ))}
        </div>
      </div>

      <VaccineTable vaccines={vaccines} typeFilter={selectedFilter} />
    </div>
  );
};
