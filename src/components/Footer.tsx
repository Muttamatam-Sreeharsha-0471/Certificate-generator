import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          Created by{' '}
          <a
            href="https://github.com/sreeharsha-muttamatam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Sreeharsha Muttamatam
          </a>
        </p>
        <p className="text-xs mt-2 text-gray-400">
          © {new Date().getFullYear()} GDG SIMATS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;