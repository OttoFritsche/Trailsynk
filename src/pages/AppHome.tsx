
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/useAuth';
import CyclistDashboard from './CyclistDashboard';

const AppHome: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>TrailSynk | Seu Assistente Ciclista</title>
      </Helmet>

      <CyclistDashboard />
    </>
  );
};

export default AppHome;
