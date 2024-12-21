import React, { useRef, useState } from 'react';
import { Upload, Loader2, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { fileFormats } from '../../utils/fileFormats';

interface FileUploadProps {
  accept: string;
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  accept, 
  onUpload,
  isLoading = false 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showFormat, setShowFormat] = useState(false);

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

  const getFormatExample = () => {
    if (accept === '.json') return fileFormats.json;
    if (accept === '.csv') return fileFormats.csv;
    return '';
  };

  return (
    <div className="space-y-4">
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
        {isLoading ? (
          <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
        ) : (
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
        )}
        <p className="mt-4 text-sm text-gray-600">
          Drag and drop your file here, or{' '}
          <Button
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-600 hover:text-blue-500 p-0 h-auto"
          >
            browse
          </Button>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported format: {accept.replace(/\./g, '').toUpperCase()}
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setShowFormat(!showFormat)}
          className="text-sm text-gray-600 flex items-center gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          {showFormat ? 'Hide' : 'Show'} expected format
        </Button>
      </div>

      {showFormat && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-xs text-gray-600 overflow-x-auto">
            {getFormatExample()}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;