import { SlidersHorizontal } from "lucide-react";

export default function FilterButton({
  onClick,
  className = "",
  width = 50,
  height = 40,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center rounded-md border 
        border-primary-red text-primary-red 
        hover:bg-primary-red hover:text-white 
        transition-colors duration-200
        ${className}
      `}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <SlidersHorizontal size={Math.min(width, height) * 0.45} />
    </button>
  );
}
