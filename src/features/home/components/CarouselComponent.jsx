import { highlightMiJurnal } from "../../../utils/highlightMiJurnal";
import Button from "../../../components/common/Button";

const CarouselComponent = ({
  title,
  description,
  button_link,
  image,
}) => {
  return (
    <div className="relative w-full md:h-screen h-[500px] bg-white overflow-hidden flex items-center">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-[30%]  md:translate-x-[60%]">
        <div className="w-[380px] h-[100px] rounded-full bg-orange-400 blur-[150px] opacity-60"></div>
      </div>

      <div className="relative w-full px-14 md:px-18 py-4 grid grid-cols-1 md:grid-cols-5 gap-0 items-center">
        <div className="text-center md:text-left md:col-span-3 z-10">
          <div className="max-w-2xl mx-auto md:mx-0 relative">
            <img
              src="/svg/light-bulb.svg"
              alt="Lamp Icon"
              className="absolute -top-12 md:-top-16 w-12 h-12 md:w-16 md:h-16"
            />

            <h1 className="text-2xl md:text-[48px] font-bold leading-snug mb-4">
              {highlightMiJurnal(title)}
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              {highlightMiJurnal(description)}
            </p>
            <Button
              to={button_link}
              className="p-4 bg-primary-red text-white text-base md:text-2xl font-semibold rounded-2xl shadow hover:bg-red-700 transition mt-4 leading-normal"
            >
              Lihat Selengkapnya
            </Button>
          </div>
        </div>

        <div className="hidden md:flex relative justify-center md:col-span-2 items-center">
          <img
            src="/images/backgrounds/bg-carousel.png"
            alt="Background"
            className="absolute w-[320px] md:w-[567px] opacity-70 -translate-x-6 -translate-y-10"
          />
          <img
            src={image}
            alt="Phone Dynamic"
            className="absolute w-[320px] md:w-[500px] z-10 -translate-x-6"
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
