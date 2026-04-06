import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-white text-center px-4">
      <img
        src="/images/backgrounds/not-found.png"
        alt="404 Not Found"
        className="max-w-xs md:max-w-sm w-full"
      />

      <p className="text-gray-600 mt-6 text-lg">
        Halaman yang kamu cari tidak ditemukan.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-primary-orange text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out"
        >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;
