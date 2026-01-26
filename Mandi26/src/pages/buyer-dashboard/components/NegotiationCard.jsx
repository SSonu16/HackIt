import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NegotiationCard = ({ negotiation }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'accepted':
        return 'bg-success/10 text-success';
      case 'counter':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'counter':
        return 'Counter Offer';
      default:
        return status;
    }
  };

  const handleContinueNegotiation = () => {
    navigate('/chat-conversation', { state: { negotiationId: negotiation?.id } });
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-5 border border-border hover:shadow-md transition-smooth">
      <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={negotiation?.productImage}
              alt={negotiation?.productImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 line-clamp-1">
              {negotiation?.productName}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground mb-2">
              with {negotiation?.vendorName}
            </p>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(negotiation?.status)}`}>
              <Icon name="Clock" size={12} />
              {getStatusLabel(negotiation?.status)}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Your Offer:</span>
          <span className="font-semibold text-foreground data-text">₹{negotiation?.yourOffer?.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Vendor Price:</span>
          <span className="font-semibold text-foreground data-text">₹{negotiation?.vendorPrice?.toLocaleString('en-IN')}</span>
        </div>
        {negotiation?.aiSuggestion && (
          <div className="flex items-center justify-between text-xs md:text-sm p-2 bg-primary/5 rounded-md border border-primary/20">
            <div className="flex items-center gap-1">
              <Icon name="Sparkles" size={14} className="text-primary" />
              <span className="text-primary font-medium">AI Suggests:</span>
            </div>
            <span className="font-semibold text-primary data-text">₹{negotiation?.aiSuggestion?.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-4 p-2 md:p-3 bg-muted/50 rounded-md">
        <div className="text-xs md:text-sm text-muted-foreground">
          Quantity: <span className="font-medium text-foreground data-text">{negotiation?.quantity} {negotiation?.unit}</span>
        </div>
        <div className="text-xs md:text-sm text-muted-foreground">
          Updated: <span className="font-medium text-foreground">{negotiation?.lastUpdated}</span>
        </div>
      </div>
      <Button
        variant="default"
        size="sm"
        iconName="MessageSquare"
        iconPosition="left"
        onClick={handleContinueNegotiation}
        fullWidth
      >
        Continue Negotiation
      </Button>
    </div>
  );
};

export default NegotiationCard;