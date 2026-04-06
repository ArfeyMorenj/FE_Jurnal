import { FaCalendar } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import NewsItem from "../components/NewsItem";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { usePublicNewsList } from "../hooks/usePublicNewsList";

export default function PreviewNews() {
  const { news, isLoading, error } = usePublicNewsList(1, 4);

  if (isLoading) {
    return (
      <section className="py-20 max-w-7xl mx-auto">
        <LoadingSpinner text="Memuat berita terbaru..." />
      </section>
    );
  }

  if (error || news.length === 0) {
    return (
      <section className="py-20 max-w-7xl mx-auto text-center text-gray-500">
        {error || "Belum ada berita terbaru."}
      </section>
    );
  }

  const [featured, ...others] = news;

  return (
    <section className="bg-white py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-[400px] object-cover rounded-2xl"
          />

          <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-end p-6">
            <span className="bg-red-600 text-white text-xs p-[6px] font-bold text-[10px] uppercase rounded-[5px] w-fit mb-3">
              {featured.category}
            </span>
            <h2 className="text-white text-xl md:text-3xl max-w-md font-extrabold mb-2">
              {featured.title}
            </h2>
            <div className="flex items-center text-white text-[9px] md:text-xs font-bold uppercase gap-4">
              <span>Oleh {featured.author}</span>
              <span className="flex items-center gap-1">
                <FaCalendar /> {featured.date}
              </span>
              <span className="flex items-center gap-1 normal-case">
                <IoEyeSharp /> DILIHAT: {featured.views}x
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {others.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
