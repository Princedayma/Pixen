import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'cinematic';
  className?: string;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  variant = 'default', 
  className = '',
  onClick 
}: CardProps) {
  const baseClass = variant === 'cinematic' ? 'card-cinematic' : 'card';
  
  return (
    <div 
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
