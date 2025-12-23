import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFontSize } from '../context/FontSizeContext';
import { getFontSizeClass } from '../utils/fontSizeHelper';

export const Header: React.FC = () => {
  const { translations, language, switchLanguage } = useLanguage();
  const { fontSize } = useFontSize();

  return (
    <header className="bg-white py-4 sm:py-6 lg:py-8">
      <div className="lg:pl-8 mx-auto">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-4 flex flex-col justify-center items-start w-full">
          <div className="flex flex-col sm:items-center sm:justify-between gap-2 px-4 sm:px-6 w-full sm:flex-row">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 py-2">
              <img src="/logo.png" alt="Logo" className="w-20 sm:w-24 object-contain" />
              <div className="font-semibold text-[#333333]" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <div className={`${getFontSizeClass(fontSize, 'lg')} sm:${getFontSizeClass(fontSize, 'xl')}`}>{translations.header.title}</div>
                <div className={`${getFontSizeClass(fontSize, 'sm')} sm:${getFontSizeClass(fontSize, 'base')}`}>{translations.header.title_en}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-center w-full justify-between sm:flex-row">
            <div
              className={`text-center text-yellow-400 px-16 py-2 tracking-wide font-extrabold mb-4 sm:mb-0
                ${getFontSizeClass(fontSize, 'base')} 
                sm:${getFontSizeClass(fontSize, 'lg')}
              `}
              style={{
                clipPath: "polygon(0 0, 96% 0, 100% 100%, 0 100%)",
                background: "linear-gradient(135deg, #707070 0%, #000000 100%)"
                
              }}
            >
              {translations.header.smartVaxCabinetEn === "" ? (
              <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-transparent">
                {translations.header.smartVaxCabinet}
              </div>
              ) : (
                <>
                  <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-transparent">
                    {translations.header.smartVaxCabinet}
                  </div>
                  <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-transparent text-sm">
                    {translations.header.smartVaxCabinetEn}
                  </div>
                </>
              )}
            </div>
            <div className="flex sm:w-auto w-full justify-end gap-4 sm:gap-4 flex-shrink-0 pr-4">
              <button 
                className={`bg-[#006B93] text-white px-6 py-2 rounded ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} hover:bg-[#005a85] font-bold shadow-[0px_3px_6px_rgba(0,0,0,0.35)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.45)] active:scale-95 transition-all`}>
                  {translations.header.bookAppointment}
              </button>
              <button
                  onClick={() => switchLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')}
                  className={`px-6 py-2 ${getFontSizeClass(fontSize, 'sm')} bg-gray-100 rounded font-medium hover:bg-gray-200 font-bold shadow-[0px_3px_6px_rgba(0,0,0,0.35)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.45)] transition-all`}
                  style={{ 
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {translations.header.languageSwitch}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:justify-between lg:items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-16 object-contain" />
            <div className="font-semibold text-[#333333]" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <div className={getFontSizeClass(fontSize, 'lg')}>{translations.header.title}</div>
              <div className={getFontSizeClass(fontSize, 'sm')}>{translations.header.title_en}</div>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="flex gap-3 justify-center items-center relative left-[32px] z-10">
              <button 
                className={`bg-[#006B93] text-white px-6 py-2 rounded ${getFontSizeClass(fontSize, 'sm')} font-bold shadow-[0px_3px_6px_rgba(0,0,0,0.35)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.45)] hover:bg-[#005a85] active:scale-95 transition-all`}>
                {translations.header.bookAppointment}
              </button>
              <button
                onClick={() => switchLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')}
                className={`px-6 py-2 ${getFontSizeClass(fontSize, 'sm')} bg-gray-100 rounded font-medium hover:bg-gray-200 font-bold shadow-[0px_3px_6px_rgba(0,0,0,0.35)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.45)] transition-all`}
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                }}
              >
                {translations.header.languageSwitch}
              </button>
            </div>
            <div className="inline-block bg-transparent [filter:drop-shadow(1px_2px_2px_rgba(0,0,0,0.55))] transition-all">
              <div
                className={`text-center text-yellow-400 px-20 py-3 tracking-wide font-extrabold 
                  ${getFontSizeClass(fontSize, 'base')} 
                  sm:${getFontSizeClass(fontSize, 'lg')}
                `}
                style={{
                  clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)",
                  background: "linear-gradient(135deg, #707070 0%, #000000 100%)"
                }}
              >
                {translations.header.smartVaxCabinetEn === "" ? (
                <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-transparent">
                  {translations.header.smartVaxCabinet}
                </div>
                ) : (
                  <>
                    <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-transparent">
                      {translations.header.smartVaxCabinet}
                    </div>
                    <div className="bg-[linear-gradient(135deg,#EBD483,#CA9C59)] bg-clip-text text-transparent text-sm">
                      {translations.header.smartVaxCabinetEn}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
