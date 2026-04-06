// hapus semua tag HTML untuk membantu validasi input kosong
export const cleanHTML = (html) => {
  if (!html) return "";
  const stripped = html
    .replace(/<(.|\n)*?>/g, "") 
    .trim();

  return stripped.length === 0 ? "" : html;
};
