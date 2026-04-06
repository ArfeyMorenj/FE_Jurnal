export const fixUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  const full = url.startsWith("http")
    ? url
    : `${import.meta.env.VITE_BASE_URL}/storage/${url}`;

  return `${full}?v=${Date.now()}`;
};
