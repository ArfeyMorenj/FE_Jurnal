import { CirclePlus } from 'lucide-react';
import Button from "../../../../../components/common/Button";

const InfoSection = ({ onAddClick }) => {
    return (
        <div className='bg-white rounded-xl p-3 my-6 flex items-center justify-between'>
            <div className='flex items-center justify-center gap-3'>
                <div className='rounded-full flex items-center justify-center bg-gradient-to-b from-[#E45E14] to-[#CA2323] w-[20px] h-[20px] text-white font-bold'>
                    i
                </div>
                <p className='text-[12px] text-[#000000]/40'>
                    Tabel history mendukung maksimal hingga <span className='bg-gradient-to-b from-[#E45E14] to-[#CA2323] bg-clip-text text-transparent font-bold'>5 tabel</span>. Tekan <span className='bg-gradient-to-b from-[#E45E14] to-[#CA2323] bg-clip-text text-transparent font-bold'>Tambah Perjalanan</span> untuk menambahkan tabel baru.
                </p>
            </div>
            <Button 
                className="bg-white flex items-center gap-2 px-4 py-2 rounded-lg"
                onClick={onAddClick}
            >
                <CirclePlus size={16} className="text-[#E45E14]" />
                <span className="text-transparent bg-gradient-to-b from-[#E45E14] to-[#CA2323] bg-clip-text font-semibold">
                    Tambah Perjalanan
                </span>
            </Button>
        </div>
    );
};

export default InfoSection;
