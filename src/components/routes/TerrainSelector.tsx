import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TerrainSelectorProps {
  trailPercentage: number;
  onTrailPercentageChange: (value: number) => void;
  gravelPercentage: number;
  onGravelPercentageChange: (value: number) => void;
  roadPercentage: number;
  onRoadPercentageChange: (value: number) => void;
}

const TerrainSelector: React.FC<TerrainSelectorProps> = ({
  trailPercentage,
  onTrailPercentageChange,
  gravelPercentage,
  onGravelPercentageChange,
  roadPercentage,
  onRoadPercentageChange
}) => {
  const handleTrailChange = (value: number[]) => {
    const newTrail = value[0];
    const remaining = 100 - newTrail;
    const gravelRatio = gravelPercentage / (gravelPercentage + roadPercentage || 1);
    
    const newGravel = Math.round(remaining * gravelRatio);
    const newRoad = remaining - newGravel;
    
    onTrailPercentageChange(newTrail);
    onGravelPercentageChange(newGravel);
    onRoadPercentageChange(newRoad);
  };
  
  const handleGravelChange = (value: number[]) => {
    const newGravel = value[0];
    const oldGravel = gravelPercentage;
    
    // Calculate by how much gravel changed
    const gravelDiff = newGravel - oldGravel;
    
    // Adjust road by the opposite amount to keep total at 100%
    const newRoad = Math.max(0, roadPercentage - gravelDiff);
    
    // If road would go negative, adjust trail and gravel
    if (roadPercentage - gravelDiff < 0) {
      const deficit = Math.abs(roadPercentage - gravelDiff);
      const newTrail = trailPercentage + deficit;
      onTrailPercentageChange(newTrail);
      onGravelPercentageChange(100 - newTrail);
      onRoadPercentageChange(0);
    } else {
      onGravelPercentageChange(newGravel);
      onRoadPercentageChange(newRoad);
    }
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Tipo de Terreno</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="trail-percentage">Trilha</Label>
              <span className="text-xs font-medium">{trailPercentage}%</span>
            </div>
            <Slider 
              id="trail-percentage"
              value={[trailPercentage]} 
              min={0} 
              max={100} 
              step={5} 
              onValueChange={handleTrailChange}
              className="h-2"
            />
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-green-500 to-green-700"></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="gravel-percentage">Cascalho</Label>
              <span className="text-xs font-medium">{gravelPercentage}%</span>
            </div>
            <Slider 
              id="gravel-percentage"
              value={[gravelPercentage]} 
              min={0} 
              max={100 - trailPercentage} 
              step={5} 
              onValueChange={handleGravelChange}
              className="h-2"
            />
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700"></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="road-percentage">Estrada</Label>
              <span className="text-xs font-medium">{roadPercentage}%</span>
            </div>
            <Slider 
              id="road-percentage"
              value={[roadPercentage]} 
              min={0} 
              max={100 - trailPercentage - gravelPercentage} 
              step={5}
              disabled
              className="h-2"
            />
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-600"></div>
          </div>
          
          <div className="flex w-full h-4 mt-2 overflow-hidden rounded-full">
            <div 
              className="bg-green-500" 
              style={{ width: `${trailPercentage}%` }} 
            ></div>
            <div 
              className="bg-yellow-500" 
              style={{ width: `${gravelPercentage}%` }} 
            ></div>
            <div 
              className="bg-gray-400" 
              style={{ width: `${roadPercentage}%` }} 
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TerrainSelector;
