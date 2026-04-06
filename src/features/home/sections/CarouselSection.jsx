import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import CarouselComponent from "../components/CarouselComponent";
import { useHero } from "../../admin/beranda/hooks/useHero";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { SECTION_IDS } from "../../../constants/sections";

export default function CarouselSection() {
  const { heroes, loading: loadingHeroes } = useHero(SECTION_IDS.LANDING_PAGE);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); 

  const nextSlide = () => {
    setDirection(1); 
    setCurrent((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1); 
    setCurrent((prev) => (prev === 0 ? heroes.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!heroes || heroes.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1); 
      setCurrent((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, [heroes]);

  if (loadingHeroes) return <LoadingSpinner />;

  if (!heroes || heroes.length === 0) {
    return (
      <section className="relative w-full h-[300px] flex justify-center items-center rounded-lg">
        <p className="text-gray-500 text-sm md:text-base">
          Belum ada data hero.
        </p>
      </section>
    );
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50, 
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50, 
      opacity: 0
    })
  };

  return (
    <section className="relative w-full max-w-[1440px] mx-auto overflow-hidden">
      <div className="relative h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={heroes[current].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <CarouselComponent {...heroes[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-red shadow-md p-1.5 md:p-2 rounded-full hover:bg-primary-orange hover:scale-105 transition-all duration-200 z-10"
      >
        <IoIosArrowBack className="text-sm md:text-xl text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-red shadow-md p-1.5 md:p-2 rounded-full hover:bg-primary-orange hover:scale-105 transition-all duration-200 z-10"
      >
        <IoIosArrowForward className="text-sm md:text-xl text-white" />
      </button>
    </section>
  );
}