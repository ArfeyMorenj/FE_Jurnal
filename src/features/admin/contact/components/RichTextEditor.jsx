import React, { useRef, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";
import {
  ArrowRight,
  Trash2,
  Type,
  FileText,
  Link2,
  Smile,
  Image,
} from "lucide-react";

const RichTextEditor = ({
  value,
  onChange,
  onSend,
  onDiscard,
  placeholder = "Ketikkan balasan Anda.",
  disabled = false,
}) => {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#quill-toolbar-container",
        handlers: {
          bold: function () {
            this.quill.format("bold", !this.quill.getFormat().bold);
          },
          link: function () {
            const value = prompt("Enter link URL:");
            if (value) {
              this.quill.format("link", value);
            }
          },
          image: function () {
            fileInputRef.current?.click();
          },
        },
      },
    }),
    []
  );

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "image",
    "list",
    "align",
  ];

  const handleSend = () => {
    if (onSend && value.replace(/<(.|\n)*?>/g, "").trim()) {
      onSend();
    }
  };

  const isContentEmpty =
    !value || value.replace(/<(.|\n)*?>/g, "").trim() === "";

  const openEmojiKeyboard = () => {
    quillRef.current?.getEditor().focus();
    alert(
      "Tekan Win + . (Windows) atau Cmd + Ctrl + Space (Mac) untuk membuka emoji."
    );
  };

  const handleBold = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    const format = quill.getFormat();
    quill.format("bold", !format.bold);
  };

  const handleLink = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    const value = prompt("Enter link URL:");
    if (value) quill.format("link", value);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.url) {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", data.url);
        quill.setSelection(range.index + 1);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-xl p-4 bg-white">
      <div id="quill-toolbar-container" style={{ display: "none" }}>
        <button className="ql-bold"></button>
        <button className="ql-link"></button>
        <button className="ql-image"></button>
      </div>

      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        theme="snow"
        className="custom-quill-editor"
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
        accept="image/*"
      />

      {/* ======================================= */}
      {/* RESPONSIVE TOOLBAR + SEND BUTTON SECTION */}
      {/* ======================================= */}

      <div
        className="
          mt-4 pt-3 border-t border-gray-200
          flex flex-col-reverse gap-3
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* ========= LEFT TOOLBAR (mobile left, desktop right) ========= */}
        <div
          className="
            flex items-center gap-2 flex-wrap
            md:order-2
          "
        >
          <button
            onClick={handleBold}
            className="p-2.5 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center"
          >
            <Type size={20} className="text-gray-600" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center"
          >
            <FileText size={20} className="text-gray-600" />
          </button>

          <button
            onClick={handleLink}
            className="p-2.5 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center"
          >
            <Link2 size={20} className="text-gray-600" />
          </button>

          <button
            onClick={openEmojiKeyboard}
            className="p-2.5 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center"
          >
            <Smile size={20} className="text-gray-600" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center"
          >
            <Image size={20} className="text-gray-600" />
          </button>

          <button
            onClick={onDiscard}
            className="p-2.5 hover:bg-red-50 rounded-lg h-10 w-10 flex items-center justify-center"
          >
            <Trash2 size={20} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* ========= SEND BUTTON (mobile bawah, desktop kanan) ========= */}
        <div className="md:order-1">
          <button
            onClick={handleSend}
            disabled={disabled || isContentEmpty}
            className="
              bg-[#CA2323] disabled:bg-gray-300 
              text-white text-sm font-medium 
              rounded-full hover:bg-[#B21E1E]
              disabled:cursor-not-allowed
              flex items-center gap-2 h-10 px-5
            "
          >
            Kirim Pesan
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;