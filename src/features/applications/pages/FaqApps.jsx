import React, { useState } from "react";
import { highlightMiJurnal } from "../../../utils/highlightMiJurnal";
import messageIcon from "/svg/message.svg";
import Button from "../../../components/common/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import useFaqs from "../../admin/application/hooks/useFaqsApps";

export default function FaqApps( { sectionId } ) {
  const [openIndex, setOpenIndex] = useState(null);
  
  const { faqs, sectionData, loading } = useFaqs(sectionId);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <section className="relative px-6 py-16 my-16 bg-[url('/svg/abstract.svg')] bg-no-repeat bg-[right_top_30px] bg-[length:70px_auto] md:bg-[length:200px-auto]">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="max-w-xs md:max-w-[780px] text-3xl md:text-7xl font-extrabold mb-8 md:mb-18 tracking-[-1px] md:tracking-[-3px]">
          {highlightMiJurnal(sectionData.title || "Pertanyaan yang sering ditanyakan")}
        </h2>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          
          <div className="space-y-3 md:col-span-3">
            {faqs.length === 0 && (
              <p className="text-gray-600">FAQ belum tersedia.</p>
            )}

            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border border-[#CFCFCF] rounded-[10px] p-4 shadow-sm cursor-pointer bg-white"
              >
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-extrabold text-[22px] md:text-2xl">
                    {faq.question}
                  </h3>

                  <span className="text-xl font-bold">
                    <AnimatePresence mode="wait" initial={false}>
                      {openIndex === index ? (
                        <motion.span
                          key="minus"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.25 }}
                        >
                          <FaMinus />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="plus"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.25 }}
                        >
                          <FaPlus />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-black text-sm md:text-lg font-medium">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center bg-white border border-[#CFCFCF] rounded-[10px] p-4 md:p-8 shadow-md w-full md:col-span-2 text-center">
            <img src={messageIcon} alt="Message" className="w-15 h-14 my-4 md:my-6" />

            <h3 className="text-black text-lg md:text-2xl font-extrabold mb-2 md:mb-8">
              {sectionData.cta_title || "Ada pertanyaan lainnya?"}
            </h3>

            <p className="text-black text-base md:text-xl font-semibold mb-4 md:mb-8 tracking-[-2%]">
              {sectionData.cta_description ||
                "Ajukan pertanyaan anda, kami akan membalas secepat mungkin."}
            </p>

            <Button
              fullWidth
              to="/kontak"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white py-2 md:py-4"
            >
              Kirim Email Anda
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}