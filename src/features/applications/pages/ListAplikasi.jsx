import { motion } from "framer-motion";
import { useRef } from "react";
import Button from "../../../components/common/Button";
import AllApplicationsSection from "../components/AllApplicationsSection";
import { heroAnimations } from "../animations/heroAnimations";
import { SECTION_IDS } from "../../../constants/sections";
import { useBannerById } from "../hooks/useBannerById";
import TestimonialApps from "./TestimonialApps";
import FaqApps from "./FaqApps";

// Section scroll animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ListAplikasi() {
  const { data: banner } = useBannerById(SECTION_IDS.APPLICATION);
  const allAppsRef = useRef(null);

  const title =
    banner?.title ||
    "MiJurnal menghadirkan beragam aplikasi untuk hidup, kerja, dan belajar lebih teratur dalam satu tempat.";

  const description =
    banner?.description ||
    "Di MiJurnal, Anda bisa menemukan berbagai aplikasi mulai dari belajar, kerja, hingga aktivitas sehari-hari. Semua terhubung dalam satu platform agar hidup lebih teratur dan efisien.";

  const buttonText = banner?.button_text || "Lihat Semua Aplikasi";
  const heroImage = banner?.image || "/images/komputers.png";

  const scrollToApps = () => {
    allAppsRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  };

  return (
    <>
      <motion.div
        className="relative min-h-screen sm:min-h-[600px] md:min-h-screen overflow-hidden"
        variants={heroAnimations.container}
        initial="hidden"
        animate="visible"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 top-0 sm:mt-2 md:mt-4">
          <img
            src='/svg/Vector2.png'
            alt="Background"
            className="w-full h-full object-cover -mt-13 sm-mt-0"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-start sm:items-center md:items-center min-h-screen sm:min-h-[600px] md:min-h-screen pt-0 sm:pt-8 sm:py-12 md:py-16 lg:py-0">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 pt-0 sm:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start sm:items-center">
              {/* Left Side - Text Content */}
              <motion.div
                className="text-white space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 pt-0 sm:pt-6 md:pt-8 lg:pt-2 order-2 md:order-1"
                variants={heroAnimations.text}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-tight sm:leading-snug">
                  {title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-90">
                  {description}
                </p>

                <motion.div
                  className="pt-2 sm:pt-3 md:pt-4"
                  variants={heroAnimations.button}
                >
                  <button
                    onClick={scrollToApps}
                    className="border-2 border-white text-white hover:bg-white hover:text-red-600 transition-all duration-300 px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-sm sm:text-base md:text-lg font-medium w-full sm:w-auto rounded"
                  >
                    {buttonText}
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Side - Computer Images */}
              <motion.div
                className="relative lg:ml-auto order-1 md:order-2"
                variants={heroAnimations.image}
              >
                <div className="relative">
                  <img
                    src={heroImage}
                    alt="MiJurnal Applications"
                    className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto md:mx-0 mt-10"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={allAppsRef}
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AllApplicationsSection showViewAllButton={false} />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <TestimonialApps sectionId={SECTION_IDS.APPLICATION} />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FaqApps sectionId={SECTION_IDS.APPLICATION} />
      </motion.div>
    </>
  );
}