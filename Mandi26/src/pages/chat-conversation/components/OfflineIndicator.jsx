import React from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = ({ pendingMessages }) => {
  if (pendingMessages === 0) return null;

  return (
    <div className="bg-warning/20 border-l-4 border-warning px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="WifiOff" size={16} color="var(--color-warning-foreground)" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-medium text-foreground">
            You're offline
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {pendingMessages} {pendingMessages === 1 ? 'message' : 'messages'} will be sent when you reconnect
          </p>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;