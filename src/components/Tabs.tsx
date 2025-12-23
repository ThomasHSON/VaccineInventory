import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFontSize } from '../context/FontSizeContext';
import { getFontSizeClass } from '../utils/fontSizeHelper';
import { Type } from 'lucide-react';

interface TabsProps {
  activeTab: 'inventory' | 'search';
  onTabChange: (tab: 'inventory' | 'search') => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const { translations } = useLanguage();
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
          <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-0">
            <div className="inline-block bg-transparent [filter:drop-shadow(2px_2px_4px_rgba(0,0,0,0.55))]
    hover:[filter:drop-shadow(4px_4px_8px_rgba(0,0,0,0.7))] transition-all">
              <button
                onClick={() => onTabChange('inventory')}
                className={`relative py-2 px-4 sm:px-8 ${getFontSizeClass(fontSize, 'base')} sm:${getFontSizeClass(fontSize, 'lg')} lg:${getFontSizeClass(fontSize, 'base')} whitespace-nowrap text-bold ${
                  activeTab === 'inventory'
                    ? 'text-[#F4B400]'
                    : 'text-[#333333] hover:text-[#666666]'
                }`}
                style={{
                  clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                  background: "linear-gradient(135deg, #707070 0%, #000000 100%)"
                }}
              >
                {activeTab === 'inventory' ? (
                  <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-bold text-transparent">
                    {translations.tabs.inventory}
                  </div>
                ) : (
                  <div className="bg-[linear-gradient(135deg,#bbbbbb,#bbbbbb)] bg-clip-text text-bold text-transparent">
                    {translations.tabs.inventory}
                  </div>
                )}
              </button>
            </div>
            <div className="inline-block bg-transparent [filter:drop-shadow(2px_2px_4px_rgba(0,0,0,0.55))]
    hover:[filter:drop-shadow(4px_4px_8px_rgba(0,0,0,0.7))] transition-all">
            <button
              onClick={() => onTabChange('search')}
              className={`relative shadow-[0_6px_14px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.7)] py-2 px-4 sm:px-8 ${getFontSizeClass(fontSize, 'base')} sm:${getFontSizeClass(fontSize, 'lg')} lg:${getFontSizeClass(fontSize, 'base')} text-bold transition-all whitespace-nowrap ${
                activeTab === 'search'
                  ? 'text-[#F4B400]'
                  : 'text-[#333333] hover:text-[#666666]'
              }`}
              style={{
                clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                background: "linear-gradient(135deg, #707070 0%, #000000 100%)"
              }}
            >
                {activeTab === 'search' ? (
                  <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-transparent">
                    {translations.tabs.search}
                  </div>
                ) : (
                  <div className="bg-[linear-gradient(135deg,#bbbbbb,#bbbbbb)] bg-clip-text text-transparent">
                    {translations.tabs.search}
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto sm:justifiy-center justify-end">
            <div className="flex gap-1 sm:gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 sm:px-3 py-1 rounded ${getFontSizeClass(fontSize, 'xs')} transition-all whitespace-nowrap ${
                    fontSize === size
                      ? 'bg-[#007AAF] text-white shadow-md'
                      : 'bg-gray-100 text-[#333333] hover:bg-gray-200 shadow-sm hover:shadow-md'
                  }`}
                  style={fontSize === size ? {
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  } : {
                    textShadow: '0 0.5px 1px rgba(0, 0, 0, 0.05)'
                  }}
                  title={size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                >
                  {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
