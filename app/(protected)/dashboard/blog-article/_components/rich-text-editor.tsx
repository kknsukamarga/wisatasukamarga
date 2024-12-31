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
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
}
