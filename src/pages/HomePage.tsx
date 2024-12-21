import React from 'react';
import EventDetailsForm from '../components/forms/EventDetailsForm';

const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        GDG SIMATS Certificate Generator
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Generate professional certificates for your GDG events with ease
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <EventDetailsForm />
      </div>
    </div>
  );
};

export default HomePage;