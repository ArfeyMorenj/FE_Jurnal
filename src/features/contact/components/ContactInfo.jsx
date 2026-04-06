import { IoMail, IoCall, IoLocationSharp } from "react-icons/io5";

export default function ContactInfo({ data }) {
  return (
    <div className="bg-white rounded-[10px] border border-[#CFCFCF] p-7.5 space-y-7.5">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-b from-primary-orange to-primary-red text-white p-2.5 rounded-full">
          <IoMail size={20} />
        </div>
        <div>
          <p className="font-bold text-sm md:text-[15px] text-[#0A033C]">Email</p>
          <p className="text-[#0A033C80] text-[10px] md:text-xs">{data.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-b from-primary-orange to-primary-red text-white p-2.5 rounded-full">
          <IoCall size={20} />
        </div>
        <div>
          <p className="font-bold text-[#0A033C] text-sm md:text-[15px]">No. Telp</p>
          <p className="text-[#0A033C80] text-[10px] md:text-xs">{data.phone_number}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-b from-primary-orange to-primary-red text-white p-2.5 rounded-full">
          <IoLocationSharp size={20} />
        </div>
        <div>
          <p className="font-bold text-[#0A033C] text-sm md:text-[15px]">Alamat Kantor</p>
          <p className="text-[#0A033C80] text-[10px] md:text-xs">{data.office_address}</p>
        </div>
      </div>
    </div>
  );
}
