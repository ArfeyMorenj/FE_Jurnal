import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800 px-4 md:px-10 py-10 flex justify-center">
      <div className="w-full max-w-4xl mx-auto">

        {/* Logo */}
        <div className="w-full flex justify-center mb-6">
          <img src="/images/logo.png" alt="Mi Jurnal" className="h-14" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#CA2323] mb-4 text-left">
          Syarat dan Ketentuan
        </h2>

        {/* Subheading */}
        <h3 className="font-bold text-[#132F41] text-[18px] text-left mb-5">
          Persetujuan Anda
        </h3>

        <p className="text-md text-[17px] mb-6 text-[#818181] text-left">
          Tanggal Berlaku Terakhir: 16 Desember 2025
        </p>

        {/* CONTENT */}
        <div className="text-sm leading-7 text-[#818181] space-y-6 text-left">

          <p>
            Dokumen Syarat dan Ketentuan (“Ketentuan”) ini mengatur hubungan hukum antara Pengguna
            (“Anda”) dan penyedia aplikasi MiJurnal (“Kami”), yang menyediakan layanan pencatatan,
            manajemen, dan pengelolaan jurnal mengajar, jurnal siswa, jurnal aktivitas, serta jurnal
            pendidikan lainnya (“Layanan”). Dengan membuat akun, mengakses, atau menggunakan
            Layanan, Anda menyatakan telah membaca, memahami, dan setuju terikat pada Ketentuan ini.
            Apabila Anda tidak setuju dengan Ketentuan ini, mohon untuk tidak menggunakan Layanan.
          </p>

          {/* 1 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">1. PENERIMAAN DAN PERUBAHAN KETENTUAN</h3>
            <div className="pl-5 space-y-1">
              <p>1.1. Ketentuan ini berlaku sebagai perjanjian sah antara Anda dan Kami.</p>
              <p>1.2. Kami berhak mengubah, memperbarui, menambah, atau mengganti sebagian atau seluruh isi Ketentuan ini setiap saat.</p>
              <p>1.3. Perubahan akan berlaku efektif setelah dipublikasikan melalui aplikasi atau situs resmi MiJurnal.</p>
              <p>1.4. Penggunaan Layanan secara berkelanjutan setelah adanya perubahan dianggap sebagai bentuk persetujuan Anda.</p>
            </div>
          </div>

          {/* 2 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">2. KELAYAKAN PENGGUNA</h3>
            <div className="pl-5 space-y-1">
              <p>2.1. Pengguna harus memiliki kapasitas hukum untuk membuat perjanjian sesuai dengan hukum yang berlaku.</p>
              <p>2.2. Untuk pengguna sekolah, instansi, atau lembaga pendidikan, Anda menyatakan bahwa Anda berwenang mewakili institusi.</p>
              <p>2.3. Anak di bawah umur harus mendapatkan izin dari wali atau pihak sekolah.</p>
            </div>
          </div>

          {/* 3 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">3. AKUN DAN KEAMANAN</h3>

            <div className="pl-5 space-y-1">
              <p>3.1. Untuk mengakses Layanan secara penuh, Anda diwajibkan membuat akun.</p>

              <div className="pl-5 space-y-1">
                <p>3.2. Anda bertanggung jawab atas:</p>
                <p>a. menjaga kerahasiaan kredensial akun,</p>
                <p>b. seluruh aktivitas yang menggunakan akun Anda,</p>
                <p>c. memastikan perangkat Anda aman dari akses tidak sah.</p>
              </div>

              <p>3.3. Kami berhak menangguhkan atau menonaktifkan akun jika menemukan pelanggaran, penyalahgunaan.</p>
            </div>
          </div>

          {/* 4 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">4. LINGKUP LAYANAN</h3>

            <div className="pl-5 space-y-1">
              <p>4.1. MiJurnal menyediakan fitur berupa:</p>

              <div className="pl-6 space-y-1">
                <p>a. Jurnal Mengajar,</p>
                <p>b. Jurnal Siswa,</p>
                <p>c. Jurnal Kegiatan dan Administrasi,</p>
                <p>d. Riwayat aktivitas pembelajaran,</p>
                <p>e. Pengelolaan akun guru dan siswa,</p>
                <p>f. Fitur tambahan lain yang dapat ditambah atau dihilangkan sewaktu-waktu.</p>
              </div>

              <p>4.2. Layanan dapat mengalami pembaruan, penyesuaian, atau peningkatan sistem tanpa pemberitahuan sebelumnya.</p>
              <p>4.3. Kami tidak menjamin bahwa seluruh fitur akan tersedia secara terus-menerus tanpa gangguan.</p>
            </div>
          </div>

          {/* 5 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">5. PENGGUNAAN YANG DILARANG</h3>

            <div className="pl-5 space-y-1">
              <p>a. menggunakan Layanan untuk kegiatan ilegal atau melanggar kebijakan sekolah,</p>
              <p>b. mengunggah konten palsu, berbahaya, menyesatkan, atau melanggar privasi pihak lain,</p>
              <p>c. merusak sistem, melakukan peretasan, atau mencoba mendapatkan akses tidak sah,</p>
              <p>d. melakukan scraping, ekstraksi data otomatis, atau aktivitas serupa,</p>
              <p>e. menggunakan Layanan untuk tujuan komersial tanpa izin tertulis.</p>
            </div>
          </div>

          {/* 6 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">6. KEBIJAKAN PRIVASI DAN PENGOLAHAN DATA</h3>

            <div className="pl-5 space-y-1">
              <p>6.1. Kami mengumpulkan data yang diperlukan untuk menyediakan Layanan, termasuk data pribadi guru, siswa, aktivitas pembelajaran, serta data institusi pendidikan.</p>
              <p>6.2. Penggunaan Layanan berarti Anda menyetujui pemrosesan data sesuai Kebijakan Privasi MiJurnal.</p>
              <p>6.3. Kami tidak akan menjual, menyewakan, atau mengalihkan data pribadi kepada pihak ketiga tanpa dasar hukum atau persetujuan.</p>
              <p>6.4. Kami berhak mengolah data secara anonim untuk analisis, peningkatan layanan, dan statistik internal.</p>
            </div>
          </div>

          {/* 7 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">7. KEAKURATAN DAN KETERSEDIAAN INFORMASI</h3>

            <div className="pl-5 space-y-1">
              <p>7.1. Kami tidak menjamin bahwa seluruh data, catatan, fitur, atau informasi dalam Layanan bebas dari kesalahan atau perubahan.</p>
              <p>7.2. Pengguna bertanggung jawab memastikan keakuratan data jurnal yang diinput.</p>
              <p>7.3. Perubahan kurikulum, aturan sekolah, atau kebijakan internal lembaga dapat memengaruhi fungsi Layanan.</p>
            </div>
          </div>

          {/* 8 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">8. PENAFIAN JAMINAN</h3>

            <div className="pl-5 space-y-1">
              <p>8.1. Layanan diberikan “SEBAGAIMANA ADANYA” dan “SEBAGAIMANA TERSEDIA”.</p>
              <p>8.2. Kami tidak memberikan jaminan atas:</p>

              <div className="pl-6 space-y-1">
                <p>- ketersediaan tanpa gangguan,</p>
                <p>- hasil penggunaan,</p>
                <p>- kesesuaian untuk tujuan khusus,</p>
                <p>- keamanan absolut dari akses ilegal.</p>
              </div>

              <p>8.3. Anda menggunakan Layanan sepenuhnya atas risiko Anda sendiri.</p>
            </div>
          </div>

          {/* 9 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">9. BATASAN TANGGUNG JAWAB</h3>

            <div className="pl-5 space-y-1">
              <p>a. Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial, termasuk kehilangan data dan gangguan operasional.</p>
              <p>b. Kami tidak bertanggung jawab atas kesalahan yang disebabkan oleh pengguna, perangkat, jaringan internet, atau pihak ketiga.</p>
              <p>c. Total tanggung jawab Kami, jika ada, dibatasi pada biaya langganan yang dibayarkan selama 12 bulan terakhir.</p>
            </div>
          </div>

          {/* 10 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">10. HAK KEKAYAAN INTELEKTUAL</h3>

            <div className="pl-5 space-y-1">
              <p>10.1. Seluruh konten, desain, kode, nama aplikasi, logo, ikon, dan materi visual adalah milik MiJurnal dan dilindungi hukum.</p>
              <p>10.2. Anda dilarang menyalin, mendistribusikan, memodifikasi, menduplikasi, atau membuat turunan tanpa izin tertulis.</p>
              <p>10.3. Seluruh data jurnal yang Anda buat tetap menjadi milik Anda atau institusi pendidikan Anda.</p>
            </div>
          </div>

          {/* 11 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">11. LAYANAN BERBAYAR DAN LANGGANAN</h3>

            <div className="pl-5 space-y-1">
              <p>11.1. Beberapa fitur mungkin tersedia dalam paket premium.</p>
              <p>11.2. Semua biaya bersifat final dan tidak dapat dikembalikan, kecuali diwajibkan oleh hukum.</p>
              <p>11.3. Kami berhak mengubah harga dan struktur paket langganan dengan pemberitahuan sebelumnya.</p>
            </div>
          </div>

          {/* 12 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">12. PENGHENTIAN AKSES</h3>

            <div className="pl-5 space-y-1">
              <p>12.1. Anda dapat menghentikan penggunaan kapan saja.</p>
              <p>12.2. Kami dapat menonaktifkan akun apabila:</p>

              <div className="pl-6 space-y-1">
                <p>- terjadi pelanggaran berat,</p>
                <p>- ada ancaman keamanan,</p>
                <p>- ada permintaan hukum.</p>
              </div>

              <p>12.3. Penghentian akses tidak menghapus kewajiban hukum yang telah ada sebelumnya.</p>
            </div>
          </div>

          {/* 13 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">13. KLAIM PELANGGARAN HAK CIPTA</h3>
            <p>
              Setiap klaim pelanggaran hak cipta atau kekayaan intelektual dapat dikirimkan melalui kontak resmi MiJurnal. Kami akan menindaklanjuti sesuai hukum yang berlaku.
            </p>
          </div>

          {/* 14 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">14. HUKUM YANG BERLAKU DAN WILAYAH YURISDIKSI</h3>

            <div className="pl-5 space-y-1">
              <p>14.1. Ketentuan ini diatur oleh hukum Republik Indonesia.</p>
              <p>14.2. Segala perselisihan akan diselesaikan terlebih dahulu melalui mediasi.</p>
              <p>14.3. Jika mediasi gagal, maka sengketa diselesaikan melalui Pengadilan Negeri sesuai domisili penyedia layanan.</p>
            </div>
          </div>

          {/* 15 */}
          <div>
            <h3 className="font-semibold text-[#818181] mb-2">15. KETENTUAN UMUM</h3>

            <div className="pl-5 space-y-1">
              <p>15.1. Jika ada bagian dari Ketentuan ini yang dianggap tidak sah, ketentuan lainnya tetap berlaku.</p>
              <p>15.2. Ketentuan ini merupakan keseluruhan perjanjian antara Anda dan Kami.</p>
              <p>15.3. Tidak ada hubungan kemitraan, keagenan, atau perwakilan antara pengguna dan MiJurnal hanya karena penggunaan Layanan.</p>
              <p>15.4. Kepala bagian (judul) hanya digunakan untuk kemudahan dan tidak memengaruhi penafsiran hukum.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
