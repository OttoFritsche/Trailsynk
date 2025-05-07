
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dados de exemplo para os gráficos de performance
const mockPerformanceData = [
  { distance: 0, speed: 0, elevation: 100, heartRate: 75 },
  { distance: 2, speed: 18, elevation: 105, heartRate: 110 },
  { distance: 4, speed: 22, elevation: 120, heartRate: 130 },
  { distance: 6, speed: 25, elevation: 135, heartRate: 145 },
  { distance: 8, speed: 20, elevation: 150, heartRate: 155 },
  { distance: 10, speed: 23, elevation: 145, heartRate: 160 },
  { distance: 12, speed: 26, elevation: 130, heartRate: 158 },
  { distance: 14, speed: 24, elevation: 110, heartRate: 150 },
  { distance: 16, speed: 19, elevation: 105, heartRate: 145 },
  { distance: 18, speed: 21, elevation: 120, heartRate: 140 },
  { distance: 20, speed: 23, elevation: 135, heartRate: 148 },
  { distance: 22, speed: 25, elevation: 125, heartRate: 152 },
  { distance: 24, speed: 18, elevation: 110, heartRate: 145 },
  { distance: 26, speed: 15, elevation: 100, heartRate: 135 },
  { distance: 28, speed: 20, elevation: 95, heartRate: 130 },
  { distance: 30, speed: 22, elevation: 100, heartRate: 125 },
  { distance: 32, speed: 20, elevation: 100, heartRate: 120 },
];

export const ActivityPerformanceChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockPerformanceData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="distance" name="Distância" unit=" km" />
            <YAxis yAxisId="left" orientation="left" stroke="#2ECC71" />
            <YAxis yAxisId="right" orientation="right" stroke="#2C3E50" />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'speed') return [`${value} km/h`, 'Velocidade'];
                if (name === 'heartRate') return [`${value} bpm`, 'Freq. Cardíaca'];
                return [value, name];
              }}
              labelFormatter={(label) => `Distância: ${label} km`}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="speed" 
              stroke="#2ECC71" 
              fill="#2ECC71" 
              fillOpacity={0.3} 
              activeDot={{ r: 8 }} 
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="heartRate" 
              stroke="#2C3E50" 
              fill="#2C3E50"
              fillOpacity={0.1} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-2 text-xs">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
          <span>Velocidade</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#2C3E50] mr-1"></div>
          <span>Frequência Cardíaca</span>
        </div>
      </div>
    </div>
  );
};
