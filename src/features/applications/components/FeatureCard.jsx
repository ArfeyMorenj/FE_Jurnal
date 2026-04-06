import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { featureCardAnimations } from '../animations/featureCardAnimations';
import { FEATURE_CARD_CONSTANTS } from '../constants/featureCardConstants';

const FeatureCard = ({ 
  // Data dari backend
  title,                    // "Daftar Kelas"
  description,              // Deskripsi fitur
  appName = FEATURE_CARD_CONSTANTS.DEFAULT_APP_NAME,
  appNameColor = FEATURE_CARD_CONSTANTS.DEFAULT_APP_COLOR,
  backgroundColor,          // Warna background circle dari BE
  phoneImage = FEATURE_CARD_CONSTANTS.DEFAULT_PHONE_IMAGE,
  circleIcon,               // Icon lingkaran dari BE (nama Lucide icon)
  circleIconImage,          // Icon image URL dari BE
  circleIconText,           // Text di dalam circle icon
  buttonText = FEATURE_CARD_CONSTANTS.DEFAULT_BUTTON_TEXT,
  buttonColor,
  linkRoute,
  reverse = false
}) => {
  const [badgePosition, setBadgePosition] = useState(FEATURE_CARD_CONSTANTS.BADGE_POSITIONS[0]);

  useEffect(() => {
    // Random position saat component mount
    const randomIndex = Math.floor(Math.random() * FEATURE_CARD_CONSTANTS.BADGE_POSITIONS.length);
    setBadgePosition(FEATURE_CARD_CONSTANTS.BADGE_POSITIONS[randomIndex]);
  }, []);

  // Get icon component from Lucide
  const IconComponent = circleIcon && LucideIcons[circleIcon] ? LucideIcons[circleIcon] : null;

  // Animation variants
  // Menggunakan animasi dari file terpisah
  const containerVariants = featureCardAnimations.container;
  const imageVariants = reverse ? featureCardAnimations.imageReverse : featureCardAnimations.image;
  const textVariants = reverse ? featureCardAnimations.textReverse : featureCardAnimations.text;

  return (
      <motion.div 
        className={`w-full md:min-h-[60vh] bg-white px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-6 md:py-6 lg:py-8 flex flex-col md:flex-row items-center md:items-start justify-between overflow-hidden ${reverse ? "md:flex-row-reverse" : ""}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      
      {/* Left Section - Circle & Phone Mockup (Component 1) */}
      <motion.div 
        className={`relative hidden w-full max-w-xs sm:max-w-sm md:w-96 md:h-96 h-64 sm:h-80 md:h-96 -mt-2 sm:mt-0 md:mb-0 md:flex items-center justify-center mx-auto md:mx-0 ${reverse ? 'order-2' : 'order-1'} md:order-none`}
        variants={imageVariants}
      >
        {/* Background Circle - warna dari backend */}
        <div 
          className="rounded-full shadow-2xl w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 mx-auto md:mx-0"
          style={{ 
            width: FEATURE_CARD_CONSTANTS.DIMENSIONS.circle,
            height: FEATURE_CARD_CONSTANTS.DIMENSIONS.circle,
            backgroundColor: backgroundColor 
          }}
        >
          {/* Pink Card Container */}
          <div 
            className={`absolute bg-white rounded-xl shadow-lg p-2 sm:p-3 md:p-4 flex items-center justify-center ${reverse ? 'md:left-0 left-1/2' : 'md:left-full left-1/2'}`}
            style={{
              top: '35%',
              left: reverse ? '0%' : '100%',
              transform: 'translate(-50%, -50%)',
              width: FEATURE_CARD_CONSTANTS.DIMENSIONS.pinkCard.width,
              height: FEATURE_CARD_CONSTANTS.DIMENSIONS.pinkCard.height,
              backgroundColor: FEATURE_CARD_CONSTANTS.PINK_CARD_BG,
            }}
          >
            {/* Random Badge */}
            <div 
              className="absolute rounded-xl shadow-lg p-1.5 sm:p-2 md:p-2 bg-gradient-to-r z-20"
              style={{
                ...badgePosition,
                width: FEATURE_CARD_CONSTANTS.DIMENSIONS.badge.width,
                height: FEATURE_CARD_CONSTANTS.DIMENSIONS.badge.height,
                background: `linear-gradient(to right, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.from}, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.to})`
              }}
            >
              <div className='flex text-white justify-start items-center gap-2 sm:gap-3 md:gap-4'>
                {circleIconImage ? (
                  <img 
                    src={circleIconImage} 
                    alt={appName} 
                    className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain' 
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : IconComponent ? (
                  <IconComponent className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
                ) : (
                  <img src={FEATURE_CARD_CONSTANTS.DEFAULT_ICON} alt="default icon" className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
                )}
                <p className='text-xs sm:text-sm md:text-base'>{appName}</p>
              </div>
            </div>
            
            {/* Phone Image */}
            <img 
              src={phoneImage} 
              alt={title} 
              className='w-full h-full object-contain drop-shadow-lg relative z-10' 
            />
          </div>  
        </div>
      </motion.div>

      {/* Right Section - Text Content (Component 2) */}
      <motion.div 
        className={`flex flex-row md:flex-row items-start justify-start gap-2 sm:gap-3 md:gap-1.5 lg:gap-3 w-full md:w-1/2 ${reverse ? 'order-1 flex-row-reverse md:flex-row' : 'order-2'} md:order-none`}
        variants={textVariants}
      >
        {/* Icon & Line */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-2 lg:gap-3 flex-shrink-0">
          {/* Circle Icon */}
          <div 
            className="rounded-full shadow-3xl flex items-center justify-center"
            style={{
              width: FEATURE_CARD_CONSTANTS.DIMENSIONS.icon,
              height: FEATURE_CARD_CONSTANTS.DIMENSIONS.icon,
              background: `linear-gradient(to right, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.from}, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.to})`
            }}
          >
            {circleIconImage ? (
              <img 
                src={circleIconImage} 
                alt={title} 
                className='w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain' 
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            ) : IconComponent ? (
              <IconComponent className='w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white' />
            ) : (
              <img src={FEATURE_CARD_CONSTANTS.DEFAULT_ICON} alt="default icon" className='w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8' />
            )}
          </div>
          
          {/* Vertical Line - Mobile */}
          <svg 
            width="3" 
            height="100" 
            className="md:hidden"
            style={{
              background: `linear-gradient(to bottom, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.from}, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.to})`
            }}
          >
            <line x1="1" y1="0" x2="1" y2="100" strokeWidth="2" />
          </svg>
          {/* Vertical Line - Desktop */}
          <svg 
            width="3" 
            height="179" 
            className="hidden md:block"
            style={{
              background: `linear-gradient(to bottom, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.from}, ${FEATURE_CARD_CONSTANTS.GRADIENT_COLORS.to})`
            }}
          >
            <line x1="1" y1="0" x2="1" y2="168" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Text Content */}
        <div className={`flex flex-col gap-1.5 sm:gap-2 md:gap-2 lg:gap-4 max-w-full sm:max-w-xl md:max-w-md lg:max-w-2xl w-full ${reverse ? 'text-right' : 'text-left'}`}>
          {/* Title - Aligned with Circle Icon */}
          <h1 className='text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-bold md:leading-tight' style={{ marginTop: '10px' }}>
            Fitur <span style={{ color: appNameColor }}>{appName}</span> {title}
          </h1>
          
          {/* Description */}
          <p className='text-sm sm:text-base md:text-sm lg:text-base text-gray-700 leading-relaxed md:leading-snug'>
            {description}
          </p>
          
        </div>
      </motion.div>

    </motion.div>
  );
};

export default FeatureCard;
