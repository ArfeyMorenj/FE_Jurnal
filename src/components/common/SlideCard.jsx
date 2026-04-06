import { RxCross2 } from "react-icons/rx";
import InputField from "./InputField";
import FileInput from "./FileInput";
import TextareaField from "./TextareaField";

export default function SlideCard({ index, formData, handleChange, handleRemove }) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[15px] inter font-semibold text-[#000405]">Slide {index + 1}</h3>
        <button
          type="button"
          onClick={handleRemove}
          className="text-white bg-[#CA2323] hover:bg-red-700 transform transition-transform hover:scale-105 rounded-full p-1.5 flex items-center justify-center"
        >
          < RxCross2 size={18} />
        </button>        
      </div>

      <hr className="border-[#D9D9D9]/80 mb-6" />

      <div className="space-y-4">
        <div>
          <FileInput
            className='!mb-0'
            label="Masukkan Gambar"
            name={`image_${index}`}
            required
            accept="image/*"
            onChange={(e) => handleChange(e, index, "image")}
            note='Gambar akan tampil di bagian paling atas landing page dalam slider'
          />
        </div>

        <div>
          <InputField
            inputStyle='!mb-0'
            label="Masukkan Headline"
            name={`headline_${index}`}
            placeholder="Masukkan headline utama landing page"
            value={formData.headline}
            onChange={(e) => handleChange(e, index, "headline")}
            required
            note='Headline akan tampil di bagian paling atas landing page dalam slider'
          />
        </div>

        <div>
          <TextareaField
            label="Masukkan Subheadline"
            name={`subheadline_${index}`}
            placeholder="Masukkan subheadline sebagai pendukung headline yang Anda buat"
            value={formData.subheadline}
            onChange={(e) => handleChange(e, index, "subheadline")}
            required
            note="Subheadline akan tampil di bagian bawah headline dalam slider"
          />
        </div>

        <div>
          <InputField
            label="Tombol CTA"
            name={`cta_${index}`}
            placeholder="Tombol ajakan"
            value={formData.cta}
            onChange={(e) => handleChange(e, index, "cta")}
            required
          />
        </div>
      </div>
    </div>
  );
}
