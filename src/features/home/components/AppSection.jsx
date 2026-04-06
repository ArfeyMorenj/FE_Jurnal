import Button from "../../../components/common/Button";
import BackgroundApps from "../../../components/BackgroundApps"

const AppSection = ({ 
  title, 
  description, 
  buttonColor, 
  image, 
  linkRoute,
  reverse = false, 
  mirror = false,
  gradientColor1,
  gradientColor2
}) => {
  const words = description.split(" ");
  const firstTwo = words.slice(0, 2).join(" ");
  const rest = words.slice(2).join(" ");

  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-4 md:gap-8 my-12 ${reverse ? "md:flex-row-reverse" : ""}`}>   
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="relative">
          <BackgroundApps 
            color1={gradientColor1 || "#CA2323"}
            color2={gradientColor2 || "#E45E14"}
            className={`w-84 md:w-[700px] ${mirror ? "scale-x-[-1]" : ""}`}
          />
          <img
            src={image}
            alt={title}
            className="w-50 md:w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-xl"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-xl md:text-[42px] font-semibold text-black leading-snug">
          Aplikasi <span style={{ color: buttonColor }}>{title}</span>
        </h2>
        <p className="text-[#0F2137] text-xl md:text-4xl font-medium leading-normal md:leading-[55px]">
          <span style={{ color: buttonColor }}>{firstTwo}</span> {rest}
        </p>
        <Button
          onClick={linkRoute}
          className="px-12 py-3 md:px-18 md:py-6 text-lg md:text-2xl font-semibold mt-4 rounded-2xl text-white transition-transform duration-200 ease-in-out bg-gradient-to-r from-{color_gradient_start} to-{color_gradient_end} "
          style={{
            background: `linear-gradient(90deg, ${gradientColor1}, ${gradientColor2})`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(0.9)";
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)"; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)"; 
          }}
        >
          Lihat Detail
        </Button>
      </div>
    </div>
  );
};

export default AppSection;
