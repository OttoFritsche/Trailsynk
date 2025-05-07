
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const StatsTab: React.FC = () => {
  return (
    <div className="py-12 text-center">
      <Button asChild>
        <Link to="/app/statistics">
          Ver Estatísticas Completas
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default StatsTab;
