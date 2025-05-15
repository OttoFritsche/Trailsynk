
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ElevationPoint {
  distance: number; // in kilometers
  elevation: number; // in meters
}

interface ElevationProfileProps {
  data: ElevationPoint[];
  className?: string;
}

const ElevationProfile: React.FC<ElevationProfileProps> = ({ data, className }) => {
  if (data.length < 2) {
    return (
      <Card className={className}>
        <CardContent className="p-4 flex items-center justify-center min-h-[100px]">
          <p className="text-gray-500 text-sm">Adicione mais pontos para ver o perfil de elevação</p>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate max and min elevation for better visualization
  const elevations = data.map(point => point.elevation);
  const minElevation = Math.floor(Math.min(...elevations));
  const maxElevation = Math.ceil(Math.max(...elevations));
  const elevationDomain = [minElevation - 5, maxElevation + 5];
  
  // Calculate total climb and descent
  let totalClimb = 0;
  let totalDescent = 0;
  
  for (let i = 1; i < data.length; i++) {
    const diff = data[i].elevation - data[i-1].elevation;
    if (diff > 0) totalClimb += diff;
    if (diff < 0) totalDescent -= diff;
  }
  
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Perfil de Elevação</h3>
          <div className="flex space-x-4 text-xs text-gray-600">
            <div>
              <span className="text-green-600 font-medium">▲ {Math.round(totalClimb)}m</span> ganho
            </div>
            <div>
              <span className="text-red-600 font-medium">▼ {Math.round(totalDescent)}m</span> perda
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="distance" 
              tickFormatter={(value) => `${value} km`}
              tickCount={5}
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              domain={elevationDomain} 
              tickFormatter={(value) => `${value}m`}
              tick={{ fontSize: 10 }}
              width={30}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} m`, 'Elevação']}
              labelFormatter={(value) => `Distância: ${value} km`}
            />
            <Area 
              type="monotone" 
              dataKey="elevation" 
              stroke="#2ECC71" 
              fill="#2ECC71" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ElevationProfile;
