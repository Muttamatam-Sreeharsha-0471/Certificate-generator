import React from 'react';
import { FileJson, FileSpreadsheet } from 'lucide-react';
import { Button } from '../ui/Button';

interface FileTypeSelectorProps {
  selectedType: 'json' | 'csv' | null;
  onSelect: (type: 'json' | 'csv') => void;
}

const FileTypeSelector: React.FC<FileTypeSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant={selectedType === 'json' ? 'default' : 'outline'}
        onClick={() => onSelect('json')}
        className="p-6"
      >
        <div className="flex flex-col items-center gap-2">
          <FileJson className="w-8 h-8" />
          <span>JSON File</span>
        </div>
      </Button>
      
      <Button
        variant={selectedType === 'csv' ? 'default' : 'outline'}
        onClick={() => onSelect('csv')}
        className="p-6"
      >
        <div className="flex flex-col items-center gap-2">
          <FileSpreadsheet className="w-8 h-8" />
          <span>CSV File</span>
        </div>
      </Button>
    </div>
  );
};

export default FileTypeSelector;