
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme/ThemeProvider';
import AppLayout from './components/app/AppLayout'; 
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import VerifyEmail from './pages/VerifyEmail';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import Trails from './pages/Trails';
import RouteDetail from './pages/RouteDetail';
import LandingPage from './pages/Index'; // Fixed import for LandingPage

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/app/*" element={<AppLayout />} />
            <Route path="/app/settings" element={<Settings />} />
            <Route path="/app/trails" element={<Trails />} />
            <Route path="/app/routes/:routeId" element={<RouteDetail />} />
            <Route path="/app/subscription/success" element={<SubscriptionSuccess />} />
          </Routes>
        </Router>
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
