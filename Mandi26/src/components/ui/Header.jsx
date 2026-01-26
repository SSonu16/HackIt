import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('buyer');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notificationCounts, setNotificationCounts] = useState({
    messages: 3,
    orders: 2
  });

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard',
      icon: 'LayoutDashboard',
      roles: ['vendor', 'buyer']
    },
    {
      label: 'Products',
      path: '/product-catalog',
      icon: 'Package',
      roles: ['vendor', 'buyer']
    },
    {
      label: 'Messages',
      path: '/chat-conversation',
      icon: 'MessageSquare',
      badge: notificationCounts?.messages,
      roles: ['vendor', 'buyer']
    },
    {
      label: 'Orders',
      path: '/order-management',
      icon: 'ShoppingCart',
      badge: notificationCounts?.orders,
      roles: ['vendor', 'buyer']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    const savedRole = localStorage.getItem('userRole') || 'buyer';
    setUserRole(savedRole);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
      if (!event?.target?.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    setIsLanguageDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    navigate('/login-registration');
    setIsProfileDropdownOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const selectedLang = languages?.find(lang => lang?.code === selectedLanguage);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card shadow-md z-nav">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigation(userRole === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard')}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name="Sprout" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                Multilingual Mandi
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-2 ml-12">
              {filteredNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    relative px-6 py-2 rounded-md font-medium transition-smooth
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted hover:translate-hover'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                    {item?.badge > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-bold rounded-full flex items-center justify-center">
                        {item?.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="language-dropdown relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-smooth"
              >
                <span className="text-xl">{selectedLang?.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">
                  {selectedLang?.label}
                </span>
                <Icon name="ChevronDown" size={16} />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover rounded-md shadow-lg border border-border z-dropdown">
                  {languages?.map((lang) => (
                    <button
                      key={lang?.code}
                      onClick={() => handleLanguageChange(lang?.code)}
                      className={`
                        w-full px-4 py-3 flex items-center gap-3 text-left transition-smooth
                        ${selectedLanguage === lang?.code
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-popover-foreground'
                        }
                      `}
                    >
                      <span className="text-xl">{lang?.flag}</span>
                      <span className="text-sm font-medium">{lang?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-dropdown relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-smooth"
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {userRole === 'vendor' ? 'V' : 'B'}
                </div>
                <Icon name="ChevronDown" size={16} className="hidden sm:block" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover rounded-md shadow-lg border border-border z-dropdown">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-popover-foreground">
                      {userRole === 'vendor' ? 'Vendor Account' : 'Buyer Account'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      user@example.com
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-muted transition-smooth text-popover-foreground"
                  >
                    <Icon name="Settings" size={18} />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-muted transition-smooth text-error"
                  >
                    <Icon name="LogOut" size={18} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-card z-nav lg:hidden">
          <nav className="flex flex-col p-6 gap-2">
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  relative px-6 py-4 rounded-md font-medium transition-smooth text-left
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item?.icon} size={24} />
                  <span className="text-lg">{item?.label}</span>
                  {item?.badge > 0 && (
                    <span className="ml-auto w-6 h-6 bg-error text-error-foreground text-sm font-bold rounded-full flex items-center justify-center">
                      {item?.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;