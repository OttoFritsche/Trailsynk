
export const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const formatDuration = (minutes: number) => {
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;
  
  return `${days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${mins}min`;
};

export const handleStravaConnect = () => {
  // In a real application, this would be your backend endpoint that
  // handles the OAuth flow initiation
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://your-backend-url.com';
  const endpoint = `${backendUrl}/auth/strava`;
  
  // Using window.location to redirect to the backend endpoint
  // The backend will then redirect to Strava's authorization page
  window.location.href = endpoint;
};
