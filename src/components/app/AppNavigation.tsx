
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileNavigation } from './navigation';
import { DesktopNavigation } from './navigation';

interface AppNavigationProps {
  isMobile?: boolean;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ isMobile }) => {
  const location = useLocation();
  const isDeviceMobile = useIsMobile();
  
  // Use the prop if provided, otherwise use the hook
  const showMobileNav = isMobile !== undefined ? isMobile : isDeviceMobile;
  
  if (showMobileNav) {
    return <MobileNavigation currentPath={location.pathname} />;
  }

  return <DesktopNavigation currentPath={location.pathname} />;
};

export default AppNavigation;
