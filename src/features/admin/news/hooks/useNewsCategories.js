import { useEffect, useState } from "react";
import { getNewsCategories } from "../services/categoryService";

const mapCategoryOption = (category) => ({
  value: category.id,
  label: category.title,
});

export const useNewsCategories = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const categories = await getNewsCategories();
        setOptions(categories.map(mapCategoryOption));
      } catch (err) {
        setError("Gagal memuat kategori.");
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return {
    options,
    isLoading,
    error,
  };
};


