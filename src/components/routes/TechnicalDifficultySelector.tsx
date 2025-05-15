
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TechnicalDifficultyProps {
  value: string;
  onChange: (value: string) => void;
}

const TechnicalDifficultySelector: React.FC<TechnicalDifficultyProps> = ({
  value,
  onChange
}) => {
  // Define the difficulty levels and their descriptions
  const difficultyLevels = [
    { 
      value: 'S0', 
      label: 'S0 - Fácil', 
      description: 'Caminhos largos e bem definidos sem obstáculos. Ideal para iniciantes.' 
    },
    { 
      value: 'S1', 
      label: 'S1 - Básico', 
      description: 'Trilhas simples com pequenas raízes e pedras. Requer habilidades básicas.' 
    },
    { 
      value: 'S2', 
      label: 'S2 - Intermediário', 
      description: 'Trilhas com obstáculos frequentes como raízes e pedras soltas. Requer técnica.' 
    },
    { 
      value: 'S3', 
      label: 'S3 - Desafiador', 
      description: 'Terreno técnico com obstáculos grandes, degraus e quedas. Para riders experientes.' 
    },
    { 
      value: 'S4', 
      label: 'S4 - Difícil', 
      description: 'Trilhas muito técnicas com quedas abruptas, rochas e raízes de grande porte. Requer muita habilidade.' 
    },
    { 
      value: 'S5', 
      label: 'S5 - Extremo', 
      description: 'Trilhas extremamente difíceis e perigosas. Apenas para riders profissionais.' 
    }
  ];
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Dificuldade Técnica</h3>
        
        <TooltipProvider>
          <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
            {difficultyLevels.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <RadioGroupItem value={level.value} id={`technical-${level.value}`} />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor={`technical-${level.value}`}
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {level.label}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">{level.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </RadioGroup>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default TechnicalDifficultySelector;
