import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleMessageVendor = () => {
    navigate('/chat-conversation', { state: { vendorId: product?.vendorId } });
  };

  const handleViewDetails = () => {
    navigate('/product-catalog', { state: { productId: product?.id } });
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-smooth">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-smooth"
        />
        {product?.isNew && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-success text-success-foreground text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-md">
            New
          </span>
        )}
        {product?.discount && (
          <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-error text-error-foreground text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-md">
            -{product?.discount}%
          </span>
        )}
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground line-clamp-2 flex-1">
            {product?.name}
          </h3>
          <button
            className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md hover:bg-muted transition-smooth"
            aria-label="Add to favorites"
          >
            <Icon name="Heart" size={18} className="md:w-5 md:h-5" />
          </button>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3">
          {product?.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Icon name="Star" size={14} className="md:w-4 md:h-4 fill-warning text-warning" />
            <span className="text-xs md:text-sm font-medium text-foreground">{product?.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product?.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={product?.vendorAvatar}
              alt={product?.vendorAvatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium text-foreground truncate">{product?.vendorName}</p>
            <p className="text-xs text-muted-foreground truncate">{product?.location}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-primary data-text">
              ₹{product?.price?.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-muted-foreground">per {product?.unit}</p>
          </div>
          {product?.marketRate && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground line-through">₹{product?.marketRate?.toLocaleString('en-IN')}</p>
              <p className="text-xs text-success font-medium">Market rate</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
          >
            View Details
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
    </div>
  );
};

export default ProductCard;