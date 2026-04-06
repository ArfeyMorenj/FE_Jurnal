import { Toasts } from "../../../../../utils/Toast";
import apiClient from "../../../../../lib/axios";

export default function usePremium() {
  const getPremiumById = async (id) => {
    try {
      const res = await apiClient.get(`/premium-packages/${id}`);
      const json = res.data;

      if (json?.meta?.code !== 200) throw new Error(json?.meta?.message);

      return json.data;
    } catch (error) {
      console.error(error);
      Toasts("error", 3000, "Error", error.message);
      return null;
    }
  };

  return { getPremiumById };
}
