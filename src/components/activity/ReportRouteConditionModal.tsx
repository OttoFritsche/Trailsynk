
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, DropletIcon, XCircle, MapPin, Palmtree, Car } from 'lucide-react';

interface ReportRouteConditionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const conditionOptions = [
  { id: 'mud', label: 'Lama', icon: <DropletIcon className="h-5 w-5" /> },
  { id: 'hole', label: 'Buraco', icon: <AlertTriangle className="h-5 w-5" /> },
  { id: 'obstacle', label: 'Obstáculo na trilha', icon: <XCircle className="h-5 w-5" /> },
  { id: 'fallen_tree', label: 'Árvore caída', icon: <Palmtree className="h-5 w-5" /> },
  { id: 'traffic_danger', label: 'Trecho perigoso (trânsito)', icon: <Car className="h-5 w-5" /> },
  { id: 'good_condition', label: 'Condição da rota boa', icon: <CheckCircle className="h-5 w-5" /> },
  { id: 'other', label: 'Outro', icon: <MapPin className="h-5 w-5" /> },
];

const ReportRouteConditionModal: React.FC<ReportRouteConditionModalProps> = ({
  open,
  onOpenChange
}) => {
  const [selectedCondition, setSelectedCondition] = React.useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder for the future implementation
    console.log("Route condition report submitted - will be implemented later");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Reportar Condição da Rota</DialogTitle>
            <DialogDescription>
              Ajude outros ciclistas informando sobre as condições atuais deste percurso
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-3">Qual condição você encontrou?</h3>
              
              <RadioGroup value={selectedCondition} onValueChange={setSelectedCondition} className="grid grid-cols-1 gap-2">
                {conditionOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex items-center gap-2 cursor-pointer">
                      {option.icon}
                      <span>{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium">Descrição Adicional</Label>
              <Textarea
                id="description"
                placeholder="Descreva detalhes sobre a condição encontrada (opcional)"
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">Enviar Reporte</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportRouteConditionModal;
