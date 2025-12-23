import React, { useState, useEffect, useRef } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { FontSizeProvider } from './context/FontSizeContext';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { SearchSection } from './components/SearchSection';
import { InventoryOverview } from './components/InventoryOverview';
import { useFontSize } from './context/FontSizeContext';
import { getFontSizeClass } from './utils/fontSizeHelper';
import { Vaccine } from './types';
import { fetchVaccines } from './services/vaccineApi';
import { mapApiVaccineToVaccine } from './utils/vaccineMapper';


function AppContent() {
  const { fontSize } = useFontSize();
  const [activeTab, setActiveTab] = useState<'inventory' | 'search'>('inventory');
  const [allVaccines, setAllVaccines] = useState<Vaccine[]>([]);
  const [displayVaccines, setDisplayVaccines] = useState<Vaccine[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'subsidized' | 'selfPay' | 'healthInsurance' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSearchFilter, setCurrentSearchFilter] = useState<{
    selectedVaccineTypes: string[];
    searchQuery: string;
  }>({ selectedVaccineTypes: [], searchQuery: '' });
  const { translations, language, switchLanguage } = useLanguage();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const applyFilters = (vaccines: Vaccine[], filter: { selectedVaccineTypes: string[]; searchQuery: string }) => {
    const hasVaccineTypeFilter = filter.selectedVaccineTypes.length > 0;
    const hasSearchQuery = filter.searchQuery.trim().length > 0;

    if (!hasVaccineTypeFilter && !hasSearchQuery) {
      return vaccines;
    }

    const vaccineTypeLabels = filter.selectedVaccineTypes.map(
      (type) => translations.vaccines[type] || ''
    );

    return vaccines.filter((vaccine) => {
      const matchesVaccineType = !hasVaccineTypeFilter || vaccineTypeLabels.some(
        (label) => vaccine.description.includes(label)
      );

      const matchesSearchQuery = !hasSearchQuery ||
        vaccine.chineseName.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        vaccine.englishName.toLowerCase().includes(filter.searchQuery.toLowerCase());

      return matchesVaccineType && matchesSearchQuery;
    });
  };

  const loadVaccines = async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setIsLoading(true);
      }
      const response = await fetchVaccines();
      const vaccines = response.Data.map(mapApiVaccineToVaccine);
      setAllVaccines(vaccines);

      const filtered = applyFilters(vaccines, currentSearchFilter);
      setDisplayVaccines(filtered);
    } catch (error) {
      console.error('Failed to load vaccines:', error);
    } finally {
      if (!isRefresh) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadVaccines();
  }, []);

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      loadVaccines(true);
    }, 3 * 60 * 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadVaccines(true);

        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }

        intervalIdRef.current = setInterval(() => {
          loadVaccines(true);
        }, 3 * 60 * 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentSearchFilter, translations]);

  const handleSearch = ({ selectedVaccineTypes, searchQuery }: { selectedVaccineTypes: string[]; searchQuery: string }) => {
    const filter = { selectedVaccineTypes, searchQuery };
    setCurrentSearchFilter(filter);

    const filtered = applyFilters(allVaccines, filter);
    setDisplayVaccines(filtered);
    setActiveTab('inventory');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-24 lg:pb-24 mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className={`${getFontSizeClass(fontSize, 'lg')} text-[#666666]`}>
              {translations.loading}
            </div>
          </div>
        ) : activeTab === 'inventory' ? (
          <InventoryOverview
            vaccines={displayVaccines}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        ) : (
          <SearchSection onSearch={handleSearch} />
        )}

        <div className="w-full py-4 px-8 flex items-center justify-center gap-8">
          <div className="flex-1 h-[1px] bg-gray-200">
          </div>
          <div>
            {translations.note}
          </div>
          <div className="flex-1 h-[1px] bg-gray-200">
          </div>
        </div>
      </main>

      <footer className={`w-full fixed bottom-0 border-t border-[#D4D4D4] py-2 sm:py-2 text-center ${getFontSizeClass(fontSize, 'xs')} sm:${getFontSizeClass(fontSize, 'sm')} text-[#666666] bg-[#EFEFEF]`}>
        <p>{translations.footer.hospital}</p>
        <p className="mt-2">{translations.footer.copyright}</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <FontSizeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </FontSizeProvider>
  );
}
