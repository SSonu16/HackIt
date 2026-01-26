import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ message, isOwn, onPlayAudio, onTranslate }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    onPlayAudio(message?.id);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleToggleTranslation = () => {
    if (!showTranslation && !message?.translatedText) {
      onTranslate(message?.id);
    }
    setShowTranslation(!showTranslation);
  };

  const getStatusIcon = () => {
    if (!isOwn) return null;
    
    switch (message?.status) {
      case 'sent':
        return <Icon name="Check" size={14} color="var(--color-muted-foreground)" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={14} color="var(--color-muted-foreground)" />;
      case 'read':
        return <Icon name="CheckCheck" size={14} color="var(--color-primary)" />;
      default:
        return <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />;
    }
  };

  return (
    <div className={`flex gap-2 md:gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'} mb-4 md:mb-6`}>
      {!isOwn && (
        <Image
          src={message?.senderAvatar}
          alt={message?.senderAvatarAlt}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
        />
      )}
      <div className={`flex flex-col gap-1 max-w-[75%] md:max-w-[65%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 md:px-5 md:py-3.5 ${
            isOwn
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          }`}
        >
          {message?.type === 'text' && (
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
              {message?.content}
            </p>
          )}

          {message?.type === 'voice' && (
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayAudio}
                className={`p-2 rounded-full transition-smooth ${
                  isOwn ? 'bg-primary-foreground/20 hover:bg-primary-foreground/30' : 'bg-foreground/10 hover:bg-foreground/20'
                }`}
                aria-label={isPlaying ? 'Playing audio' : 'Play audio'}
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={16} />
              </button>
              <div className="flex-1 h-8 flex items-center gap-1">
                {[...Array(20)]?.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isOwn ? 'bg-primary-foreground/40' : 'bg-foreground/30'
                    }`}
                    style={{ height: `${Math.random() * 24 + 8}px` }}
                  />
                ))}
              </div>
              <span className="text-xs opacity-70">{message?.duration}</span>
            </div>
          )}

          {message?.type === 'image' && (
            <div className="space-y-2">
              <Image
                src={message?.imageUrl}
                alt={message?.imageAlt}
                className="rounded-lg max-w-full h-auto"
              />
              {message?.caption && (
                <p className="text-sm md:text-base leading-relaxed">{message?.caption}</p>
              )}
            </div>
          )}

          {message?.type === 'product' && (
            <div className="flex gap-3 bg-background/10 rounded-lg p-3">
              <Image
                src={message?.product?.image}
                alt={message?.product?.imageAlt}
                className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm md:text-base truncate">
                  {message?.product?.name}
                </h4>
                <p className="text-xs md:text-sm opacity-80 mt-1">
                  ₹{message?.product?.price?.toLocaleString('en-IN')} / {message?.product?.unit}
                </p>
              </div>
            </div>
          )}

          {message?.originalLanguage && message?.originalLanguage !== 'en' && (
            <button
              onClick={handleToggleTranslation}
              className={`flex items-center gap-1.5 mt-2 text-xs opacity-70 hover:opacity-100 transition-smooth ${
                message?.translationConfidence < 0.8 ? 'text-warning' : ''
              }`}
            >
              <Icon name="Languages" size={14} />
              <span>{showTranslation ? 'Show original' : 'Translate'}</span>
              {message?.translationConfidence && (
                <span className="ml-1">({Math.round(message?.translationConfidence * 100)}%)</span>
              )}
            </button>
          )}
        </div>

        {showTranslation && message?.translatedText && (
          <div
            className={`rounded-2xl px-4 py-3 md:px-5 md:py-3.5 border-2 ${
              isOwn
                ? 'border-primary/30 bg-primary/5' :'border-muted bg-background'
            }`}
          >
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              {message?.translatedText}
            </p>
          </div>
        )}

        <div className={`flex items-center gap-2 px-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-muted-foreground">{message?.timestamp}</span>
          {getStatusIcon()}
          {message?.isTranslating && (
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-75" />
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-150" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;