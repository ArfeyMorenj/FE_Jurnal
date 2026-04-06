//untuk berita selanjutnya

import { useEffect, useState } from "react";
import { getNewsList } from "../../admin/news/services/newsService";

export const useNextPrevNews = (currentSlug) => {
  const [navigation, setNavigation] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      
      try {
        const res = await getNewsList({ perPage: 999 });
        const list = res.data || [];

        const index = list.findIndex((item) => item.slug === currentSlug);

        if (index !== -1) {
          setNavigation({
            prev: list[index - 1] || null,
            next: list[index + 1] || null,
          });
        } else {
          setNavigation({ prev: null, next: null });
        }
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    };

    fetchAll();
  }, [currentSlug]);

  return { ...navigation, loading };
};
