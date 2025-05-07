
import React from 'react';
import { Link } from 'react-router-dom';

export const AppLogo: React.FC = () => {
  return (
    <Link to="/app" className="flex items-center">
      <img 
        src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
        alt="TrailSynk" 
        className="h-10"
      />
    </Link>
  );
};
