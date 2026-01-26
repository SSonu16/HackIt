import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryChips = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories?.map((category) => (
        <button
          key={category?.id}
          onClick={() => onSelectCategory(category?.id)}
          className={`
            flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-smooth flex-shrink-0
            ${selectedCategory === category?.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-foreground hover:bg-muted/80'
            }
          `}
        >
          <Icon name={category?.icon} size={16} className="md:w-5 md:h-5" />
          <span>{category?.label}</span>
          {category?.count > 0 && (
            <span className={`
              px-2 py-0.5 rounded-full text-xs font-bold
              ${selectedCategory === category?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-foreground/10 text-foreground'
              }
            `}>
              {category?.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;