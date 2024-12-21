import Papa from 'papaparse';
import { toast } from 'react-hot-toast';
import type { ParticipantData } from '../types';

interface CSVParseResult {
  totalRows: number;
  headers: string[];
  data: any[];
}

export const parseCSVFile = (file: File): Promise<CSVParseResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const headers = results.meta.fields || [];
          const requiredFields = ['name', 'email', 'collegeName', 'yearOfStudy'];
          
          // Check if all required fields are present (case-insensitive)
          const normalizedHeaders = headers.map(h => h.toLowerCase());
          const missingFields = requiredFields.filter(field => 
            !normalizedHeaders.some(h => h.replace(/[^a-z]/g, '') === field.toLowerCase())
          );

          if (missingFields.length > 0) {
            throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
          }

          resolve({
            totalRows: results.data.length,
            headers,
            data: results.data
          });
        } catch (error: any) {
          reject(error);
        }
      },
      error: (error) => reject(new Error(`CSV parsing error: ${error.message}`))
    });
  });
};