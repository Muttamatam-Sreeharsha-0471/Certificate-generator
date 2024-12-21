import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react';
import type { EventDetails, ParticipantData } from '../types';

interface CertificatePreviewProps {
  eventDetails: EventDetails;
  participants: ParticipantData[];
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  eventDetails,
  participants,
}) => {
  const certificateRefs = useRef<(HTMLDivElement | null)[]>([]);

  const downloadCertificate = (index: number) => {
    const element = certificateRefs.current[index];
    if (!element) return;

    const options = {
      margin: 0,
      filename: `${participants[index].name}-gdg-certificate.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    html2pdf().from(element).set(options).save();
  };

  const downloadAll = () => {
    participants.forEach((_, index) => {
      setTimeout(() => downloadCertificate(index), index * 1000);
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={downloadAll}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download size={20} />
          Download All
        </button>
      </div>

      {participants.map((participant, index) => (
        <div key={index} className="relative">
          <div
            ref={(el) => (certificateRefs.current[index] = el)}
            className="w-[297mm] h-[210mm] p-8 bg-white relative overflow-hidden"
          >
            {/* Certificate Content */}
            <div className="relative z-10 flex flex-col items-center h-full">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Google Developer Groups
                </h1>
                <h2 className="text-2xl text-gray-700">SIMATS Engineering</h2>
                <p className="text-xl text-blue-600 mt-2">{eventDetails.eventType}</p>
              </div>

              <div className="flex-grow flex flex-col items-center justify-center">
                <p className="text-xl text-gray-700 mb-4">This is to certify that</p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {participant.name}
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  has successfully participated in
                </p>
                <h3 className="text-3xl font-bold text-blue-600 mb-6">
                  {eventDetails.eventName}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl text-center">
                  demonstrating exceptional engagement and contribution to the
                  developer community
                </p>
              </div>

              <div className="w-full mt-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold">{participant.collegeName}</p>
                    <p className="text-gray-600">{participant.yearOfStudy}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Chapter Lead</p>
                    <p className="text-gray-600">GDG SIMATS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full opacity-10 translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full opacity-10 -translate-x-1/2 translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500 rounded-full opacity-10 translate-x-1/2 translate-y-1/2" />
            </div>
          </div>

          <button
            onClick={() => downloadCertificate(index)}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download size={20} />
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default CertificatePreview;