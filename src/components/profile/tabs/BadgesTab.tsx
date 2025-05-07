
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const BadgesTab: React.FC = () => {
  return (
    <div className="py-12 text-center">
      <Button asChild>
        <Link to="/app/badges">
          Ver Todos os Badges
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default BadgesTab;
