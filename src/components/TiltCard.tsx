import React from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};


