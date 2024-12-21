import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react';
import { Button } from '../ui/Button';
import type { EventDetails, ParticipantData } from '../../types';

interface CertificatePreviewProps {
  eventDetails: EventDetails;
  participant: ParticipantData;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  eventDetails,
  participant,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = () => {
    if (!certificateRef.current) return;

    const options = {
      margin: 0,
      filename: `${participant.name}-gdg-certificate.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    html2pdf().from(certificateRef.current).set(options).save();
  };

  return (
    <div className="relative">
      <Button
        onClick={downloadCertificate}
        className="absolute top-4 right-4 z-20"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Certificate
      </Button>

      <div
        ref={certificateRef}
        className="w-full aspect-[1.414] bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
        style={{ maxWidth: '297mm' }}
      >
        {/* Certificate Content */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center p-8">
          {/* Header */}
          <div className="w-full">
            <h1 className="text-5xl font-bold text-gray-800">
              Google Developer Groups
            </h1>
            <div className="w-[550px] h-px bg-gray-300 mt-7 mx-auto"></div>
            <p className="text-sm font-semibold text-gray-600">
              OnCampus
            </p>
            <h1 className="text-4xl font-bold text-gray-800">
              SIMATS Engineering
            </h1>
            <p className="text-2xl font-semibold text-blue-600 mt-3">
              {eventDetails.eventType}
            </p>
            <p className="text-xl text-gray-600 mt-2">
              Certificate of Achievement
            </p>
          </div>

          {/* Main Content */}
          <div className="flex-grow flex flex-col justify-center items-center w-full px-4">
            <p className="text-2xl text-gray-700 mb-2">
              This is to certify that
            </p>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              {participant.name}
            </h2>
            <div className="w-[500px] h-px bg-gray-300 mx-auto mt-2"></div>
            <p className="text-2xl text-gray-700 mb-2 mt-2">
              has successfully participated in
            </p>
            <div className="bg-white bg-opacity-50 px-8 py-2 rounded-lg mb-6">
              <h3 className="text-3xl font-semibold text-blue-600">
                {eventDetails.eventName}
              </h3>
            </div>
            <p className="text-xl text-gray-600">
              demonstrating exceptional engagement and contribution to
              the developer community.
            </p>
          </div>

          {/* Footer */}
          <div className="w-full">
            <div className="flex justify-between items-end">
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-800">
                  {participant.collegeName}
                </p>
                <p className="text-md text-gray-600">
                  {participant.yearOfStudy}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                  GDG Chapter Lead
                </p>
                <p className="text-md text-gray-600">
                  SIMATS Engineering
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-300">
              <p className="text-sm text-gray-500">
                This certificate was awarded on{' '}
                {new Date().toLocaleDateString()} as part of the Google
                Developer Groups program.
              </p>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-[30%] h-[35%] bg-blue-500 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-[30%] h-[35%] bg-red-500 rounded-full opacity-70 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[35%] bg-yellow-500 rounded-full opacity-70 -translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[30%] h-[35%] bg-green-500 rounded-full opacity-70 translate-x-1/2 translate-y-1/2" />

          {/* Google Logo Background */}
          <div className="absolute inset-0 z-0 opacity-5">
            <svg
              className="w-full h-full"
              viewBox="0 -65.5 256 256"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              {/* SVG paths from your example */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;