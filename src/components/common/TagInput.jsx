import React, { useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

const TagInput = ({ value = [], onChange, error }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const newTag = inputValue.trim().replace(/^#*/, "");
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }

    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleInputChange = (e) => {
    let text = e.target.value.replace(/^#/, "");

    // Jika ada koma (HP atau laptop)
    if (text.includes(",") || text.includes("，")) {
      const parts = text
        .split(/,|，/)
        .map((t) => t.trim())
        .filter(Boolean);

      if (parts.length > 0) {
        const newTags = [...value];
        parts.forEach((p) => {
          if (!newTags.includes(p)) newTags.push(p);
        });
        onChange(newTags);
      }
      setInputValue("");
    } else {
      setInputValue(text);
    }
  };

  return (
    <div>
      <div className={`border rounded-lg p-2 flex flex-wrap items-center gap-2 ${
        error ? "border-red-500" : "border-[#D2D2D2]"
      }`}>
        {value.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-md flex items-center gap-1"
          >
            #{tag}
            <button
              type="button"
              className="text-gray-500 hover:text-red-500"
              onClick={() => onChange(value.filter((t) => t !== tag))}
            >
              &times;
            </button>
          </span>
        ))}

        <input
          type="text"
          className="flex-1 outline-none text-sm px-1"
          placeholder={value.length === 0 ? "Masukkan hashtag berita Anda" : ""}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <IoAlertCircleOutline /> {error}
        </p>
      )}
    </div>
  );
};

export default TagInput;
