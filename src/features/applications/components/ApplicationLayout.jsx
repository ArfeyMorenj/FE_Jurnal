import React from 'react'
import HeroSection from './HeroSection'
import FeatureCard from './FeatureCard'
import TestimonialApps from '../pages/TestimonialApps'
import FaqApps from '../pages/FaqApps'

const ApplicationLayout = ({ 
  heroData, 
  featuresData,
  sectionId,
  applicationId 
}) => {
  return (
    <div className="overflow-hidden">
      <HeroSection {...heroData} />
      
      <div id="features-section" className="mt-8 sm:mt-16 md:mt-30">
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <TestimonialApps sectionId={sectionId} />

      <FaqApps sectionId={sectionId} />
    </div>
  )
}

export default ApplicationLayout