import React from 'react';

interface TimerInputProps {
  value: string;
  onChange: (value: string) => void;
  onStart: () => void;
}

export function TimerInput({ value, onChange, onStart }: TimerInputProps) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 text-center px-2 py-1 border rounded-lg mr-2"
          min="1"
        />
        <span className="text-gray-600">minutes</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onStart();
        }}
        className="px-8 py-3 rounded-lg font-semibold transition-colors bg-green-500 hover:bg-green-600 text-white text-lg"
      >
        Start
      </button>
    </div>
  );
}