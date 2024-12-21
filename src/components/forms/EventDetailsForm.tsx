import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import type { EventDetails } from '../../types';

interface EventDetailsFormProps {
  onSubmit?: (details: EventDetails) => void;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const eventDetails: EventDetails = {
      eventName: formData.get('eventName') as string,
      eventType: formData.get('eventType') as string,
    };

    // Store event details in localStorage
    localStorage.setItem('eventDetails', JSON.stringify(eventDetails));

    // Call onSubmit if provided
    if (onSubmit) {
      onSubmit(eventDetails);
    }

    // Navigate to the selected route
    const route = formData.get('generationType') as string;
    navigate(`/${route}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certificate Generation Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
            <input
              type="radio"
              name="generationType"
              value="single"
              className="sr-only"
              required
            />
            <span className="flex flex-1">
              <span className="flex flex-col">
                <span className="block text-sm font-medium text-gray-900">
                  Single Certificate
                </span>
                <span className="mt-1 flex items-center text-sm text-gray-500">
                  Generate one certificate at a time
                </span>
              </span>
            </span>
            <span className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-blue-500" aria-hidden="true" />
          </label>

          <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
            <input
              type="radio"
              name="generationType"
              value="bulk"
              className="sr-only"
              required
            />
            <span className="flex flex-1">
              <span className="flex flex-col">
                <span className="block text-sm font-medium text-gray-900">
                  Bulk Generation
                </span>
                <span className="mt-1 flex items-center text-sm text-gray-500">
                  Generate multiple certificates at once
                </span>
              </span>
            </span>
            <span className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-blue-500" aria-hidden="true" />
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
};

export default EventDetailsForm;