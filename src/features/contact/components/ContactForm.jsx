import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import TextareaField from "../../../components/common/TextareaField";
import { useMessageForm } from "../../admin/contact/hooks/useMessageForm";

export default function ContactForm() {
  const { formData, setFormData, submit, loading, errors } = useMessageForm();
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await submit();
    if (success) {
      recaptchaRef.current?.reset(); 
      setFormData({
        name: "",
        email: "",
        message: "",
        recaptcha: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FBFBFB] border border-[#CFCFCF] rounded-xl shadow-sm p-10 min-h-[638px] flex flex-col justify-between"
    >
      <div>
        <h2 className="text-lg md:text-[25px] font-bold mb-1">Hubungi Kami</h2>
        <p className="text-sm md:text-[15px] text-[#1F1C14] mb-10">
          Silakan hubungi kami jika mengalami masalah teknis atau butuh informasi.
        </p>

        <InputField
          label="Nama Lengkap"
          name="name"
          placeholder="Masukkan nama lengkap Anda"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Masukkan email Anda"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <TextareaField
          label="Pesan Anda"
          name="message"
          placeholder="Masukkan pesan yang ingin Anda sampaikan"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
        />

        <div className="mt-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(value) =>
              setFormData({ ...formData, recaptcha: value })
            }
          />
          {errors?.recaptcha && (
            <p className="text-red-500 text-sm">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          fullWidth
          disabled={loading || !formData.recaptcha}
          className={`py-2.5 rounded-[10px] text-white font-bold transition ${
            loading || !formData.recaptcha
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-primary-orange to-primary-red hover:opacity-90"
          }`}
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </Button>
      </div>
    </form>
  );
}
