import { useState } from "react";
import TestimonialCard from "../components/TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTestimonialSection from "../../admin/beranda/controller/useTestimonialSection";
import "swiper/css";
import "swiper/css/navigation";
import { highlightMiJurnal } from "../../../utils/highlightMiJurnal";
import { SECTION_IDS } from "../../../constants/sections";

export default function TestimonialSection() {
  const SECTION_ID = SECTION_IDS.LANDING_PAGE;
  const [activeIndex, setActiveIndex] = useState(0);

  const { testimonials, leadInText, loading } = useTestimonialSection(SECTION_ID, { mode: "landing" });

  const normalized = (testimonials || []).map((item) => ({
    id: item.id,
    name: item.name,
    review: item.comment,
    app: item.application,
    rating: item.rating,
    image: item.photo ?? item.image ?? item.image_url ?? null,
  }));

  if (loading) return null;

  if (!normalized || normalized.length === 0) {
    return null;
  }

  let displayTestimonials = normalized;
  let enableLoop = false;

  if (normalized.length === 1) {
    return (
      <section className="py-12 bg-[#FFF3E850] relative">
        <h2 className="text-3xl font-bold text-center mb-10">
          {highlightMiJurnal(leadInText || "Dari Pengguna MiJurnal untuk Anda")}
        </h2>
        <div className="flex justify-center">
          <TestimonialCard testimonial={normalized[0]} />
        </div>
      </section>
    );
  } else if (normalized.length <= 3) {
    enableLoop = false;
  } else if (normalized.length <= 5) {
    displayTestimonials = [...normalized, ...normalized];
    enableLoop = true;
  } else {
    enableLoop = true;
  }

  return (
    <section className="py-12 md:py-24 bg-[#FFF3E850] relative">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-10">
        {highlightMiJurnal(leadInText || "Dari Pengguna MiJurnal untuk Anda")}
      </h2>

      <div className="relative md:max-w-7xl md:mx-auto px-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={enableLoop}
          speed={700}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          onSlideChange={(swiper) =>
            setActiveIndex(swiper.realIndex % normalized.length)
          }
          breakpoints={{
            0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 20 },
            768: { slidesPerView: 2, centeredSlides: true, spaceBetween: 30 },
            1024: { slidesPerView: 3, centeredSlides: true, spaceBetween: 30 },
          }}
          className="!px-4 !py-8"
        >
          {displayTestimonials.map((testimonial, idx) => {
            const realIdx = idx % normalized.length;
            const isActive = realIdx === activeIndex;

            return (
              <SwiperSlide key={`${realIdx}-${idx}`}>
                <div
                  className={`w-full max-w-sm mx-auto px-2 transition-all duration-500 ease-in-out ${
                    isActive ? "scale-105 opacity-100" : "scale-90 opacity-60"
                  }`}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {normalized.length > 1 && (
          <button
            className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 
                      bg-primary-red text-white p-1 md:p-2 rounded-full z-10 
                      transition-all duration-200 ease-in-out
                      hover:bg-primary-orange hover:shadow-lg
                      active:scale-90"
          >
            <ChevronLeft />
          </button>
        )}

        {normalized.length > 1 && (
          <button
            className="custom-next absolute right-2 top-1/2 -translate-y-1/2 
                      bg-primary-red text-white p-1 md:p-2 rounded-full z-10 
                      transition-all duration-200 ease-in-out
                      hover:bg-primary-orange hover:shadow-lg
                      active:scale-90"
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}