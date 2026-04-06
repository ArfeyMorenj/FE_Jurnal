import React from "react";
import Button from "../../../components/common/Button";
import BannerLanding from "../../../components/BannerLanding";

const HeroSection = ({
  title,
  description,
  primaryButtonText = "Selengkapnya",
  primaryButtonColor = "#E45E14",
  googlePlayLink,
  showGooglePlayButton = true,
  imageSrc = "/svg/teach.svg",
  imageAlt = "Hero Illustration",
  onPrimaryButtonClick,
  reverse = false,
}) => {
  // Function to scroll to features section
  const handleScrollToFeatures = () => {
    if (onPrimaryButtonClick) {
      onPrimaryButtonClick();
    } else {
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const googlePlayButton = showGooglePlayButton && googlePlayLink ? (
    <a
      href={googlePlayLink}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border-2 border-orange-500 rounded-xl px-3 sm:px-4 md:px-8 py-1 font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2 justify-center text-sm sm:text-base"
    >
      <img
        src="/images/backgrounds/google-play.png"
        alt="Google Play"
        className="w-10 h-10 sm:w-6 sm:h-6"
      />
      <div>
        <p className="text-md">DAPATKAN DI</p>
        <p className="font-extrabold text-xs sm:text-sm md:text-md">
          Google Play
        </p>
      </div>
    </a>
  ) : null;

  return (
    <BannerLanding
      title={title}
      description={description}
      buttonText={primaryButtonText}
      onButtonClick={handleScrollToFeatures}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      reverse={reverse}
      extraActions={googlePlayButton}
      // Perbesar ukuran tombol utama (padding & font-size) tanpa mengubah text
      buttonClassName="px-8 sm:px-10 md:px-12 py-3 sm:py-3 md:py-3 rounded-xl font-semibold text-sm sm:text-base md:text-lg text-white border-0"
      buttonStyle={{ backgroundColor: primaryButtonColor }}
    />
  );
};

export default HeroSection;