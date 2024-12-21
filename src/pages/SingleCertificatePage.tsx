import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import ManualEntryForm from '../components/forms/ManualEntryForm';
import FileUpload from '../components/forms/FileUpload';
import { parseFile } from '../utils/fileParser';
import type { ParticipantData } from '../types';

const SingleCertificatePage = () => {
  const navigate = useNavigate();
  const [inputMethod, setInputMethod] = useState<'manual' | 'json' | 'csv'>('manual');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const data = await parseFile(file, 1);
      if (data.length > 0) {
        localStorage.setItem('participantData', JSON.stringify(data[0]));
        navigate('/preview');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualEntry = (data: ParticipantData) => {
    localStorage.setItem('participantData', JSON.stringify(data));
    navigate('/preview');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Single Certificate Generation
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={inputMethod === 'manual' ? 'default' : 'outline'}
          onClick={() => setInputMethod('manual')}
        >
          Manual Entry
        </Button>
        <Button
          variant={inputMethod === 'json' ? 'default' : 'outline'}
          onClick={() => setInputMethod('json')}
        >
          JSON Upload
        </Button>
        <Button
          variant={inputMethod === 'csv' ? 'default' : 'outline'}
          onClick={() => setInputMethod('csv')}
        >
          CSV Upload
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {inputMethod === 'manual' ? (
          <ManualEntryForm onSubmit={handleManualEntry} />
        ) : (
          <FileUpload
            accept={inputMethod === 'json' ? '.json' : '.csv'}
            onUpload={handleFileUpload}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default SingleCertificatePage;