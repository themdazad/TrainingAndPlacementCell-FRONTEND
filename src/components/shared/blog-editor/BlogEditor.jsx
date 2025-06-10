// components/BlogEditor.jsx
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

const BlogEditor = ({ data, onSave }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new EditorJS({
      holder: editorRef.current,
      tools: {
        header: Header,
        list: List,
        paragraph: Paragraph,
      },
      data: data || {},
      onReady: () => {
        editorInstance.current = editor;
      },
    });

    return () => {
      editor.destroy();
      editorInstance.current = null;
    };
  }, []);

  const handleSave = async () => {
    const savedData = await editorInstance.current.save();
    onSave(savedData);
  };

  return (
    <div className="w-full">
      <div
        ref={editorRef}
        className="border p-4 rounded-lg bg-white dark:bg-gray-900"
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default BlogEditor;
