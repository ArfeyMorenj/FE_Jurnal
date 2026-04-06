import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendar } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import HtmlText from "../../../../utils/HtmlText";
import Button from "../../../../components/common/Button";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { useNewsDetail } from "../hooks/useNewsDetail";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import formatDate from "../../../../helper/formatDate";

const NewsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: berita, isLoading, error } = useNewsDetail(id);

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner text="Memuat detail berita..." />
      </div>
    );
  }

  if (error || !berita) {
    return (
      <p className="text-center text-gray-500 mt-10">
        {error || "Berita tidak ditemukan."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs manual={[{ label: "Detail Berita" }]} />

      <div className="bg-white px-4 py-8 md:px-25 md:py-17 rounded-[10px]">
        {berita.thumbnail_url && (
          <img
            src={berita.thumbnail_url}
            alt={berita.title}
            className="w-full rounded-[10px] mb-6 object-cover 
                      h-auto max-h-[250px] md:max-h-[450px]"
          />
        )}

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 
                  text-xs font-bold text-black/50 mb-4 uppercase">
          <span className="flex items-center gap-1">
            Kategori <span className="text-black">{berita.category?.title || "-"}</span>
          </span>
          <span className="flex items-center gap-1">
            <FaCalendar /> {formatDate(berita.created_at)}
          </span>
          <span className="flex items-center gap-1 normal-case">
            <IoEyeSharp /> DILIHAT: {berita.views ?? 0}
          </span>
        </div>

        <h1 className="text-xl md:text-[30px] font-extrabold text-black mb-4">
          {berita.title}
        </h1>

        {berita.tagsArray?.length > 0 && (
          <div className="flex gap-2 flex-wrap my-2 mb-4">         
              <span  className="text-sm md:text-lg text-primary-red">
                {berita.hashtags}
              </span>
          </div>
        )}

        {berita.content && (
          <HtmlText
            html={berita.content}
            className="text-black text-base md:text-lg leading-normal space-y-4"
          />
        )}
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
};

export default NewsDetail;
