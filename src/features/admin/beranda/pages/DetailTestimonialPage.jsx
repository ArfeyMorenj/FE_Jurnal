import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Button from "../../../../components/common/Button";
import roleColors from "../../../../constants/roleColors";
import useTestimonialSection from "../controller/useTestimonialSection";

export default function DetailTestimonialPage() {
  const { sectionId, id } = useParams();
  const navigate = useNavigate();

  const { getTestimonialById } = useTestimonialSection(sectionId);
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pass sectionId dan id ke getTestimonialById
        const result = await getTestimonialById(id);
        setTestimonial(result); 
      } catch (err) {
        console.error("Error fetching testimonial:", err);
        setTestimonial(null);
      }
    };

    fetchData();
  }, [sectionId, id, getTestimonialById]);

  if (!testimonial) {
    return (
      <div className="p-8 text-center text-gray-500">
        Data testimonial tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs 
        manual={[
          { label: 'Testimonial Section', path: `/admin/beranda/testimonial-section/${sectionId}` },
          { label: 'Detail Testimonial' },
        ]} 
      />

      <div className="bg-white rounded-[10px] p-6 md:p-10 mt-8">
        <div className="flex items-center gap-8 mb-10">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-[100px] h-[100px] rounded-[15px] object-cover"
          />
          <div>
            <h2 className="inter font-semibold text-xl md:text-[30px] text-black">
              {testimonial.name}
            </h2>
            <p
              className={`inter text-lg md:text-[25px] ${
                roleColors[testimonial.application] || "text-gray-600"
              }`}
            >
              {testimonial.application ?? "-"}
            </p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoMdStar
              key={i}
              size={32}
              fill={i < testimonial.rating ? "#FFAD33" : "#E5E7EB"}
              stroke="none"
            />
          ))}
        </div>

        <p className="text-[#5E5E5E] leading-relaxed text-sm md:text-[17px]">
          {testimonial.comment}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
        <div className="flex gap-3 self-end sm:self-auto">
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}