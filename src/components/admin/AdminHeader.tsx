
import React from 'react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-secondary">{title}</h1>
      {subtitle && (
        <p className="text-secondary/70 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default AdminHeader;
