import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const VoiceSearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setSearchQuery('टमाटर');
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex items-center gap-2 md:gap-3">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pr-12 md:pr-14"
          />
          <button
            type="button"
            onClick={toggleVoiceRecording}
            className={`absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center transition-smooth ${
              isRecording 
                ? 'bg-error text-error-foreground animate-pulse' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
            aria-label={isRecording ? 'Stop recording' : 'Start voice search'}
          >
            <Icon name={isRecording ? 'MicOff' : 'Mic'} size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
        <button
          type="submit"
          className="w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:bg-primary/90 transition-smooth flex-shrink-0"
          aria-label="Search"
        >
          <Icon name="Search" size={20} className="md:w-6 md:h-6" />
        </button>
      </div>
      {isRecording && (
        <p className="text-xs md:text-sm text-muted-foreground mt-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-error rounded-full animate-pulse"></span>
          Listening... Speak in your preferred language
        </p>
      )}
    </form>
  );
};

export default VoiceSearchBar;