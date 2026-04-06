import { Star } from "lucide-react";
import roleColors from "../../../constants/roleColors";

const TestimonialCard = ({ testimonial, isActive }) => {
  const colorClass = roleColors[testimonial.app] || "text-gray-700";

  return (
    <div
      className={`transition-transform duration-500 ease-in-out rounded-xl bg-white shadow-md p-6 text-center max-w-sm mx-auto min-h-[280px] md:min-w-[350px] ${
        isActive ? "scale-105 shadow-lg" : "scale-95 opacity-90"
      }`}
    >
      <div className="flex justify-center mb-2">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>

      <h3 className="inter text-lg md:text-xl font-semibold">
        {testimonial.name}
      </h3>

      <div className="flex justify-center gap-1 my-2 text-[#FFC107]">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>

      <p className={`text-sm md:text-base font-semibold inter ${colorClass}`}>
        {testimonial.app}
      </p>

      <p className="mt-3 text-[#1F1C1470] text-sm md:text-base">
        {testimonial.review}
      </p>
    </div>
  );
};

export default TestimonialCard;
