import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, onSwitchToRegister, onForgotPassword, selectedLanguage }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to continue to Multilingual Mandi',
      identifier: 'Mobile Number or Email',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot Password?',
      loginButton: 'Sign In',
      noAccount: "Don\'t have an account?",
      register: 'Register Now',
      invalidCredentials: 'Invalid credentials. Please try again.'
    },
    hi: {
      title: 'वापस स्वागत है',
      subtitle: 'बहुभाषी मंडी में जारी रखने के लिए साइन इन करें',
      identifier: 'मोबाइल नंबर या ईमेल',
      password: 'पासवर्ड',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      loginButton: 'साइन इन करें',
      noAccount: 'खाता नहीं है?',
      register: 'अभी पंजीकरण करें',
      invalidCredentials: 'अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।'
    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.identifier?.trim()) {
      newErrors.identifier = 'This field is required';
    } else if (!/^[\d]{10}$/?.test(formData?.identifier) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.identifier)) {
      newErrors.identifier = 'Enter valid mobile number or email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        onSubmit({ ...formData, loginMethod: 'password' });
        setIsLoading(false);
      }, 1500);
    }
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
          label={t?.identifier}
          type="text"
          placeholder="9876543210 or email@example.com"
          value={formData?.identifier}
          onChange={(e) => setFormData({ ...formData, identifier: e?.target?.value })}
          error={errors?.identifier}
          required
        />

        <div className="relative">
          <Input
            label={t?.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <Checkbox
            label={t?.rememberMe}
            checked={formData?.rememberMe}
            onChange={(e) => setFormData({ ...formData, rememberMe: e?.target?.checked })}
          />
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:underline font-medium"
          >
            {t?.forgotPassword}
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
          size="lg"
        >
          {t?.loginButton}
        </Button>

        <div className="text-center text-sm md:text-base">
          <span className="text-muted-foreground">{t?.noAccount} </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:underline font-semibold"
          >
            {t?.register}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;