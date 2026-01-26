import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistantPanel = ({ suggestions, onAcceptSuggestion, onDismiss }) => {
  if (!suggestions || suggestions?.length === 0) return null;

  return (
    <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-4 md:p-5 mb-4 md:mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Sparkles" size={20} color="var(--color-accent-foreground)" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm md:text-base font-semibold text-foreground">
              AI Negotiation Assistant
            </h3>
            <button
              onClick={onDismiss}
              className="p-1 hover:bg-muted rounded transition-smooth"
              aria-label="Dismiss suggestions"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion?.id}
                className="bg-card rounded-lg p-3 md:p-4 border border-border"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Icon
                    name={suggestion?.type === 'price' ? 'TrendingDown' : 'MessageSquare'}
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    color="var(--color-accent)"
                  />
                  <p className="text-sm md:text-base text-foreground flex-1">
                    {suggestion?.message}
                  </p>
                </div>

                {suggestion?.marketRate && (
                  <div className="bg-muted/50 rounded-md p-2 md:p-3 mb-3">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">Current Market Rate:</span>
                      <span className="font-semibold text-foreground">
                        ₹{suggestion?.marketRate?.toLocaleString('en-IN')} / {suggestion?.unit}
                      </span>
                    </div>
                    {suggestion?.priceRange && (
                      <div className="flex items-center justify-between text-xs md:text-sm mt-1">
                        <span className="text-muted-foreground">Typical Range:</span>
                        <span className="text-muted-foreground">
                          ₹{suggestion?.priceRange?.min?.toLocaleString('en-IN')} - ₹{suggestion?.priceRange?.max?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {suggestion?.suggestedResponse && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAcceptSuggestion(suggestion?.suggestedResponse)}
                      iconName="Send"
                      iconPosition="right"
                      className="flex-1"
                    >
                      Use this response
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Copy"
                      className="sm:w-auto"
                    >
                      Copy
                    </Button>
                  </div>
                )}

                {suggestion?.confidence && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Icon name="Info" size={12} />
                    <span>Confidence: {Math.round(suggestion?.confidence * 100)}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;