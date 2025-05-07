
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-6 bg-white rounded-xl shadow-sm p-6">
      <Skeleton className="h-32 w-32 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
    
    {[1, 2, 3].map(i => (
      <div key={i}>
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
    ))}
  </div>
);

export default LoadingState;
