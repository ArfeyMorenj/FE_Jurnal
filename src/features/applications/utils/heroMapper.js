import { getImageUrl } from "../../../utils/image";

export const buildHeroProps = (defaultHero = {}, banner) => {
  if (!banner) {
    return defaultHero;
  }

  const imageSrc = banner.image ? getImageUrl(banner.image) : defaultHero.imageSrc;

  return {
    ...defaultHero,
    title: banner.title || defaultHero.title,
    description: banner.description || defaultHero.description,
    primaryButtonText: banner.button_text || defaultHero.primaryButtonText,
    imageSrc,
    imageAlt: banner.title || defaultHero.imageAlt,
  };
};


