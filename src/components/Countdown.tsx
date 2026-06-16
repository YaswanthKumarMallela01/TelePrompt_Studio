import React from 'react';

interface CountdownProps {
  value: number | null;
}

const Countdown: React.FC<CountdownProps> = ({ value }) => {
  if (value === null) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/75" />
      <span
        key={value}
        className="relative text-white font-bold animate-ping-once"
        style={{ fontSize: '8rem', lineHeight: 1 }}
      >
        {value}
      </span>
    </div>
  );
};

export default Countdown;
