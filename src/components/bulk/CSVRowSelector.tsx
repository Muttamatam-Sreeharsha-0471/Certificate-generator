import React from 'react';
import { Button } from '../ui/Button';

interface CSVRowSelectorProps {
  totalRows: number;
  startRow: number;
  endRow: number;
  onRangeChange: (start: number, end: number) => void;
}

const CSVRowSelector: React.FC<CSVRowSelectorProps> = ({
  totalRows,
  startRow,
  endRow,
  onRangeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          Total rows found: {totalRows}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Row
          </label>
          <input
            type="number"
            min={1}
            max={totalRows}
            value={startRow}
            onChange={(e) => {
              const value = Math.max(1, Math.min(totalRows, parseInt(e.target.value) || 1));
              onRangeChange(value, endRow);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Row
          </label>
          <input
            type="number"
            min={startRow}
            max={Math.min(totalRows, startRow + 14)}
            value={endRow}
            onChange={(e) => {
              const value = Math.max(startRow, Math.min(Math.min(totalRows, startRow + 14), parseInt(e.target.value) || startRow));
              onRangeChange(startRow, value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-600">
        Maximum {Math.min(15, totalRows)} certificates can be generated at once
      </p>
    </div>
  );
};

export default CSVRowSelector;