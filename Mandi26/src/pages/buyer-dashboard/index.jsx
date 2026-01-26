import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import VoiceSearchBar from './components/VoiceSearchBar';
import CategoryChips from './components/CategoryChips';
import ProductCard from './components/ProductCard';
import VendorCard from './components/VendorCard';
import NegotiationCard from './components/NegotiationCard';
import ActivityFeed from './components/ActivityFeed';
import Icon from '../../components/AppIcon';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('products');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const metricsData = [
  {
    icon: 'ShoppingCart',
    title: 'Active Orders',
    value: '12',
    subtitle: '3 pending delivery',
    trend: 'up',
    trendValue: '+2',
    color: 'primary'
  },
  {
    icon: 'Store',
    title: 'Saved Vendors',
    value: '28',
    subtitle: '5 new this week',
    trend: 'up',
    trendValue: '+5',
    color: 'success'
  },
  {
    icon: 'Handshake',
    title: 'Negotiations',
    value: '7',
    subtitle: '4 awaiting response',
    trend: null,
    trendValue: null,
    color: 'warning'
  },
  {
    icon: 'TrendingUp',
    title: 'Monthly Spend',
    value: '₹45,680',
    subtitle: 'Last 30 days',
    trend: 'down',
    trendValue: '-8%',
    color: 'accent'
  }];


  const categories = [
  { id: 'all', label: 'All Products', icon: 'Grid3x3', count: 0 },
  { id: 'vegetables', label: 'Vegetables', icon: 'Carrot', count: 156 },
  { id: 'fruits', label: 'Fruits', icon: 'Apple', count: 89 },
  { id: 'grains', label: 'Grains', icon: 'Wheat', count: 67 },
  { id: 'dairy', label: 'Dairy', icon: 'Milk', count: 34 },
  { id: 'spices', label: 'Spices', icon: 'Flame', count: 45 }];


  const recommendedProducts = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    description: 'Premium quality red tomatoes, freshly harvested from organic farms in Maharashtra',
    image: "https://images.unsplash.com/photo-1618807543816-96d6df00de29",
    imageAlt: 'Fresh red organic tomatoes arranged in wooden crate with green leaves visible in bright natural lighting',
    price: 45,
    marketRate: 60,
    unit: 'kg',
    rating: 4.8,
    reviews: 234,
    vendorName: 'Ramesh Kumar',
    vendorId: 'v1',
    vendorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13ece6189-1763298625917.png",
    vendorAvatarAlt: 'Professional headshot of middle-aged Indian farmer with warm smile wearing white kurta and turban',
    location: 'Pune, Maharashtra',
    isNew: true,
    discount: 25
  },
  {
    id: 2,
    name: 'Premium Basmati Rice',
    description: 'Aged basmati rice with long grains and aromatic fragrance, perfect for biryani and pulao',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10af64a72-1766591991644.png",
    imageAlt: 'White basmati rice grains spread on dark wooden surface showing long grain texture and quality',
    price: 85,
    marketRate: 95,
    unit: 'kg',
    rating: 4.9,
    reviews: 567,
    vendorName: 'Suresh Patel',
    vendorId: 'v2',
    vendorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_180f58fed-1763294758256.png",
    vendorAvatarAlt: 'Professional portrait of elderly Indian grain merchant with grey beard wearing traditional white dhoti',
    location: 'Amritsar, Punjab',
    isNew: false,
    discount: null
  },
  {
    id: 3,
    name: 'Fresh Green Spinach',
    description: 'Crisp and fresh spinach leaves, rich in iron and vitamins, harvested daily',
    image: "https://images.unsplash.com/photo-1695225970590-df52572fa1d5",
    imageAlt: 'Vibrant green spinach leaves freshly washed with water droplets visible in natural morning light',
    price: 30,
    marketRate: 40,
    unit: 'kg',
    rating: 4.7,
    reviews: 189,
    vendorName: 'Lakshmi Devi',
    vendorId: 'v3',
    vendorAvatar: "https://images.unsplash.com/photo-1735331467260-0153c5fbd31d",
    vendorAvatarAlt: 'Smiling Indian woman farmer in colorful saree with traditional jewelry standing in vegetable field',
    location: 'Nashik, Maharashtra',
    isNew: true,
    discount: 25
  },
  {
    id: 4,
    name: 'Alphonso Mangoes',
    description: 'King of mangoes - sweet, juicy Alphonso mangoes from Ratnagiri, premium quality',
    image: "https://images.unsplash.com/photo-1550825570-8ae96cf12d87",
    imageAlt: 'Golden yellow Alphonso mangoes arranged in basket with green leaves showing ripe texture and color',
    price: 180,
    marketRate: 220,
    unit: 'dozen',
    rating: 5.0,
    reviews: 892,
    vendorName: 'Ganesh Naik',
    vendorId: 'v4',
    vendorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11bda3af7-1763295389712.png",
    vendorAvatarAlt: 'Professional photo of Indian mango farmer with mustache wearing casual shirt in orchard setting',
    location: 'Ratnagiri, Maharashtra',
    isNew: false,
    discount: 18
  }];


  const preferredVendors = [
  {
    id: 'v1',
    name: 'Ramesh Kumar Farms',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13ece6189-1763298625917.png",
    avatarAlt: 'Professional headshot of middle-aged Indian farmer with warm smile wearing white kurta and turban',
    location: 'Pune, Maharashtra',
    rating: 4.8,
    totalProducts: 45,
    totalOrders: 234,
    responseTime: '2h',
    successRate: 98,
    specialties: ['Vegetables', 'Fruits', 'Organic'],
    isFavorite: true
  },
  {
    id: 'v2',
    name: 'Suresh Patel Grains',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_180f58fed-1763294758256.png",
    avatarAlt: 'Professional portrait of elderly Indian grain merchant with grey beard wearing traditional white dhoti',
    location: 'Amritsar, Punjab',
    rating: 4.9,
    totalProducts: 28,
    totalOrders: 567,
    responseTime: '1h',
    successRate: 99,
    specialties: ['Rice', 'Wheat', 'Pulses', 'Grains'],
    isFavorite: true
  },
  {
    id: 'v3',
    name: 'Lakshmi Devi Organics',
    avatar: "https://images.unsplash.com/photo-1735331467260-0153c5fbd31d",
    avatarAlt: 'Smiling Indian woman farmer in colorful saree with traditional jewelry standing in vegetable field',
    location: 'Nashik, Maharashtra',
    rating: 4.7,
    totalProducts: 67,
    totalOrders: 189,
    responseTime: '3h',
    successRate: 96,
    specialties: ['Organic Vegetables', 'Leafy Greens'],
    isFavorite: false
  }];


  const activeNegotiations = [
  {
    id: 'n1',
    productName: 'Fresh Organic Tomatoes',
    productImage: "https://images.unsplash.com/photo-1618807543816-96d6df00de29",
    productImageAlt: 'Fresh red organic tomatoes arranged in wooden crate with green leaves visible in bright natural lighting',
    vendorName: 'Ramesh Kumar',
    yourOffer: 42,
    vendorPrice: 45,
    aiSuggestion: 43,
    quantity: 100,
    unit: 'kg',
    status: 'counter',
    lastUpdated: '2h ago'
  },
  {
    id: 'n2',
    productName: 'Premium Basmati Rice',
    productImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10af64a72-1766591991644.png",
    productImageAlt: 'White basmati rice grains spread on dark wooden surface showing long grain texture and quality',
    vendorName: 'Suresh Patel',
    yourOffer: 80,
    vendorPrice: 85,
    aiSuggestion: 82,
    quantity: 500,
    unit: 'kg',
    status: 'pending',
    lastUpdated: '5h ago'
  },
  {
    id: 'n3',
    productName: 'Alphonso Mangoes',
    productImage: "https://images.unsplash.com/photo-1550825570-8ae96cf12d87",
    productImageAlt: 'Golden yellow Alphonso mangoes arranged in basket with green leaves showing ripe texture and color',
    vendorName: 'Ganesh Naik',
    yourOffer: 175,
    vendorPrice: 180,
    aiSuggestion: null,
    quantity: 50,
    unit: 'dozen',
    status: 'accepted',
    lastUpdated: '1d ago'
  }];


  const recentActivities = [
  {
    id: 'a1',
    type: 'order',
    title: 'Order Delivered',
    description: 'Your order of Fresh Organic Tomatoes (50kg) has been delivered successfully',
    time: '30m ago',
    image: "https://images.unsplash.com/photo-1618807543816-96d6df00de29",
    imageAlt: 'Fresh red organic tomatoes arranged in wooden crate with green leaves visible in bright natural lighting',
    metadata: '50kg delivered'
  },
  {
    id: 'a2',
    type: 'message',
    title: 'New Message from Suresh Patel',
    description: 'मैं आपको प्रीमियम बासमती चावल के लिए विशेष मूल्य दे सकता हूं',
    time: '1h ago',
    vendorId: 'v2',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_180f58fed-1763294758256.png",
    imageAlt: 'Professional portrait of elderly Indian grain merchant with grey beard wearing traditional white dhoti',
    metadata: null
  },
  {
    id: 'a3',
    type: 'vendor',
    title: 'New Vendor Available',
    description: 'Ganesh Naik Mangoes is now available in your area with premium Alphonso mangoes',
    time: '3h ago',
    vendorId: 'v4',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11bda3af7-1763295389712.png",
    imageAlt: 'Professional photo of Indian mango farmer with mustache wearing casual shirt in orchard setting',
    metadata: 'Ratnagiri, Maharashtra'
  },
  {
    id: 'a4',
    type: 'negotiation',
    title: 'Counter Offer Received',
    description: 'Ramesh Kumar has sent a counter offer for your bulk tomato order',
    time: '5h ago',
    image: "https://images.unsplash.com/photo-1618807543816-96d6df00de29",
    imageAlt: 'Fresh red organic tomatoes arranged in wooden crate with green leaves visible in bright natural lighting',
    metadata: '₹43/kg suggested'
  },
  {
    id: 'a5',
    type: 'order',
    title: 'Order Confirmed',
    description: 'Your order of Premium Basmati Rice (200kg) has been confirmed and will be shipped tomorrow',
    time: '1d ago',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10af64a72-1766591991644.png",
    imageAlt: 'White basmati rice grains spread on dark wooden surface showing long grain texture and quality',
    metadata: '200kg confirmed'
  }];


  const handleSearch = (query) => {
    navigate('/product-catalog', { state: { searchQuery: query } });
  };

  const handleViewAllProducts = () => {
    navigate('/product-catalog');
  };

  const handleViewAllVendors = () => {
    navigate('/product-catalog', { state: { view: 'vendors' } });
  };

  const handleViewAllNegotiations = () => {
    navigate('/chat-conversation', { state: { view: 'negotiations' } });
  };

  const handleViewAllOrders = () => {
    navigate('/order-management');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Welcome Back, Buyer
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Discover quality products and connect with trusted vendors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {metricsData?.map((metric, index) =>
            <MetricsCard key={index} {...metric} />
            )}
          </div>

          <div className="mb-6 md:mb-8">
            <VoiceSearchBar
              onSearch={handleSearch}
              placeholder="Search products in any language..." />

          </div>

          <div className="mb-6 md:mb-8">
            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory} />

          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`
                  px-4 py-2 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-base whitespace-nowrap transition-smooth flex-shrink-0
                  ${activeTab === 'products' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}
                `
                }>

                Recommended Products
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`
                  px-4 py-2 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-base whitespace-nowrap transition-smooth flex-shrink-0
                  ${activeTab === 'vendors' ?
                'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}
                `
                }>

                Preferred Vendors
              </button>
              <button
                onClick={() => setActiveTab('negotiations')}
                className={`
                  px-4 py-2 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-base whitespace-nowrap transition-smooth flex-shrink-0
                  ${activeTab === 'negotiations' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}
                `
                }>

                Active Negotiations
              </button>
            </div>

            {activeTab === 'products' &&
            <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Recommended for You
                  </h2>
                  <button
                  onClick={handleViewAllProducts}
                  className="flex items-center gap-2 text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth">

                    View All
                    <Icon name="ArrowRight" size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {recommendedProducts?.map((product) =>
                <ProductCard key={product?.id} product={product} />
                )}
                </div>
              </div>
            }

            {activeTab === 'vendors' &&
            <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Your Preferred Vendors
                  </h2>
                  <button
                  onClick={handleViewAllVendors}
                  className="flex items-center gap-2 text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth">

                    View All
                    <Icon name="ArrowRight" size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {preferredVendors?.map((vendor) =>
                <VendorCard key={vendor?.id} vendor={vendor} />
                )}
                </div>
              </div>
            }

            {activeTab === 'negotiations' &&
            <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Ongoing Negotiations
                  </h2>
                  <button
                  onClick={handleViewAllNegotiations}
                  className="flex items-center gap-2 text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth">

                    View All
                    <Icon name="ArrowRight" size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {activeNegotiations?.map((negotiation) =>
                <NegotiationCard key={negotiation?.id} negotiation={negotiation} />
                )}
                </div>
              </div>
            }
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Recent Activity
              </h2>
              <button
                onClick={handleViewAllOrders}
                className="flex items-center gap-2 text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth">

                View All
                <Icon name="ArrowRight" size={18} className="md:w-5 md:h-5" />
              </button>
            </div>
            <ActivityFeed activities={recentActivities} />
          </div>
        </div>
      </main>
    </div>);

};

export default BuyerDashboard;