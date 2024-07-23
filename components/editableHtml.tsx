import React, { useRef, useEffect } from 'react';

interface EditableHtmlProps {
  initialHtml: string;
  onChange?: (html: string) => void;
}

const EditableHtml = ({ initialHtml, onChange }: EditableHtmlProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = initialHtml;
    }
  }, [initialHtml]);

  const handleInput = () => {
    if (divRef.current) {
      onChange?.(divRef.current.innerHTML);
    }
  };

  return (
    <div
      ref={divRef}
      contentEditable
      onInput={handleInput}
      className="p-2 border rounded ring-2 ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[200px]"
    />
  );
};

export default EditableHtml;