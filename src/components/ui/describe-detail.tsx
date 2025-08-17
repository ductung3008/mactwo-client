'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProductDescription from './product-description';
import ProductDetail from './product-detail';
import Specifications from './specifications';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('specs');
  const t = useTranslations('productDetail');

  const tabs = [
    { key: 'description', label: t('productDescription') },
    { key: 'specs', label: t('productSpecifications') },
    { key: 'details', label: t('customerReviews') },
    { key: 'compare', label: t('productComparison') },
    { key: 'qa', label: t('productQA') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <ProductDescription />;
      case 'specs':
        return <Specifications />;
      case 'details':
        return <ProductDetail />;
      case 'compare':
        return (
          <p className='text-gray-700'>
            iPhone 14 Plus có thời lượng pin lâu hơn so với iPhone 13, camera
            tốt hơn và hiệu năng tương đương iPhone 14 Pro trong nhiều tác vụ
            thường ngày.
          </p>
        );
      case 'qa':
        return (
          <div className='text-gray-700'>
            <p className='mb-2'>
              <strong>Hỏi:</strong> Máy có hỗ trợ eSIM không?
            </p>
            <p className='mb-4'>
              <strong>Đáp:</strong> Có, hỗ trợ cả Nano SIM và eSIM.
            </p>

            <p className='mb-2'>
              <strong>Hỏi:</strong> Bảo hành bao lâu?
            </p>
            <p>
              <strong>Đáp:</strong> Chính hãng 12 tháng tại các trung tâm bảo
              hành Apple.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='mt-12'>
      {/* Tab Buttons */}
      <div className='mb-6 flex flex-wrap justify-center gap-3'>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-md border px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === tab.key
                ? 'border-blue-500 bg-white text-blue-600'
                : 'border-gray-300 text-gray-700 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderContent()}
    </div>
  );
}
