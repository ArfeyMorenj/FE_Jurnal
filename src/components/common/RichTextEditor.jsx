import React, { useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css';
import clsx from 'clsx';
import { IoAlertCircleOutline } from 'react-icons/io5';

const RichTextEditor = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Masukkan deskripsi sebagai pendukung judul yang Anda buat",
  required = false,
  error,
  className,
  labelClassName,
  height = "200px",
  showToolbar = true,
}) => {
  const modules = useMemo(() => ({
    toolbar: showToolbar ? [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['clean']
    ] : false,
  }), [showToolbar]);

  const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list',
    'align',
    'link', 'image',
    'script'
  ];

  const handleChange = (content) => {
    onChange && onChange({
      target: {
        name,
        value: content
      }
    });
  };

  return (
    <div className={clsx("mb-4", className)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "block inter text-[15px] font-regular text-black mb-1",
            labelClassName
          )}
        >
          {label} {required && <span className="text-primary-orange">*</span>}
        </label>
      )}

      <div className="border border-[#EBF1F6] rounded-[10px]">
        <div className="max-h-[400px] overflow-y-auto">
          <ReactQuill
            theme="snow"
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            modules={modules}
            formats={formats}
            style={{
              minHeight: height,
              border: 'none',
            }}
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
         <IoAlertCircleOutline /> {error}
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;
