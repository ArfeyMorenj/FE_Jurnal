import React from 'react'
import BannerLanding from '../../../components/BannerLanding'
import PreviewNews from '../section/PreviewNews';
import NewsList from '../section/NewsList';
import { useRef } from 'react';
import { SECTION_IDS } from '../../../constants/sections';
import { useHero } from '../../admin/beranda/hooks/useHero';
import LoadingSpinner from '../../../components/LoadingSpinner';

const SECTION_ID = SECTION_IDS.BERITA;

const News = () => {
  const newsRef = useRef(null);
  const { heroes, loading: loadingHeroes } = useHero(SECTION_ID);

  const scrollToNews = () => {
    newsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  if (loadingHeroes) return <LoadingSpinner />
  return (
    <div className='mt-5'>
      <BannerLanding
        title={heroes.length > 0 ? heroes[0].title : "Selamat Datang di Ruang Berita Mijurnal"}
        description={heroes.length > 0 ? heroes[0].description : "Jelajahi berbagai artikel dan berita yang menarik untuk dibaca!"}
        onButtonClick={scrollToNews}
        buttonText={
          heroes.length > 0
            ? heroes[0].button_link || "Baca Berita"
            : "Baca Berita"
        }
        imageSrc={heroes.length > 0 ? heroes[0].image : "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"}
        reverse={false}
      />
      <PreviewNews />
      <div ref={newsRef}>
        <NewsList />
      </div>
    </div>
  )
}

export default News
