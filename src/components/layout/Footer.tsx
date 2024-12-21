import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <p className="text-sm">Created by Sreeharsha Muttamatam</p>
          <a
            href="https://github.com/sreeharsha-muttamatam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} GDG SIMATS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;