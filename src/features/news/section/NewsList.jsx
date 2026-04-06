import NewsCard from "../components/NewsCard";
import Pagination from "../../../components/Pagination";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { usePublicNewsList } from "../hooks/usePublicNewsList";

export default function NewsList() {
  const { news, isLoading, error, pagination, setPage } =
    usePublicNewsList(1, 3);

  return (
    <section className=" py-12">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-0 mb-6">
          <h2 className="text-lg md:text-[35px] font-bold text-black mr-2">
            Berita Terbaru
          </h2>
          <span className="w-[10px] h-[10px] bg-primary-red rounded-full gap-0"></span>
          <div className="flex-1 h-[0.5px] bg-black/50"></div>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Memuat daftar berita..." />
        ) : error ? (
          <p className="text-center text-gray-500">{error}</p>
        ) : (
          <>
            <div className="flex flex-col gap-10">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>

            <div className="mt-10">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.lastPage}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}