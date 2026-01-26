import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ icon, title, value, subtitle, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    accent: 'bg-accent/10 text-accent'
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border hover:shadow-md transition-smooth">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center ${colorClasses?.[color]}`}>
          <Icon name={icon} size={20} className="md:w-6 md:h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} className="md:w-4 md:h-4" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 data-text">{value}</h3>
        <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;