import React from 'react';
import { Check } from 'lucide-react';
import { useFontSize } from '../context/FontSizeContext';
import { getFontSizeClass } from '../utils/fontSizeHelper';

interface VaccineCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const VaccineCheckbox: React.FC<VaccineCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  const { fontSize } = useFontSize();

  return (
    <label className="flex items-center gap-3 cursor-pointer py-1 sm:py-2">
      <div
        className={`relative w-5 h-5 sm:w-6 sm:h-6 border-2 rounded flex items-center justify-center transition-all ${
          checked
            ? 'bg-[#007AAF] border-[#007AAF]'
            : 'border-[#D4D4D4] hover:border-[#007AAF]'
        }`}
      >
        {checked && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
      </div>
      <span className={`${getFontSizeClass(fontSize, 'base')} sm:${getFontSizeClass(fontSize, 'lg')} text-[#333333]`}>{label}</span>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
    </label>
  );
};
