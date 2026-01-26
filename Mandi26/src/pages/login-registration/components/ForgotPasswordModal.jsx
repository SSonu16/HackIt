import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose, selectedLanguage }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your mobile number to receive OTP',
      mobile: 'Mobile Number',
      otp: 'Enter OTP',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      sendOtp: 'Send OTP',
      verifyOtp: 'Verify OTP',
      resetPassword: 'Reset Password',
      cancel: 'Cancel',
      success: 'Password reset successfully!'
    },
    hi: {
      title: 'पासवर्ड रीसेट करें',
      subtitle: 'OTP प्राप्त करने के लिए अपना मोबाइल नंबर दर्ज करें',
      mobile: 'मोबाइल नंबर',
      otp: 'OTP दर्ज करें',
      newPassword: 'नया पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      sendOtp: 'OTP भेजें',
      verifyOtp: 'OTP सत्यापित करें',
      resetPassword: 'पासवर्ड रीसेट करें',
      cancel: 'रद्द करें',
      success: 'पासवर्ड सफलतापूर्वक रीसेट किया गया!'
    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  const handleSendOtp = () => {
    if (!mobile || !/^[\d]{10}$/?.test(mobile)) {
      setErrors({ mobile: 'Enter valid 10-digit mobile number' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setStep(2);
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp?.length !== 6) {
      setErrors({ otp: 'Enter valid 6-digit OTP' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 1000);
  };

  const handleResetPassword = () => {
    const newErrors = {};
    if (!newPassword || newPassword?.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setStep(1);
      setMobile('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-card rounded-lg shadow-2xl w-full max-w-md p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
            {t?.title}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">{t?.subtitle}</p>
            <Input
              label={t?.mobile}
              type="tel"
              placeholder="9876543210"
              value={mobile}
              onChange={(e) => setMobile(e?.target?.value?.replace(/\D/g, '')?.slice(0, 10))}
              error={errors?.mobile}
              maxLength={10}
            />
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={onClose}>
                {t?.cancel}
              </Button>
              <Button variant="default" fullWidth onClick={handleSendOtp} loading={isLoading}>
                {t?.sendOtp}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Input
              label={t?.otp}
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
              error={errors?.otp}
              maxLength={6}
            />
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setStep(1)}>
                {t?.cancel}
              </Button>
              <Button variant="default" fullWidth onClick={handleVerifyOtp} loading={isLoading}>
                {t?.verifyOtp}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Input
              label={t?.newPassword}
              type="password"
              placeholder="Min 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e?.target?.value)}
              error={errors?.newPassword}
            />
            <Input
              label={t?.confirmPassword}
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e?.target?.value)}
              error={errors?.confirmPassword}
            />
            <Button variant="default" fullWidth onClick={handleResetPassword} loading={isLoading}>
              {t?.resetPassword}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;