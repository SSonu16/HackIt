import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, isOpen, onToggle }) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧', nativeLabel: 'English' },
    { code: 'hi', label: 'Hindi', flag: '🇮🇳', nativeLabel: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', flag: '🇮🇳', nativeLabel: 'मराठी' },
    { code: 'gu', label: 'Gujarati', flag: '🇮🇳', nativeLabel: 'ગુજરાતી' },
    { code: 'pa', label: 'Punjabi', flag: '🇮🇳', nativeLabel: 'ਪੰਜਾਬੀ' },
    { code: 'ta', label: 'Tamil', flag: '🇮🇳', nativeLabel: 'தமிழ்' },
    { code: 'te', label: 'Telugu', flag: '🇮🇳', nativeLabel: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', flag: '🇮🇳', nativeLabel: 'বাংলা' }
  ];

  const selectedLang = languages?.find(lang => lang?.code === selectedLanguage) || languages?.[0];

  return (
    <div className="relative language-dropdown">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-card border border-border hover:bg-muted transition-smooth w-full sm:w-auto justify-between sm:justify-start"
        aria-label="Select language"
      >
        <span className="text-2xl">{selectedLang?.flag}</span>
        <span className="text-sm font-medium text-foreground">{selectedLang?.nativeLabel}</span>
        <Icon name="ChevronDown" size={16} className={transition-transform ${isOpen ? 'rotate-180' : ''}} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-full sm:w-64 bg-popover rounded-md shadow-xl border border-border z-dropdown max-h-80 overflow-y-auto">
          {languages?.map((lang) => (
            <button
              key={lang?.code}
              onClick={() => {
                onLanguageChange(lang?.code);
                onToggle();
              }}
              className={`
                w-full px-4 py-3 flex items-center gap-3 text-left transition-smooth
                ${selectedLanguage === lang?.code
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-popover-foreground'
                }
              `}
            >
              <span className="text-2xl">{lang?.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{lang?.nativeLabel}</span>
                <span className="text-xs opacity-70">{lang?.label}</span>
              </div>
              {selectedLanguage === lang?.code && (
                <Icon name="Check" size={18} className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;