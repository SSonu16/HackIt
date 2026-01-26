import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onStartVoiceRecording, onAttachment, disabled }) => {
  const [message, setMessage] = useState('');
  const [showTranslationPreview, setShowTranslationPreview] = useState(false);
  const [translatedPreview, setTranslatedPreview] = useState('');
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message?.trim()) {
      onSendMessage(message?.trim());
      setMessage('');
      setShowTranslationPreview(false);
      setTranslatedPreview('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  const handleTranslationPreview = () => {
    if (message?.trim()) {
      setShowTranslationPreview(true);
      setTimeout(() => {
        setTranslatedPreview(`[Translated to Hindi] ${message}`);
      }, 500);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onAttachment(file);
    }
  };

  return (
    <div className="bg-card border-t border-border p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {showTranslationPreview && translatedPreview && (
          <div className="mb-3 md:mb-4 bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4">
            <div className="flex items-start gap-2">
              <Icon name="Languages" size={16} className="mt-0.5 flex-shrink-0" color="var(--color-accent)" />
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Translation Preview:</p>
                <p className="text-sm md:text-base text-foreground">{translatedPreview}</p>
              </div>
              <button
                onClick={() => setShowTranslationPreview(false)}
                className="p-1 hover:bg-muted rounded transition-smooth"
                aria-label="Close preview"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end gap-2 md:gap-3">
          <button
            onClick={handleAttachmentClick}
            disabled={disabled}
            className="p-3 md:p-3.5 hover:bg-muted rounded-full transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Attach file"
          >
            <Icon name="Paperclip" size={20} className="md:w-6 md:h-6" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex-1 bg-muted rounded-2xl overflow-hidden">
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={disabled}
              className="w-full px-4 py-3 md:px-5 md:py-3.5 bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground resize-none focus:outline-none disabled:cursor-not-allowed"
              rows={1}
              style={{
                minHeight: '48px',
                maxHeight: '120px'
              }}
            />
            
            {message?.trim() && (
              <div className="px-4 pb-3 flex items-center gap-2">
                <button
                  onClick={handleTranslationPreview}
                  className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-smooth"
                >
                  <Icon name="Languages" size={14} />
                  <span>Preview translation</span>
                </button>
              </div>
            )}
          </div>

          {message?.trim() ? (
            <Button
              variant="default"
              size="icon"
              onClick={handleSend}
              disabled={disabled}
              iconName="Send"
              className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full"
              aria-label="Send message"
            />
          ) : (
            <button
              onClick={onStartVoiceRecording}
              disabled={disabled}
              className="p-3 md:p-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 active:scale-press"
              aria-label="Start voice recording"
            >
              <Icon name="Mic" size={24} className="md:w-7 md:h-7" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-3 md:mt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>End-to-end encrypted</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Wifi" size={12} />
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;