import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFontSize } from '../context/FontSizeContext';
import { getFontSizeClass } from '../utils/fontSizeHelper';
import { VaccineCheckbox } from './VaccineCheckbox';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  onSearch?: (params: { selectedVaccineTypes: string[]; searchQuery: string }) => void;
}

const VACCINE_OPTIONS = [
  { id: 'hib', labelKey: 'hib' },
  { id: 'meningococcal', labelKey: 'meningococcal' },
  { id: 'pneumococcal', labelKey: 'pneumococcal' },
  { id: 'tetanusToxoid', labelKey: 'tetanusToxoid' },
  { id: 'diphtheria', labelKey: 'diphtheria' },
  { id: 'tetanus', labelKey: 'tetanus' },
  { id: 'pertussis', labelKey: 'pertussis' },
  { id: 'japaneseEncephalitis', labelKey: 'japaneseEncephalitis' },
  { id: 'influenza', labelKey: 'influenza' },
  { id: 'hepatitisB', labelKey: 'hepatitisB' },
  { id: 'hepatitisA', labelKey: 'hepatitisA' },
  { id: 'measles', labelKey: 'measles' },
  { id: 'mumps', labelKey: 'mumps' },
  { id: 'rubella', labelKey: 'rubella' },
  { id: 'rotavirus', labelKey: 'rotavirus' },
  { id: 'varicella', labelKey: 'varicella' },
  { id: 'shingles', labelKey: 'shingles' },
  { id: 'hpv', labelKey: 'hpv' },
  { id: 'covid19', labelKey: 'covid19' },
  { id: 'mpox', labelKey: 'mpox' },
  { id: 'rsv', labelKey: 'rsv' },
  { id: 'polio', labelKey: 'polio' },
  { id: 'bcg', labelKey: 'bcg' },
];

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const { translations } = useLanguage();
  const { fontSize } = useFontSize();
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVaccineToggle = (id: string, checked: boolean) => {
    setSelectedVaccines((prev) =>
      checked ? [...prev, id] : prev.filter((v) => v !== id)
    );
  };

  const handleSearchAndConfirm = () => {
    onSearch?.({ selectedVaccineTypes: selectedVaccines, searchQuery });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchAndConfirm();
    }
  };

  return (
    <div className="space-y-2 sm:space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
        <div className="flex-1 w-full relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-[#666666]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={translations.search.placeholder}
            className={`w-full pl-10 pr-4 py-2 sm:py-3 border border-[#D4D4D4] rounded ${getFontSizeClass(fontSize, 'sm')} sm:${getFontSizeClass(fontSize, 'base')} placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#007AAF] focus:border-transparent`}
          />
        </div>
        <button
          onClick={handleSearchAndConfirm}
          className={`w-full sm:w-auto bg-[#007AAF] text-white px-4 sm:px-6 py-2 sm:py-3 rounded ${getFontSizeClass(fontSize, 'sm')} sm:${getFontSizeClass(fontSize, 'base')} font-medium hover:bg-[#005a85] active:scale-95 transition-all`}
        >
          {translations.search.button}
        </button>
      </div>

      <div className="space-y-2">
        <h3 className={`${getFontSizeClass(fontSize, 'sm')} sm:${getFontSizeClass(fontSize, 'base')} font-semibold text-[#333333]`}>疫苗類型</h3>
 
        {/* Vaccine Checkboxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-1">
          {VACCINE_OPTIONS.map((vaccine) => (
            <VaccineCheckbox
              key={vaccine.id}
              id={vaccine.id}
              label={
                translations.vaccines[vaccine.labelKey] ||
                vaccine.id
              }
              checked={selectedVaccines.includes(vaccine.id)}
              onChange={(checked) =>
                handleVaccineToggle(vaccine.id, checked)
              }
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4 sm:pt-6">
        <button
          onClick={handleSearchAndConfirm}
          className={`w-full sm:w-auto bg-[#007AAF] text-white px-8 sm:px-12 py-3 sm:py-4 rounded ${getFontSizeClass(fontSize, 'sm')} sm:${getFontSizeClass(fontSize, 'base')} font-medium hover:bg-[#005a85] active:scale-95 transition-all`}
        >
          {translations.search.confirm}
        </button>
      </div>
    </div>
  );
};
