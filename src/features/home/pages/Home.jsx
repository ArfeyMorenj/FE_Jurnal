import React from "react";
import { motion } from "framer-motion";
import CarouselSection from "../sections/CarouselSection";
import SorotanSection from "../sections/SorotanSection";
import HeroSection from "../sections/HeroSection";
import AllApplicationsSection from "../../applications/components/AllApplicationsSection";
import FAQSection from "../sections/FAQSection";
import TestimonialSection from "../sections/TestimonialSection";
import InfoSection from "../sections/InfoSection";
import ApplicationSection from "../sections/ApplicationSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="border-0">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CarouselSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SorotanSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ApplicationSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FAQSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <TestimonialSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <InfoSection />
      </motion.div>
    </div>
  );
}
