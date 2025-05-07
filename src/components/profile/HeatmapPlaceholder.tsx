
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HeatmapPlaceholder: React.FC = () => {
  // Gere uma matriz de cores aleatórias para simular um heatmap
  const generateHeatmapData = () => {
    const days = 7;
    const weeks = 10;
    const heatData = [];
    
    const intensities = ['bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'];
    
    for (let i = 0; i < days; i++) {
      const weekData = [];
      for (let j = 0; j < weeks; j++) {
        // 30% de chance de ter atividade
        const hasActivity = Math.random() < 0.3;
        if (hasActivity) {
          const intensityIndex = Math.floor(Math.random() * intensities.length);
          weekData.push(intensities[intensityIndex]);
        } else {
          weekData.push('bg-gray-100');
        }
      }
      heatData.push(weekData);
    }
    
    return heatData;
  };
  
  const heatmapData = generateHeatmapData();
  const weekLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
  const dayLabels = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Heat Map de Atividades</h3>
        
        <div className="flex">
          {/* Day labels column */}
          <div className="flex flex-col justify-between pr-2 pt-6">
            {dayLabels.map((day, index) => (
              <div key={index} className="text-xs text-muted-foreground h-4">{day}</div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="flex-1 overflow-x-auto">
            <div className="mb-2 pl-1 flex space-x-2">
              {weekLabels.map((week, index) => (
                <div key={index} className="text-xs text-muted-foreground w-4 text-center">{week}</div>
              ))}
            </div>
            
            <div className="grid grid-rows-7 gap-1">
              {heatmapData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-1">
                  {row.map((cellColor, cellIndex) => (
                    <div 
                      key={cellIndex} 
                      className={`w-4 h-4 rounded-sm ${cellColor}`}
                      title={`Atividade em ${weekLabels[cellIndex]} - ${dayLabels[rowIndex]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end items-center gap-2">
          <span className="text-xs text-muted-foreground">Menos</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
            <div className="w-3 h-3 rounded-sm bg-green-100"></div>
            <div className="w-3 h-3 rounded-sm bg-green-200"></div>
            <div className="w-3 h-3 rounded-sm bg-green-300"></div>
            <div className="w-3 h-3 rounded-sm bg-green-400"></div>
            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
          </div>
          <span className="text-xs text-muted-foreground">Mais</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapPlaceholder;
