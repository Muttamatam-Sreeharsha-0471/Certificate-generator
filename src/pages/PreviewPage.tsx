import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CertificatePreview from '../components/certificate/CertificatePreview';
import { Button } from '../components/ui/Button';
import { Download } from 'lucide-react';
import type { ParticipantData, EventDetails } from '../types';

const PreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    eventName: '',
    eventType: ''
  });

  useEffect(() => {
    // Get event details
    const storedEventDetails = localStorage.getItem('eventDetails');
    if (!storedEventDetails) {
      navigate('/');
      return;
    }
    setEventDetails(JSON.parse(storedEventDetails));

    // Get participant data
    const singleParticipant = localStorage.getItem('participantData');
    const multipleParticipants = localStorage.getItem('participantsData');

    if (singleParticipant) {
      setParticipants([JSON.parse(singleParticipant)]);
    } else if (multipleParticipants) {
      setParticipants(JSON.parse(multipleParticipants));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleBack = () => {
    // Clear only the participant data, keep event details
    localStorage.removeItem('participantData');
    localStorage.removeItem('participantsData');
    navigate(-1);
  };

  if (!eventDetails.eventName || participants.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Certificate Preview
        </h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          {participants.length > 1 && (
            <Button onClick={() => document.getElementById('downloadAll')?.click()}>
              <Download className="w-4 h-4 mr-2" />
              Download All ({participants.length})
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {participants.map((participant, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <CertificatePreview
              eventDetails={eventDetails}
              participant={participant}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;