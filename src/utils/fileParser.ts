import Papa from 'papaparse';
import { toast } from 'react-hot-toast';
import type { ParticipantData } from '../types';

const validateParticipant = (data: any): ParticipantData => {
  const requiredFields = ['name', 'email', 'collegeName', 'yearOfStudy'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  return {
    name: String(data.name).trim(),
    email: String(data.email).trim(),
    collegeName: String(data.collegeName).trim(),
    yearOfStudy: String(data.yearOfStudy).trim()
  };
};

const normalizeCSVHeaders = (headers: string[]): { [key: string]: string } => {
  const headerMap: { [key: string]: string } = {};
  
  headers.forEach(header => {
    const normalized = header.toLowerCase().replace(/\s+/g, '');
    if (normalized === 'name') headerMap[header] = 'name';
    else if (normalized === 'email') headerMap[header] = 'email';
    else if (normalized === 'collegename') headerMap[header] = 'collegeName';
    else if (normalized === 'yearofstudy') headerMap[header] = 'yearOfStudy';
  });

  return headerMap;
};

export const parseFile = (file: File): Promise<ParticipantData[]> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected'));
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension === 'json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          const data = Array.isArray(jsonData) ? jsonData : [jsonData];
          const validatedData = data.map(validateParticipant);
          resolve(validatedData);
        } catch (error) {
          reject(new Error('Invalid JSON format'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    } 
    else if (extension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const headerMap = normalizeCSVHeaders(results.meta.fields || []);
            
            // Transform CSV data to match our data structure
            const transformedData = results.data.map((row: any) => {
              const transformed: any = {};
              Object.entries(headerMap).forEach(([original, normalized]) => {
                transformed[normalized] = row[original];
              });
              return transformed;
            });

            const validatedData = transformedData.map(validateParticipant);
            resolve(validatedData);
          } catch (error: any) {
            reject(new Error(error.message));
          }
        },
        error: (error) => reject(new Error(`CSV parsing error: ${error.message}`))
      });
    } 
    else {
      reject(new Error('Unsupported file format. Please use JSON or CSV.'));
    }
  });
};