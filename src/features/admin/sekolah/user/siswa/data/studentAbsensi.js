// ../data/studentAbsensi.js
// 21 contoh catatan absensi (tanggal dummy sama, status berganti)
const statuses = ["Hadir", "Izin", "Sakit", "Alpha"];
const absensi = Array.from({ length: 21 }).map((_, i) => {
  const s = statuses[i % statuses.length];
  const day = 17 + (i % 7); // sekedar variasi tanggal
  return {
    id: i + 1,
    tanggal: `Senin, ${day} Agustus 1945`, // mengikuti contoh tampilan tgl di gambar
    status: s,
    jam_masuk: s === "Hadir" ? "07:30" : "-",
  };
});

export default absensi;
