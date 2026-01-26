import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorCard = ({ vendor }) => {
  const navigate = useNavigate();

  const handleMessageVendor = () => {
    navigate('/chat-conversation', { state: { vendorId: vendor?.id } });
  };

  const handleViewProducts = () => {
    navigate('/product-catalog', { state: { vendorId: vendor?.id } });
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-5 border border-border hover:shadow-md transition-smooth">
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={vendor?.avatar}
            alt={vendor?.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 truncate">
            {vendor?.name}
          </h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-2">
            <Icon name="MapPin" size={14} className="md:w-4 md:h-4 flex-shrink-0" />
            <span className="truncate">{vendor?.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="md:w-4 md:h-4 fill-warning text-warning" />
              <span className="text-xs md:text-sm font-medium">{vendor?.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs md:text-sm text-muted-foreground">{vendor?.totalProducts} products</span>
          </div>
        </div>
        <button
          className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md hover:bg-muted transition-smooth"
          aria-label="Add to favorites"
        >
          <Icon name={vendor?.isFavorite ? 'Heart' : 'Heart'} size={18} className={vendor?.isFavorite ? 'fill-error text-error' : ''} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {vendor?.specialties?.slice(0, 3)?.map((specialty, index) => (
          <span
            key={index}
            className="px-2 py-1 md:px-3 md:py-1.5 bg-primary/10 text-primary text-xs md:text-sm rounded-md font-medium"
          >
            {specialty}
          </span>
        ))}
        {vendor?.specialties?.length > 3 && (
          <span className="px-2 py-1 md:px-3 md:py-1.5 bg-muted text-muted-foreground text-xs md:text-sm rounded-md font-medium">
            +{vendor?.specialties?.length - 3} more
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 p-3 bg-muted/50 rounded-md">
        <div className="text-center">
          <p className="text-base md:text-lg lg:text-xl font-bold text-foreground data-text">{vendor?.totalOrders}</p>
          <p className="text-xs text-muted-foreground">Orders</p>
        </div>
        <div className="text-center border-l border-r border-border">
          <p className="text-base md:text-lg lg:text-xl font-bold text-foreground data-text">{vendor?.responseTime}</p>
          <p className="text-xs text-muted-foreground">Response</p>
        </div>
        <div className="text-center">
          <p className="text-base md:text-lg lg:text-xl font-bold text-success data-text">{vendor?.successRate}%</p>
          <p className="text-xs text-muted-foreground">Success</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewProducts}
          className="flex-1"
        >
          View Products
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          onClick={handleMessageVendor}
          className="flex-1"
        >
          Message
        </Button>
      </div>
    </div>
  );
};

export default VendorCard;