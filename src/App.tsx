import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SingleCertificatePage from './pages/SingleCertificatePage';
import BulkCertificatePage from './pages/BulkCertificatePage';
import PreviewPage from './pages/PreviewPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/single" element={<SingleCertificatePage />} />
            <Route path="/bulk" element={<BulkCertificatePage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;