import React from "react";
import clsx from "clsx";
import { highlightMiJurnal } from "../utils/highlightMiJurnal";
import Button from "./common/Button";

export default function BannerLanding({
  title,
  description,
  buttonText,
  onButtonClick,
  buttonLink,
  imageSrc,
  imageAlt = "Hero Image",
  reverse = false,
  extraActions = null,
  buttonClassName = "",
  buttonStyle,
}) {
  const buttonClasses = clsx(
    "bg-primary-red text-white px-8 rounded-2xl shadow hover:bg-red-600 transition",
    buttonClassName
  );

  return (
    <section className="relative overflow-hidden md:h-screen h-[400px] flex items-center justify-center">
      <div className="md:hidden">
        <div className="absolute -top-12 left-0 w-[200px] h-[200px] bg-primary-red rounded-full"></div>
        <div className="absolute bottom-12 left-0 w-[80px] h-[80px] bg-[#FDA53D] rounded-full"></div>
        <div className="absolute bottom-0 -right-10 w-[200px] h-[200px] bg-[#FFBF74] rounded-full"></div>
        <div className="absolute top-6 right-[25%] w-[50px] h-[50px] bg-[#FDA53D] rotate-[-16deg] rounded-[15px]"></div>
        <div className="absolute -top-10 -left-3 w-[70px] h-[70px] bg-[#FDA53D] rotate-[20deg] rounded-[15px] z-20"></div>
      </div>

      <div className="hidden md:block">
        <div className="absolute -top-25 left-0 w-[473px] h-[473px] bg-primary-red rounded-full"></div>
        <div className="absolute bottom-30 left-0 w-[150px] h-[150px] bg-[#FDA53D] rounded-full"></div>
        <div className="absolute bottom-0 -right-19 w-[473px] h-[473px] bg-[#FFBF74] rounded-full"></div>
        <div className="absolute top-12 right-[30%] w-[103px] h-[103px] bg-[#FDA53D] rotate-[-16deg] rounded-[30px]"></div>
        <div className="absolute -top-23 -left-5 w-44 h-44 bg-[#FDA53D] rotate-[20deg] rounded-[30px] z-20"></div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none  backdrop-blur-[250px]  bg-gradient-to-b from-[#CA2323]/10 to-[#FFFFFF]/0"></div>

      <div className="container relative z-30 mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6">       
        <div
          className={clsx(
            "relative hidden md:flex justify-center mt-14",
            reverse ? "md:order-2" : "md:order-1"
          )}
          style={reverse ? { transform: "scaleX(-1)" } : undefined}
        >
          <div className="relative w-full max-w-md">
            <svg width="0" height="0">
              <defs>
                <clipPath id="roundedPolygon" clipPathUnits="objectBoundingBox">
                  <path d="M 0.09,0.08 Q 0.09,0 0.17,0 L 0.93,0.07 Q 1,0.07 1,0.15 L 0.95,0.92 Q 0.95,1 0.87,1 L 0.10,0.75 Q 0,0.75 0,0.70 Z" />
                </clipPath>
              </defs>
            </svg>
            
            <div 
              className="w-full max-w-md shadow-lg overflow-hidden" 
              style={{ 
                clipPath: 'url(#roundedPolygon)',
                transform: 'rotate(-25deg)', 
              }} 
            > 
              <img  
                src={imageSrc}  
                alt={imageAlt}  
                className="w-126 h-148 object-cover object-center" 
                style={{ 
                  transform: 'rotate(25deg) scale(1.4)', 
                  transformOrigin: 'center',
                }} 
              /> 
            </div> 
          
            <div 
              className="absolute w-27.5 h-27.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-[30px]" 
              style={
                reverse
                  ? {
                      left: "8%",
                      bottom: "3%",
                      transform: "rotate(20deg)",
                    }
                  : {
                      left: "8%",
                      bottom: "3%",
                      transform: "rotate(-20deg)",
                    }
              }
            /> 
          </div>
        </div>

        <div
          className={clsx(
            "text-center space-y-4 mx-auto max-w-2xl",
            reverse
              ? "md:order-1 md:text-left md:items-start"
              : "md:text-right md:order-2 md:items-end"
          )}
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-snug">
            {highlightMiJurnal(title)}
          </h2>
          <p className="text-[#2C1F35] text-base md:text-[22px]">{description}</p>
          {(buttonText || extraActions) && (
            <div
              className={clsx(
                "flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center",
                reverse ? "md:justify-start md:items-start" : "md:justify-end md:items-end"
              )}
            >
              {buttonText && (
                buttonLink ? (
                  <a
                    href={buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                    style={buttonStyle}
                  >
                    {buttonText}
                  </a>
                ) : (
                  <Button
                    onClick={onButtonClick}
                    className={buttonClasses}
                    style={buttonStyle}
                  >
                    {buttonText}
                  </Button>
                )
              )}
              {extraActions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
