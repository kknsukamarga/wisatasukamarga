"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        }}
        className="max-w-screen-2xl"
      />
    </div>
  );
}
