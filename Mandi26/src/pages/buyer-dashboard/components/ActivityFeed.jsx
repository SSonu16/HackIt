import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return 'ShoppingCart';
      case 'message':
        return 'MessageSquare';
      case 'vendor':
        return 'Store';
      case 'negotiation':
        return 'Handshake';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order':
        return 'bg-success/10 text-success';
      case 'message':
        return 'bg-primary/10 text-primary';
      case 'vendor':
        return 'bg-accent/10 text-accent';
      case 'negotiation':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleActivityClick = (activity) => {
    switch (activity?.type) {
      case 'order': navigate('/order-management', { state: { orderId: activity?.id } });
        break;
      case 'message': navigate('/chat-conversation', { state: { vendorId: activity?.vendorId } });
        break;
      case 'vendor':
        navigate('/product-catalog', { state: { vendorId: activity?.vendorId } });
        break;
      case 'negotiation': navigate('/chat-conversation', { state: { negotiationId: activity?.id } });
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {activities?.map((activity) => (
        <div
          key={activity?.id}
          onClick={() => handleActivityClick(activity)}
          className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-lg border border-border hover:shadow-md transition-smooth cursor-pointer"
        >
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
            <Icon name={getActivityIcon(activity?.type)} size={20} className="md:w-6 md:h-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="text-sm md:text-base font-semibold text-foreground line-clamp-1">
                {activity?.title}
              </h4>
              <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                {activity?.time}
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2">
              {activity?.description}
            </p>
            {activity?.image && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={activity?.image}
                    alt={activity?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {activity?.metadata && (
                  <span className="text-xs text-muted-foreground">{activity?.metadata}</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;