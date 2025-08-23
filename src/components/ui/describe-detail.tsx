'use client';

import { Product } from '@/lib/api/products.api';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProductDescription from './product-description';
import Specifications from './specifications';

interface ProductTabsProps {
  product: Product | null;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('specs');
  const t = useTranslations('productDetail');

  const tabs = [
    { key: 'description', label: t('productDescription') },
    { key: 'specs', label: t('productSpecifications') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <ProductDescription product={product} />;
      case 'specs':
        return <Specifications product={product} />;
      default:
        return null;
    }
  };

  return (
    <div className='mx-auto mt-16 w-full max-w-6xl px-4'>
      {/* Tab Navigation */}
      <div className='relative mb-8'>
        <div className='flex items-center justify-center space-x-1 rounded-xl bg-gray-50 p-1 shadow-sm'>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative transform rounded-lg px-8 py-3 text-sm font-semibold transition-all duration-300 ease-in-out ${
                activeTab === tab.key
                  ? 'scale-105 border border-blue-100 bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:bg-white/50 hover:text-blue-500'
              }`}
            >
              {tab.label}
              {/* Active indicator */}
              {activeTab === tab.key && (
                <div className='absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 transform rounded-full bg-blue-500' />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className='min-h-[400px] rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
        <div className='transform transition-all duration-500 ease-in-out'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
