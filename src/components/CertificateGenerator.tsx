import React, { useState } from 'react';
import { Loader2, Upload, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EventForm from './EventForm';
import FileUpload from './FileUpload';
import ManualEntryForm from './ManualEntryForm';
import CertificatePreview from './CertificatePreview';
import { parseFile } from '../utils/fileParser';
import type { EventDetails, ParticipantData } from '../types';

const CertificateGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [generationMode, setGenerationMode] = useState<'single' | 'bulk'>('single');
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [inputMethod, setInputMethod] = useState<'manual' | 'json' | 'csv'>('manual');

  const handleEventSubmit = (details: EventDetails) => {
    setEventDetails(details);
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const data = await parseFile(file);
      setParticipants(data);
      toast.success('File processed successfully');
    } catch (error) {
      toast.error('Error processing file');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualEntry = (data: ParticipantData) => {
    setParticipants([data]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        GDG SIMATS Certificate Generator
      </h1>

      {!eventDetails ? (
        <EventForm onSubmit={handleEventSubmit} />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setGenerationMode('single')}
              className={`px-4 py-2 rounded-lg ${
                generationMode === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Single Certificate
            </button>
            <button
              onClick={() => setGenerationMode('bulk')}
              className={`px-4 py-2 rounded-lg ${
                generationMode === 'bulk'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Bulk Generation
            </button>
          </div>

          {generationMode === 'single' && (
            <div className="space-y-4">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => setInputMethod('manual')}
                  className={`px-4 py-2 rounded-lg ${
                    inputMethod === 'manual'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setInputMethod('json')}
                  className={`px-4 py-2 rounded-lg ${
                    inputMethod === 'json'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  JSON Upload
                </button>
                <button
                  onClick={() => setInputMethod('csv')}
                  className={`px-4 py-2 rounded-lg ${
                    inputMethod === 'csv'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  CSV Upload
                </button>
              </div>

              {inputMethod === 'manual' ? (
                <ManualEntryForm onSubmit={handleManualEntry} />
              ) : (
                <FileUpload
                  accept={inputMethod === 'json' ? '.json' : '.csv'}
                  onUpload={handleFileUpload}
                />
              )}
            </div>
          )}

          {generationMode === 'bulk' && (
            <FileUpload
              accept=".json,.csv"
              onUpload={handleFileUpload}
            />
          )}

          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin" />
              <span className="ml-2">Processing...</span>
            </div>
          )}

          {participants.length > 0 && (
            <CertificatePreview
              eventDetails={eventDetails}
              participants={participants}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;