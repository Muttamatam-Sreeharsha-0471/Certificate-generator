import React from 'react';
import type { ParticipantData } from '../types';

interface ManualEntryFormProps {
  onSubmit: (data: ParticipantData) => void;
}

const ManualEntryForm: React.FC<ManualEntryFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      collegeName: formData.get('collegeName') as string,
      yearOfStudy: formData.get('yearOfStudy') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
          College Name
        </label>
        <input
          type="text"
          id="collegeName"
          name="collegeName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
          Year of Study
        </label>
        <select
          id="yearOfStudy"
          name="yearOfStudy"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select year</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Generate Certificate
      </button>
    </form>
  );
};

export default ManualEntryForm;