import { FaCalendar } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function NewsItem({ item }) {
  return (
    <div key={item.id} className="flex gap-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-[100px] h-[100px] object-cover rounded-xl"
      />

      <div className="flex flex-col justify-between">
        <div className="">
        <span className="bg-primary-red uppercase text-white text-[10px] py-1 px-2 rounded-[5px] w-fit mb-1">
          {item.category}
        </span>

        <Link to={`/berita/${item.slug}`}>
          <h3
            className="font-extrabold text-black text-sm md:text-lg leading-snug line-clamp-2 hover:underline mt-2"
            title={item.title}
          >
            {item.title}
          </h3>
        </Link>
        </div>

        <div className="text-black/50 text-[8px] font-bold flex items-center gap-2 md:gap-3 uppercase flex-nowrap">
          <span>
            Oleh <span className="text-black">{item.author}</span>
          </span>
          <span className="flex items-center gap-1">
            <FaCalendar /> {item.date}
          </span>
          <span className="flex items-center gap-1 normal-case">
            <IoEyeSharp /> DILIHAT: {item.views}x
          </span>
        </div>
      </div>
    </div>
  );
}
