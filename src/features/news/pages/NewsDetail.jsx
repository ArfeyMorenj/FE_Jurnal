import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaCalendar, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import HtmlText from "../../../utils/HtmlText";
import Button from "../../../components/common/Button";
import RelatedNews from "../components/RelatedNews";
import { usePublicNewsDetail } from "../hooks/usePublicNewsDetail";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useNextPrevNews } from "../hooks/useNextPrevNews";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { prev, next, loading: navLoading } = useNextPrevNews(slug);

  const { data: news, isLoading, error } = usePublicNewsDetail(slug);

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner text="Memuat detail berita..." />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="py-20 text-center text-gray-500">
        {error || "Berita tidak ditemukan."}
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-10 max-w-7xl">
      <div className="md:col-span-3">
        <img
          src={news.thumbnail_url}
          alt={news.title}
          className="w-full rounded-[10px] mb-6 object-cover min-h-[415px]"
        />

        <div className="flex items-center gap-3 text-xs font-bold text-black/50 mb-4 uppercase">
          <span className="flex items-center gap-1">
            Oleh <span className="text-black">{news.author}</span>
          </span>
          <span className="flex items-center gap-1">
            <FaCalendar /> {news.dateFormatted}
          </span>
          <span className="flex items-center gap-1 normal-case">
            <IoEyeSharp /> DILIHAT: {news.views}x
          </span>
        </div>

        <h1 className="text-2xl md:text-[30px] font-extrabold text-black mb-4">
          {news.title}
        </h1>

        {news.tagsArray?.length > 0 && (
          <div className="flex gap-2 flex-wrap my-2 mb-4">         
              <span  className="text-sm md:text-lg text-primary-red">
                {news.hashtags}
              </span>
          </div>
        )}

        <HtmlText
          html={news.content}
          className="text-black text-base md:text-lg leading-normal space-y-4"
        />

        <div className="flex justify-between items-center mt-6 md:mt-10 gap-3">
          <Button
            to="/berita"
            className="bg-gradient-to-r from-primary-orange to-primary-red text-white text-[12px] md:text-[13px] font-bold py-2.5 px-4 md:py-3 md:px-5 rounded-lg md:rounded-xl hover:opacity-90 flex items-center gap-1"
            leftIcon={<FaArrowLeft />}
          >
            Kembali ke List
          </Button>

          <Button
            disabled={!next}
            onClick={() => {
              if (next?.slug) {
                navigate(`/berita/${next.slug}`);
              }
            }}
            className="bg-gradient-to-r from-primary-orange to-primary-red text-white text-[12px] md:text-[13px] font-bold py-2.5 px-4 md:py-3 md:px-5 rounded-lg md:rounded-xl hover:opacity-90 flex items-center gap-1 text-right"
            rightIcon={<FaArrowRight />}
          >
            {next ? "Baca Berita Selanjutnya" : "Tidak Ada Berita Lagi"}
          </Button>
        </div>
      </div>

      <div className="md:col-span-2 max-w-md">
        <RelatedNews />
      </div>
    </section>
  );
}
