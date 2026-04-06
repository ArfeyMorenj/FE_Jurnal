import React from "react";
import NewsItem from "./NewsItem";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { usePublicNewsList } from "../hooks/usePublicNewsList";

export default function RelatedNews() {
  const { news, isLoading, error } = usePublicNewsList(1, 3);

  return (
    <aside>
      <div className="flex items-center mb-4 md:mb-6">
        <h2 className="text-[20px] font-bold text-black mr-2 md:text-[25px]">
          Berita Lainnya
        </h2>
        <span className="w-2.5 h-2.5 bg-primary-red rounded-full"></span>
        <div className="flex-1 h-[0.5px] bg-black/50"></div>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Memuat berita lain..." />
      ) : error ? (
        <p className="text-gray-500">{error}</p>
      ) : (
        <div className="flex flex-col gap-4 md:gap-5">
          {news.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </aside>
  );
}
