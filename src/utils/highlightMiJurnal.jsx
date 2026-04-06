import React from "react";

export const highlightMiJurnal = (text) => {
  if (!text) return text;
  const parts = text.split(/(Mi\s?Jurnal)/gi);

  return parts.map((part, i) => {
    if (part.toLowerCase().replace(/\s/g, "") === "mijurnal") {
      if (part.includes(" ")) {
        const [mi, jurnal] = part.split(/\s+/);
        return (
          <span key={i} className="font-bold">
            <span className="text-primary-red">{mi}</span>{" "}
            <span className="text-primary-orange">{jurnal}</span>
          </span>
        );
      } else {
        const mi = part.slice(0, 2);
        const jurnal = part.slice(2);
        return (
          <span key={i} className="font-bold">
            <span className="text-primary-red">{mi}</span>
            <span className="text-primary-orange">{jurnal}</span>
          </span>
        );
      }
    }
    return part;
  });
};

export const highlightJurnal = (text) => {
  if (!text) return text;
  // Split text dengan regex yang menangkap kata "Jurnal" (case insensitive)
  // Menggunakan word boundary (\b) untuk memastikan hanya kata "Jurnal" yang berdiri sendiri
  const parts = text.split(/(\bJurnal\b)/gi);

  let jurnalCount = 0; // Counter untuk track urutan kata "Jurnal"

  return parts.map((part, i) => {
    // Jika part adalah "Jurnal" (case insensitive), highlight dengan warna bergantian
    if (part.toLowerCase() === "jurnal") {
      // Bergantian antara merah dan orange
      const colorClass = jurnalCount % 2 === 0 ? "text-primary-red" : "text-primary-orange";
      jurnalCount++;
      return (
        <span key={i} className={`font-bold ${colorClass}`}>
          {part}
        </span>
      );
    }
    return part;
  });
};