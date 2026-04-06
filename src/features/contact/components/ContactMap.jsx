export default function ContactMap({ url }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm h-[350px] border-0">
      <iframe
        src={url}
        className="border-0 w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      ></iframe>
    </div>
  );
}
