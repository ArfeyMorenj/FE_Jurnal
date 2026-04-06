import { IoEyeSharp } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NewsCard({ news }) {
  return (
    <div className="rounded-[10px] flex flex-col md:flex-row gap-3 md:gap-6 items-start">
      <img
        src={news.image}
        alt={news.title}
        className="w-full md:w-[500px] h-[200px] md:h-[280px] object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col justify-between min-h-[240px] md:min-h-[280px]">
        <div>
          <span className="bg-primary-red uppercase text-white text-[10px] md:text-[15px] py-1 px-2 rounded-[5px] w-fit mb-2">
          {news.category}
        </span>

          <div className="group mt-1">
            <h2
              className="
                font-extrabold text-black leading-snug mb-2
                text-sm md:text-[25px]
                line-clamp-2 md:line-clamp-1
                relative cursor-pointer
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
                after:bg-black after:w-0 md:group-hover:after:w-full
                after:transition-all after:duration-300
              "
            >
              {news.title}
            </h2>
          </div>

          <p className="text-black text-sm md:text-[15px] mb-3 line-clamp-4">
            {news.description}
          </p>

          <Link
            to={`/berita/${news.slug}`}
            className="text-primary-red text-[10px] md:text-[13px] hover:underline"
          >
            Selengkapnya...
          </Link>
        </div>

        <div className="flex items-center text-black/50 text-[10px] md:text-xs gap-4 uppercase font-bold">
          <span>Oleh <span className=" text-black">{news.author}</span></span>
          <span className="flex items-center gap-1">
            <FaCalendar /> {news.date}
          </span>
          <span className="flex items-center gap-1 normal-case">
            <IoEyeSharp/> DILIHAT: {news.views}x
          </span>
        </div>
      </div>
    </div>
  );
}
