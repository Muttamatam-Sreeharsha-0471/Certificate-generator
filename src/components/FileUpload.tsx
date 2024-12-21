import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  accept: string;
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ accept, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && accept.includes(file.name.split('.').pop() || '')) {
      onUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop your file here, or{' '}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-blue-600 hover:text-blue-500"
        >
          browse
        </button>
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supported formats: {accept.replace(/\./g, '').toUpperCase()}
      </p>
    </div>
  );
};

export default FileUpload;