import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import FileUpload from '../components/forms/FileUpload';
import FileTypeSelector from '../components/bulk/FileTypeSelector';
import CSVRowSelector from '../components/bulk/CSVRowSelector';
import { Button } from '../components/ui/Button';
import { parseFile } from '../utils/fileParser';
import { parseCSVFile } from '../utils/csvParser';

const BulkCertificatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState<'json' | 'csv' | null>(null);
  const [certificateLimit, setCertificateLimit] = useState<number>(5);
  const [csvData, setCSVData] = useState<{ totalRows: number; data: any[] } | null>(null);
  const [rowRange, setRowRange] = useState({ start: 1, end: 5 });

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      if (fileType === 'csv') {
        const result = await parseCSVFile(file);
        setCSVData({
          totalRows: result.totalRows,
          data: result.data
        });
        setRowRange({ 
          start: 1, 
          end: Math.min(result.totalRows, 15) 
        });
      } else {
        const data = await parseFile(file, certificateLimit);
        if (data.length > 0) {
          localStorage.setItem('participantsData', JSON.stringify(data));
          navigate('/preview');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCSVGenerate = async () => {
    if (!csvData) return;

    try {
      const selectedData = csvData.data.slice(rowRange.start - 1, rowRange.end);
      const validatedData = await parseFile(
        new Blob([JSON.stringify(selectedData)], { type: 'application/json' }),
        15
      );
      
      if (validatedData.length > 0) {
        localStorage.setItem('participantsData', JSON.stringify(validatedData));
        navigate('/preview');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Bulk Certificate Generation
      </h1>

      {!fileType ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Select File Type</h2>
          <FileTypeSelector
            selectedType={fileType}
            onSelect={setFileType}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {fileType === 'json' ? 'JSON Upload' : 'CSV Upload'}
            </h2>
            <Button variant="outline" onClick={() => setFileType(null)}>
              Change Format
            </Button>
          </div>

          {fileType === 'json' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Certificates (Max: 15)
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={certificateLimit}
                onChange={(e) => setCertificateLimit(Math.min(15, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          <FileUpload
            accept={fileType === 'json' ? '.json' : '.csv'}
            onUpload={handleFileUpload}
            isLoading={isLoading}
          />

          {csvData && (
            <div className="mt-6">
              <CSVRowSelector
                totalRows={csvData.totalRows}
                startRow={rowRange.start}
                endRow={rowRange.end}
                onRangeChange={(start, end) => setRowRange({ start, end })}
              />
              <Button
                className="w-full mt-4"
                onClick={handleCSVGenerate}
              >
                Generate Certificates
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkCertificatePage;