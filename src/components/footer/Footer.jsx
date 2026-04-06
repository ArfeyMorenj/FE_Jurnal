import React from 'react'
import FooterHeader from './components/FooterHeader'
import FooterContent from './components/FooterContent'
import { useFooter } from '../../features/admin/beranda/hooks/useFooter'
import LoadingSpinner from '../LoadingSpinner';

const Footer = () => {
  const { footer, loading: loadingFooter } = useFooter();

  if (loadingFooter) return <LoadingSpinner />;

  if (!footer) {
    return (
      <div className="p-16 text-center text-gray-500">
        <p>Footer belum diatur.</p>
      </div>
    );
  }

  return (
    <div className='p-16 max-w-[1440px] mx-auto'>
      <hr className='border-t border-[#C1C7CD] my-6 md:my-12' />
      <FooterHeader footer={footer} />
      <hr className='my-6 md:my-6 border-none ' />
      <FooterContent footer={footer} />
      <hr className='border-t border-[#C1C7CD] my-6 md:my-12' />
      <div className="flex justify-center md:justify-start items-center text-sm inter">
        <p>MiJurnal @ 2025. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer
