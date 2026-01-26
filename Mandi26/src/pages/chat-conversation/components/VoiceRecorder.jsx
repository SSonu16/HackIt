import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceRecorder = ({ onSend, onCancel, isTranscribing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState([]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
        setWaveformData((prev) => [
          ...prev?.slice(-19),
          Math.random() * 40 + 10
        ]);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setDuration(0);
    setWaveformData([]);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleSend = () => {
    onSend({ duration: formatDuration(Math.floor(duration / 10)), waveform: waveformData });
    setIsRecording(false);
    setDuration(0);
    setWaveformData([]);
  };

  const handleCancel = () => {
    setIsRecording(false);
    setDuration(0);
    setWaveformData([]);
    onCancel();
  };

  return (
    <div className="bg-card border-t border-border p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {!isRecording && duration === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleStartRecording}
              className="w-16 h-16 md:w-20 md:h-20 bg-error hover:bg-error/90 rounded-full flex items-center justify-center transition-smooth shadow-lg active:scale-press"
              aria-label="Start recording"
            >
              <Icon name="Mic" size={32} color="var(--color-error-foreground)" className="md:w-10 md:h-10" />
            </button>
            <p className="text-sm md:text-base text-muted-foreground text-center">
              Tap to start voice recording
            </p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                {isRecording && (
                  <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
                )}
                <span className="text-lg md:text-xl font-mono font-semibold text-foreground">
                  {formatDuration(Math.floor(duration / 10))}
                </span>
              </div>
            </div>

            <div className="h-20 md:h-24 flex items-center justify-center gap-1 bg-muted/30 rounded-lg px-4">
              {waveformData?.map((height, index) => (
                <div
                  key={index}
                  className="w-1 md:w-1.5 bg-primary rounded-full transition-all"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>

            {isTranscribing && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-75" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-150" />
                  </div>
                  <span className="text-sm md:text-base text-foreground">
                    Transcribing your message...
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
                className="flex-1"
              >
                Cancel
              </Button>

              {isRecording ? (
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleStopRecording}
                  iconName="Square"
                  iconPosition="left"
                  className="flex-1"
                >
                  Stop Recording
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSend}
                  iconName="Send"
                  iconPosition="right"
                  className="flex-1"
                  disabled={isTranscribing}
                >
                  Send Voice Message
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;