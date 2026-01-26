import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationHeader = ({ 
  participant, 
  onBack, 
  onProfileClick, 
  onVideoCall, 
  onVoiceCall 
}) => {
  return (
    <div className="h-16 md:h-20 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-md transition-smooth lg:hidden"
          aria-label="Go back"
        >
          <Icon name="ArrowLeft" size={20} />
        </button>

        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 min-w-0 flex-1 hover:bg-muted/50 rounded-md p-2 transition-smooth"
        >
          <div className="relative flex-shrink-0">
            <Image
              src={participant?.avatar}
              alt={participant?.avatarAlt}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            {participant?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
            )}
          </div>

          <div className="flex-1 min-w-0 text-left">
            <h2 className="text-sm md:text-base font-semibold text-foreground truncate">
              {participant?.name}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground truncate">
              {participant?.isOnline ? (
                <span className="text-success">Online</span>
              ) : (
                `Last seen ${participant?.lastSeen}`
              )}
            </p>
          </div>
        </button>
      </div>
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <button
          onClick={onVoiceCall}
          className="p-2 md:p-2.5 hover:bg-muted rounded-md transition-smooth"
          aria-label="Voice call"
        >
          <Icon name="Phone" size={20} className="md:w-5 md:h-5" />
        </button>
        <button
          onClick={onVideoCall}
          className="p-2 md:p-2.5 hover:bg-muted rounded-md transition-smooth"
          aria-label="Video call"
        >
          <Icon name="Video" size={20} className="md:w-5 md:h-5" />
        </button>
        <button
          className="p-2 md:p-2.5 hover:bg-muted rounded-md transition-smooth"
          aria-label="More options"
        >
          <Icon name="MoreVertical" size={20} className="md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;