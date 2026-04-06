import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { MENU_ITEMS } from "../../navbar/helper/NavItems";
import { Link } from "react-router-dom";
import { PiXLogoBold } from "react-icons/pi";
import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterContent = ({footer}) => {
   const footerLinks = MENU_ITEMS.map((item) => {
    if (item.route) return item;

    if (item.id === "aplikasi") {
      return { ...item, route: "/aplikasi" };
    }

    return null;
  }).filter(Boolean);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 text-center md:text-left inter">
      <div className="md:col-span-1 px-4">
          <h1 className="font-bold mb-3 md:mb-6">
          TENTANG <span className="text-primary-red">MI<span className="text-primary-orange">JURNAL</span></span>
          </h1>
          <p className="text-[#6B6B6B] leading-[32px]">
          {footer.description}
          </p>
      </div>

      <div className="md:col-span-1 px-8 md:px-24">
        <h1 className="font-bold mb-3 md:mb-6">AKSI CEPAT</h1>
        <ul className="space-y-2 md:space-y-4 text-black font-semibold">
          {footerLinks.map((item) => (
            <li key={item.id}>
              <Link
                to={item.route}
                className="relative block cursor-pointer pl-0 transition-all duration-300 pb-1 hover:pl-2 
                          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
                          after:bg-primary-red after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    <div className="md:col-span-1 text-center md:text-left">
      <h1 className="font-bold mb-3 md:mb-6">ALAMAT KAMI</h1>

      <div className="flex items-start gap-3 mb-4 text-black text-sm justify-center md:justify-start hover:text-primary-red transition-colors duration-200">
        <IoLocationOutline className="text-primary-red flex-none w-6 h-6" />
        <p>
          {footer.address}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-4 text-black text-sm justify-center md:justify-start hover:text-primary-red transition-colors duration-200">
        <MdOutlineEmail className="text-primary-red w-6 h-6" />
        <p>{footer.email}</p>
      </div>

      <div className="flex items-center gap-3 text-black text-sm justify-center md:justify-start hover:text-primary-red transition-colors duration-200">
        <IoCallOutline className="text-primary-red w-6 h-6" />
        <p>{footer.phone}</p>
      </div>
    </div>

    <div className="md:col-span-1 px-6a md:px-16">
      <h1 className="font-bold mb-3 md:mb-6">PLATFORM MEDIA</h1>
      <p className="text-sm text-black mb-3">Bergabung dengan kami</p>

      <div className="flex gap-4 text-2xl text-black justify-center md:justify-start ">
        <a 
          href={footer.youtube} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-red transition-all duration-200 ease-in-out hover:-translate-y-0.5"
        >
          <FaYoutube />
        </a>
        <a 
          href={footer.facebook} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-red transition-all duration-200 ease-in-out hover:-translate-y-0.5"
        >
          <FaFacebook />
        </a>
        <a 
          href={footer.twitter} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-red transition-all duration-200 ease-in-out hover:-translate-y-0.5"
        >
          <PiXLogoBold />
        </a>
        <a 
          href={footer.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-red transition-all duration-200 ease-in-out hover:-translate-y-0.5"
        >
          <FaInstagram />
        </a>
        <a 
          href={footer.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-red transition-all duration-200 ease-in-out hover:-translate-y-0.5"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  </div>
  )
}

export default FooterContent
