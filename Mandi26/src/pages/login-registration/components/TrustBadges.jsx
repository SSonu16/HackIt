import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = ({ selectedLanguage }) => {
  const translations = {
    en: {
      secureAuth: 'Secure Authentication',
      govtCertified: 'Govt. Certified Platform',
      dataProtection: 'Data Protection Compliant',
      trustedBy: 'Trusted by 50,000+ farmers & traders'
    },
    hi: {
      secureAuth: 'सुरक्षित प्रमाणीकरण',
      govtCertified: 'सरकारी प्रमाणित मंच',
      dataProtection: 'डेटा सुरक्षा अनुपालन',
      trustedBy: '50,000+ किसानों और व्यापारियों द्वारा विश्वसनीय'
    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  const badges = [
    {
      icon: 'Shield',
      label: t?.secureAuth,
      color: 'text-success'
    },
    {
      icon: 'Award',
      label: t?.govtCertified,
      color: 'text-primary'
    },
    {
      icon: 'Lock',
      label: t?.dataProtection,
      color: 'text-accent'
    }
  ];

  return (
    <div className="mt-6 md:mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {badges?.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 md:p-4 bg-card rounded-md border border-border"
          >
            <div className={${badge?.color}}>
              <Icon name={badge?.icon} size={24} />
            </div>
            <span className="text-xs md:text-sm font-medium text-foreground">
              {badge?.label}
            </span>
          </div>
        ))}
      </div>
      <div className="text-center p-4 bg-primary/5 rounded-md border border-primary/20">
        <p className="text-sm md:text-base font-medium text-foreground flex items-center justify-center gap-2">
          <Icon name="Users" size={20} className="text-primary" />
          {t?.trustedBy}
        </p>
      </div>
    </div>
  );
};

export default TrustBadges;