let BASE_STORAGE_URL = import.meta.env.VITE_API_BASE_URL;

//get image url dari api
export const getImageUrl = (path) => {
  if (!path) {
    return "/images/default.jpg";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const storageUrl = BASE_STORAGE_URL.replace(/\/api\/?$/, "/storage");
  return `${storageUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};
