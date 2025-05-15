
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Undo, Redo, MapPin, Pencil, ZoomIn, ZoomOut } from "lucide-react";

interface RouteDrawingToolsProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onToggleDrawMode: (mode: 'manual' | 'snap' | 'quick') => void;
  activeDrawMode: 'manual' | 'snap' | 'quick';
  canUndo: boolean;
  canRedo: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const RouteDrawingTools: React.FC<RouteDrawingToolsProps> = ({
  onUndo,
  onRedo,
  onToggleDrawMode,
  activeDrawMode,
  canUndo,
  canRedo,
  onZoomIn,
  onZoomOut
}) => {
  return (
    <div className="absolute top-2 left-2 p-2 bg-white/95 rounded-md shadow-sm z-10 flex flex-col gap-2">
      <TooltipProvider>
        <div className="flex flex-col space-y-2 mb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeDrawMode === 'manual' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => onToggleDrawMode('manual')}
                className="h-9 w-9"
              >
                <MapPin className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Modo Manual: Clique para adicionar pontos</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeDrawMode === 'snap' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => onToggleDrawMode('snap')}
                className="h-9 w-9"
              >
                <Pencil className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Snap to Trails: Segue trilhas existentes</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeDrawMode === 'quick' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => onToggleDrawMode('quick')}
                className="h-9 w-9"
              >
                <MapPin className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Quick Draw: Selecione início e fim</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex flex-col space-y-2 mb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={onUndo}
                disabled={!canUndo}
                className="h-9 w-9"
              >
                <Undo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Desfazer último ponto</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={onRedo}
                disabled={!canRedo}
                className="h-9 w-9"
              >
                <Redo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Refazer ponto</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={onZoomIn}
                className="h-9 w-9"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Aumentar zoom</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={onZoomOut}
                className="h-9 w-9"
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Diminuir zoom</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default RouteDrawingTools;
