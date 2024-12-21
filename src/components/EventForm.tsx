import React from 'react';
import type { EventDetails } from '../types';

interface EventFormProps {
  onSubmit: (details: EventDetails) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    onSubmit({
      eventName: formData.get('eventName') as string,
      eventType: formData.get('eventType') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
          Event Name
        </label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., DevFest 2024"
        />
      </div>

      <div>
        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
          Event Type
        </label>
        <input
          type="text"
          id="eventType"
          name="eventType"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Conference"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Continue
      </button>
    </form>
  );
};

export default EventForm;