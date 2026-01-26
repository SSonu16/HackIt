import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ConversationHeader from './components/ConversationHeader';
import MessageBubble from './components/MessageBubble';
import AIAssistantPanel from './components/AIAssistantPanel';
import VoiceRecorder from './components/VoiceRecorder';
import MessageInput from './components/MessageInput';
import OfflineIndicator from './components/OfflineIndicator';

const ChatConversation = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [pendingMessages, setPendingMessages] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const participant = {
    id: 'vendor_001',
    name: 'राजेश कुमार (Rajesh Kumar)',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_178fd24ab-1763293417052.png",
    avatarAlt: 'Middle-aged Indian farmer with mustache wearing white kurta and turban standing in agricultural field',
    isOnline: true,
    lastSeen: '2 minutes ago',
    role: 'vendor',
    location: 'Nashik, Maharashtra'
  };

  const [messages, setMessages] = useState([
  {
    id: 'msg_001',
    senderId: 'vendor_001',
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_178fd24ab-1763293417052.png",
    senderAvatarAlt: 'Middle-aged Indian farmer with mustache wearing white kurta and turban standing in agricultural field',
    type: 'text',
    content: 'नमस्ते! मेरे पास ताजा टमाटर उपलब्ध हैं। क्या आप रुचि रखते हैं?',
    translatedText: 'Hello! I have fresh tomatoes available. Are you interested?',
    originalLanguage: 'hi',
    translationConfidence: 0.95,
    timestamp: '10:30 AM',
    status: 'read',
    isTranslating: false
  },
  {
    id: 'msg_002',
    senderId: 'buyer_001',
    type: 'text',
    content: 'Yes, I am interested. What is your price per kg?',
    timestamp: '10:32 AM',
    status: 'read',
    isTranslating: false
  },
  {
    id: 'msg_003',
    senderId: 'vendor_001',
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_178fd24ab-1763293417052.png",
    senderAvatarAlt: 'Middle-aged Indian farmer with mustache wearing white kurta and turban standing in agricultural field',
    type: 'product',
    product: {
      name: 'Fresh Red Tomatoes',
      image: "https://images.unsplash.com/photo-1618807543816-96d6df00de29",
      imageAlt: 'Pile of bright red ripe tomatoes with green stems in wooden crate at farmers market',
      price: 35,
      unit: 'kg'
    },
    content: 'मेरा भाव ₹35 प्रति किलो है। न्यूनतम ऑर्डर 50 किलो।',
    translatedText: 'My price is ₹35 per kg. Minimum order 50 kg.',
    originalLanguage: 'hi',
    translationConfidence: 0.92,
    timestamp: '10:33 AM',
    status: 'read',
    isTranslating: false
  },
  {
    id: 'msg_004',
    senderId: 'buyer_001',
    type: 'voice',
    duration: '0:15',
    content: 'Can you do ₹32 per kg for 100 kg order?',
    timestamp: '10:35 AM',
    status: 'delivered',
    isTranslating: false
  }]
  );

  const [aiSuggestions, setAiSuggestions] = useState([
  {
    id: 'ai_001',
    type: 'price',
    message: 'Based on current market rates in Nashik, tomatoes are trading between ₹30-38 per kg. The vendor\'s price of ₹35/kg is fair for fresh produce.',
    marketRate: 34,
    unit: 'kg',
    priceRange: {
      min: 30,
      max: 38
    },
    confidence: 0.88
  },
  {
    id: 'ai_002',
    type: 'negotiation',
    message: 'Consider offering ₹33/kg for a 100kg order. This is a reasonable counter-offer that shows commitment while seeking better value.',
    suggestedResponse: 'I can offer ₹33 per kg for 100 kg. This is a bulk order and I am a regular buyer. Can we agree on this price?',
    confidence: 0.85
  }]
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'buyer_001',
      type: 'text',
      content,
      timestamp: new Date()?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'sent',
      isTranslating: true
    };

    setMessages([...messages, newMessage]);

    setTimeout(() => {
      setMessages((prev) =>
      prev?.map((msg) =>
      msg?.id === newMessage?.id ?
      { ...msg, status: 'delivered', isTranslating: false } :
      msg
      )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
      prev?.map((msg) =>
      msg?.id === newMessage?.id ?
      { ...msg, status: 'read' } :
      msg
      )
      );
    }, 2000);
  };

  const handleSendVoiceMessage = (voiceData) => {
    setIsTranscribing(true);

    setTimeout(() => {
      const newMessage = {
        id: `msg_${Date.now()}`,
        senderId: 'buyer_001',
        type: 'voice',
        duration: voiceData?.duration,
        content: 'Voice message transcription will appear here',
        timestamp: new Date()?.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'sent',
        isTranslating: false
      };

      setMessages([...messages, newMessage]);
      setIsTranscribing(false);
      setIsVoiceRecording(false);
    }, 2000);
  };

  const handlePlayAudio = (messageId) => {
    console.log('Playing audio for message:', messageId);
  };

  const handleTranslate = (messageId) => {
    setMessages((prev) =>
    prev?.map((msg) =>
    msg?.id === messageId ?
    { ...msg, isTranslating: true } :
    msg
    )
    );

    setTimeout(() => {
      setMessages((prev) =>
      prev?.map((msg) =>
      msg?.id === messageId ?
      {
        ...msg,
        translatedText: `[Translated] ${msg?.content}`,
        isTranslating: false,
        translationConfidence: 0.9
      } :
      msg
      )
      );
    }, 1500);
  };

  const handleAcceptSuggestion = (response) => {
    handleSendMessage(response);
    setShowAIAssistant(false);
  };

  const handleAttachment = (file) => {
    console.log('Attachment selected:', file?.name);
  };

  const handleProfileClick = () => {
    console.log('Navigate to vendor profile');
  };

  const handleVideoCall = () => {
    console.log('Starting video call');
  };

  const handleVoiceCall = () => {
    console.log('Starting voice call');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col mt-16">
        <ConversationHeader
          participant={participant}
          onBack={handleBack}
          onProfileClick={handleProfileClick}
          onVideoCall={handleVideoCall}
          onVoiceCall={handleVoiceCall} />


        <OfflineIndicator pendingMessages={pendingMessages} />

        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-xs md:text-sm text-muted-foreground">
                <span>Today</span>
              </div>
            </div>

            {messages?.map((message) =>
            <MessageBubble
              key={message?.id}
              message={message}
              isOwn={message?.senderId === 'buyer_001'}
              onPlayAudio={handlePlayAudio}
              onTranslate={handleTranslate} />

            )}

            {showAIAssistant &&
            <AIAssistantPanel
              suggestions={aiSuggestions}
              onAcceptSuggestion={handleAcceptSuggestion}
              onDismiss={() => setShowAIAssistant(false)} />

            }

            <div ref={messagesEndRef} />
          </div>
        </div>

        {isVoiceRecording ?
        <VoiceRecorder
          onSend={handleSendVoiceMessage}
          onCancel={() => setIsVoiceRecording(false)}
          isTranscribing={isTranscribing} /> :


        <MessageInput
          onSendMessage={handleSendMessage}
          onStartVoiceRecording={() => setIsVoiceRecording(true)}
          onAttachment={handleAttachment}
          disabled={false} />

        }
      </div>
    </div>);

};

export default ChatConversation;