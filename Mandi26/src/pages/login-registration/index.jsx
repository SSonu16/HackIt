import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import LanguageSelector from './components/LanguageSelector';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TrustBadges from './components/TrustBadges';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const LoginRegistration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const mockCredentials = {
    vendor: {
      mobile: '9876543210',
      email: 'vendor@mandi.com',
      password: 'vendor123'
    },
    buyer: {
      mobile: '9876543211',
      email: 'buyer@mandi.com',
      password: 'buyer123'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  const handleLogin = (formData) => {
    const { identifier, password } = formData;

    let isValid = false;
    let userRole = null;

    Object.entries(mockCredentials)?.forEach(([role, creds]) => {
      if ((identifier === creds?.mobile || identifier === creds?.email) && password === creds?.password) {
        isValid = true;
        userRole = role;
      }
    });

    if (isValid) {
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('authToken', 'mock-token-' + Date.now());

      const dashboardPath = userRole === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard';
      navigate(dashboardPath);
    } else {
      setSuccessMessage(selectedLanguage === 'hi' ? 'अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।\nविक्रेता: 9876543210 / vendor@mandi.com / vendor123\nखरीदार: 9876543211 / buyer@mandi.com / buyer123' : 'Invalid credentials. Please try again.\nVendor: 9876543210 / vendor@mandi.com / vendor123\nBuyer: 9876543211 / buyer@mandi.com / buyer123'
      );
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  const handleRegister = (formData) => {
    const { role, otp } = formData;
    const expectedOtp = mockCredentials?.[role]?.otp || '123456';

    if (otp === expectedOtp) {
      localStorage.setItem('userRole', role);
      localStorage.setItem('authToken', 'mock-token-' + Date.now());

      setSuccessMessage(selectedLanguage === 'hi' ? 'पंजीकरण सफल! डैशबोर्ड पर रीडायरेक्ट किया जा रहा है...' : 'Registration successful! Redirecting to dashboard...'
      );
      setShowSuccessMessage(true);

      setTimeout(() => {
        const dashboardPath = role === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard';
        navigate(dashboardPath);
      }, 2000);
    } else {
      setSuccessMessage(selectedLanguage === 'hi' ?
      `अमान्य OTP। कृपया पुनः प्रयास करें।\nसही OTP: ${expectedOtp}` :
      `Invalid OTP. Please try again.\nCorrect OTP: ${expectedOtp}`
      );
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  const translations = {
    en: {
      login: 'Login',
      register: 'Register',
      tagline: 'Breaking Language Barriers in Agricultural Trade',
      features: [
      'Real-time multilingual chat',
      'AI-powered price discovery',
      'Voice-to-text support',
      'Secure transactions']

    },
    hi: {
      login: 'लॉगिन',
      register: 'पंजीकरण',
      tagline: 'कृषि व्यापार में भाषा बाधाओं को तोड़ना',
      features: [
      'रीयल-टाइम बहुभाषी चैट',
      'AI-संचालित मूल्य खोज',
      'वॉयस-टू-टेक्स्ट समर्थन',
      'सुरक्षित लेनदेन']

    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  return (
    <div className="min-h-screen bg-background">
      {showSuccessMessage &&
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-toast max-w-md w-full mx-4">
          <div className="bg-card border border-border rounded-lg shadow-xl p-4 flex items-start gap-3">
            <Icon name="AlertCircle" size={24} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground whitespace-pre-line flex-1">{successMessage}</p>
            <button
            onClick={() => setShowSuccessMessage(false)}
            className="text-muted-foreground hover:text-foreground transition-smooth">

              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      }
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Sprout" size={32} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Multilingual Mandi
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  {t?.tagline}
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1a2e6a285-1765355814813.png"
                  alt="Indian farmer in traditional white kurta examining fresh green vegetables at local agricultural market with wooden crates"
                  className="w-full h-96 object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-4">
                    {selectedLanguage === 'hi' ? 'प्रमुख विशेषताएं' : 'Key Features'}
                  </h3>
                  <ul className="space-y-2">
                    {t?.features?.map((feature, index) =>
                    <li key={index} className="flex items-center gap-2 text-sm md:text-base">
                        <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8 lg:p-10">
              <div className="flex justify-end mb-6">
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                  isOpen={isLanguageDropdownOpen}
                  onToggle={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} />

              </div>

              <div className="flex gap-2 mb-6 md:mb-8 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-3 rounded-md text-sm md:text-base font-semibold transition-smooth ${
                  activeTab === 'login' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`
                  }>

                  {t?.login}
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-3 rounded-md text-sm md:text-base font-semibold transition-smooth ${
                  activeTab === 'register' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`
                  }>

                  {t?.register}
                </button>
              </div>

              {activeTab === 'login' ?
              <LoginForm
                onSubmit={handleLogin}
                onSwitchToRegister={() => setActiveTab('register')}
                onForgotPassword={() => setIsForgotPasswordOpen(true)}
                selectedLanguage={selectedLanguage} /> :


              <RegisterForm
                onSubmit={handleRegister}
                onSwitchToLogin={() => setActiveTab('login')}
                selectedLanguage={selectedLanguage} />

              }

              <TrustBadges selectedLanguage={selectedLanguage} />
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        selectedLanguage={selectedLanguage} />

    </div>);

};

export default LoginRegistration;