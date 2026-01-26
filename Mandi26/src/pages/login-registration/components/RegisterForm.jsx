import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, onSwitchToLogin, selectedLanguage }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const translations = {
    en: {
      title: 'Create Account',
      subtitle: 'Join Multilingual Mandi today',
      fullName: 'Full Name',
      mobile: 'Mobile Number',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      role: 'I am a',
      vendor: 'Vendor (Farmer/Seller)',
      buyer: 'Buyer (Trader/Shopkeeper)',
      otp: 'Enter OTP',
      agreeTerms: 'I agree to Terms & Conditions and Privacy Policy',
      registerButton: 'Create Account',
      sendOtp: 'Send OTP',
      verifyOtp: 'Verify & Register',
      resendOtp: 'Resend OTP',
      playOtp: 'Play OTP',
      haveAccount: 'Already have an account?',
      login: 'Sign In',
      otpSentMessage: 'OTP sent to your mobile number',
      selectRole: 'Select your role'
    },
    hi: {
      title: 'खाता बनाएं',
      subtitle: 'आज ही बहुभाषी मंडी में शामिल हों',
      fullName: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      role: 'मैं हूँ',
      vendor: 'विक्रेता (किसान/विक्रेता)',
      buyer: 'खरीदार (व्यापारी/दुकानदार)',
      otp: 'OTP दर्ज करें',
      agreeTerms: 'मैं नियम और शर्तों और गोपनीयता नीति से सहमत हूं',
      registerButton: 'खाता बनाएं',
      sendOtp: 'OTP भेजें',
      verifyOtp: 'सत्यापित करें और पंजीकरण करें',
      resendOtp: 'OTP पुनः भेजें',
      playOtp: 'OTP सुनें',
      haveAccount: 'पहले से खाता है?',
      login: 'साइन इन करें',
      otpSentMessage: 'आपके मोबाइल नंबर पर OTP भेजा गया',
      selectRole: 'अपनी भूमिका चुनें'
    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  const roleOptions = [
    { value: 'vendor', label: t?.vendor },
    { value: 'buyer', label: t?.buyer }
  ];

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.mobile?.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[\d]{10}$/?.test(formData?.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Enter valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to terms and conditions';
    }

    if (otpSent && !otp) {
      newErrors.otp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSendOtp = () => {
    const mobileError = {};
    if (!formData?.mobile?.trim()) {
      mobileError.mobile = 'Enter mobile number to receive OTP';
    } else if (!/^[\d]{10}$/?.test(formData?.mobile)) {
      mobileError.mobile = 'Enter valid 10-digit mobile number';
    }

    if (Object.keys(mobileError)?.length > 0) {
      setErrors(mobileError);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtpTimer(60);
      setIsLoading(false);
    }, 1000);
  };

  const handlePlayOtp = () => {
    setIsPlayingVoice(true);
    const utterance = new SpeechSynthesisUtterance(Your OTP is ${otp.split('').join(' ')});
    utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
    utterance.onend = () => setIsPlayingVoice(false);
    window.speechSynthesis?.speak(utterance);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        onSubmit({ ...formData, otp });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleResendOtp = () => {
    setOtpTimer(60);
    setOtp('');
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
          {t?.title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          {t?.subtitle}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <Input
          label={t?.fullName}
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e?.target?.value })}
          error={errors?.fullName}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t?.mobile}
            type="tel"
            placeholder="9876543210"
            value={formData?.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e?.target?.value?.replace(/\D/g, '')?.slice(0, 10) })}
            error={errors?.mobile}
            required
            maxLength={10}
          />

          <Input
            label={t?.email}
            type="email"
            placeholder="your@email.com"
            value={formData?.email}
            onChange={(e) => setFormData({ ...formData, email: e?.target?.value })}
            error={errors?.email}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label={t?.password}
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 6 characters"
              value={formData?.password}
              onChange={(e) => setFormData({ ...formData, password: e?.target?.value })}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          <div className="relative">
            <Input
              label={t?.confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              value={formData?.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e?.target?.value })}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
        </div>

        <Select
          label={t?.role}
          placeholder={t?.selectRole}
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => setFormData({ ...formData, role: value })}
          error={errors?.role}
          required
        />

        {!otpSent ? (
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={handleSendOtp}
            loading={isLoading}
            iconName="Send"
            iconPosition="left"
          >
            {t?.sendOtp}
          </Button>
        ) : (
          <div className="space-y-3">
            <Input
              label={t?.otp}
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
              error={errors?.otp}
              required
              maxLength={6}
            />
            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <span className="text-success flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                {t?.otpSentMessage}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayOtp}
                  disabled={!otp || isPlayingVoice}
                  className="text-primary hover:underline font-medium flex items-center gap-1 disabled:opacity-50"
                >
                  <Icon name={isPlayingVoice ? 'Volume2' : 'Volume'} size={16} />
                  {t?.playOtp}
                </button>
                {otpTimer > 0 ? (
                  <span className="text-muted-foreground">
                    {otpTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-primary hover:underline font-medium"
                  >
                    {t?.resendOtp}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <Checkbox
          label={t?.agreeTerms}
          checked={formData?.agreeTerms}
          onChange={(e) => setFormData({ ...formData, agreeTerms: e?.target?.checked })}
          error={errors?.agreeTerms}
          required
        />

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="right"
          size="lg"
        >
          {otpSent ? t?.verifyOtp : t?.registerButton}
        </Button>

        <div className="text-center text-sm md:text-base">
          <span className="text-muted-foreground">{t?.haveAccount} </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-semibold"
          >
            {t?.login}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;