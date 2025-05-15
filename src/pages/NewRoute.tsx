
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { MapPin, Map, Save, X, ArrowLeft, Mountains, Flag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RouteMap from '@/components/app/RouteMap';
import ElevationProfile from '@/components/routes/ElevationProfile';
import TerrainSelector from '@/components/routes/TerrainSelector';
import TechnicalDifficultySelector from '@/components/routes/TechnicalDifficultySelector';
import TagSelector from '@/components/routes/TagSelector';
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouteHistory } from '@/hooks/useRouteHistory';

const routeFormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome da rota deve ter pelo menos 3 caracteres.",
  }),
  description: z.string().optional(),
  type: z.enum(["road", "mountain", "urban", "gravel"]),
  distance: z.number().optional(),
  elevation: z.number().optional(),
});

type RouteFormValues = z.infer<typeof routeFormSchema>;

interface RoutePoint {
  lat: number;
  lng: number;
  elevation?: number;
}

const NewRoute = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const { 
    points,
    addPoint,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  } = useRouteHistory();
  
  const [terrainData, setTerrainData] = useState({
    trail: 70,
    gravel: 20,
    road: 10
  });
  
  const [technicalDifficulty, setTechnicalDifficulty] = useState('S2');
  const [tags, setTags] = useState<string[]>(['mountain', 'trail']);
  const [activeTab, setActiveTab] = useState('map');
  
  // Generate simulated elevation data for our route
  const elevationPoints = points.map((point, index) => ({
    distance: +(index * 0.5).toFixed(1), // Each point is 0.5km apart
    elevation: point.elevation || 0
  }));
  
  // Calculate route distance based on number of points (simplified)
  const routeDistance = points.length > 1 ? +((points.length - 1) * 0.5).toFixed(1) : 0;
  
  // Calculate total elevation gain (simplified)
  const calculateElevationGain = () => {
    if (points.length < 2) return 0;
    
    let gain = 0;
    for (let i = 1; i < points.length; i++) {
      const diff = (points[i].elevation || 0) - (points[i-1].elevation || 0);
      if (diff > 0) gain += diff;
    }
    
    return Math.round(gain);
  };
  
  const elevationGain = calculateElevationGain();

  // Determine difficulty rating based on distance and elevation
  const determineAIDifficulty = () => {
    if (!routeDistance || !elevationGain) return 'easy';
    
    const elevationPerKm = elevationGain / routeDistance;
    const technicalFactor = technicalDifficulty === 'S0' ? 0.7 :
                           technicalDifficulty === 'S1' ? 0.85 :
                           technicalDifficulty === 'S2' ? 1 :
                           technicalDifficulty === 'S3' ? 1.15 :
                           technicalDifficulty === 'S4' ? 1.3 : 1.5;
    
    if (elevationPerKm * technicalFactor < 50) return 'easy';
    if (elevationPerKm * technicalFactor < 100) return 'moderate';
    return 'hard';
  };
  
  const aiDifficulty = determineAIDifficulty();

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "mountain",
      distance: undefined,
      elevation: undefined,
    },
  });

  // Update form values when route changes
  useEffect(() => {
    if (routeDistance > 0) {
      form.setValue('distance', routeDistance);
    }
    if (elevationGain > 0) {
      form.setValue('elevation', elevationGain);
    }
  }, [routeDistance, elevationGain, form]);
  
  // Show tutorial on first visit
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenRouteTutorial');
    if (!hasSeenTutorial && isFirstTime) {
      setShowTutorial(true);
      setIsFirstTime(false);
      // Mark as seen
      localStorage.setItem('hasSeenRouteTutorial', 'true');
      
      // Show tutorial toast
      toast.info(
        "Bem-vindo ao criador de rotas!",
        {
          description: "Clique no mapa para começar a desenhar sua rota mountain bike.",
          duration: 6000
        }
      );
    }
  }, [isFirstTime]);

  const onSubmit = (data: RouteFormValues) => {
    // Combine form data with other state
    const routeData = {
      ...data,
      points: points,
      terrain: terrainData,
      technicalDifficulty,
      tags,
      calculatedDifficulty: aiDifficulty
    };
    
    // Here we would send the data to the backend
    console.log("Form data:", routeData);
    
    // Show success message
    toast.success("Rota criada com sucesso!");
    
    // Navigate back to routes page
    navigate("/app/routes");
  };

  const handleAddMapPoint = (point: RoutePoint) => {
    addPoint(point);
  };

  const handleCancelRoute = () => {
    if (form.formState.isDirty || points.length > 0) {
      // Confirm before discarding changes
      if (confirm("Tem certeza que deseja cancelar? Todas as alterações serão perdidas.")) {
        navigate("/app/routes");
      }
    } else {
      navigate("/app/routes");
    }
  };
  
  // Check if we have enough data to enable the save button
  const canSave = points.length > 1 && form.formState.isValid;

  return (
    <>
      <Helmet>
        <title>Nova Rota | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/app/routes")}
              aria-label="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Criar Nova Rota</h1>
          </div>
        </div>

        {/* Main content */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'}`}>
          {/* Map Section - Always visible on top for mobile */}
          <div className="space-y-4 order-1">
            {isMobile && (
              <Tabs defaultValue="map" onValueChange={setActiveTab}>
                <TabsList className="w-full mb-2">
                  <TabsTrigger value="map" className="flex-1">Mapa</TabsTrigger>
                  <TabsTrigger value="details" className="flex-1">Detalhes</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            
            {(!isMobile || activeTab === 'map') && (
              <>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={undo}
                    disabled={!canUndo}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Desfazer
                  </Button>
                  {points.length > 0 && (
                    <Button
                      variant="outline" 
                      className="flex-1"
                      onClick={redo}
                      disabled={!canRedo}
                    >
                      Refazer
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  )}
                </div>
                
                <RouteMap 
                  className="w-full h-[350px] md:h-[450px]" 
                  isEditing={true}
                  onPointAdded={handleAddMapPoint}
                />
                
                {/* Dynamic Stats Bar */}
                {points.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 bg-white border rounded-lg p-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Distância</p>
                      <p className="text-lg font-bold">{routeDistance} km</p>
                    </div>
                    <div className="text-center border-x">
                      <p className="text-xs text-gray-500">Elevação</p>
                      <p className="text-lg font-bold">{elevationGain} m</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Pontos</p>
                      <p className="text-lg font-bold">{points.length}</p>
                    </div>
                  </div>
                )}
                
                {/* Elevation Profile */}
                {points.length > 1 && (
                  <ElevationProfile data={elevationPoints} className="mt-2" />
                )}
              </>
            )}
            
            {/* Quick Tutorial Box */}
            {showTutorial && (!isMobile || activeTab === 'map') && (
              <Alert className="mt-2">
                <Mountains className="h-4 w-4" />
                <AlertDescription>
                  <p className="text-sm">
                    <strong>Dicas para criar sua rota:</strong>
                  </p>
                  <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                    <li>Clique no mapa para adicionar pontos</li>
                    <li>Use os botões de desfazer/refazer para corrigir erros</li>
                    <li>A elevação e distância são calculadas automaticamente</li>
                    <li>Defina o tipo de terreno e dificuldade técnica nos detalhes</li>
                  </ul>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={() => setShowTutorial(false)}
                  >
                    Entendi
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Form Section - On second tab for mobile */}
          {(!isMobile || activeTab === 'details') && (
            <div className="space-y-4 order-2">
              <Card>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Rota</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Trilha da Serra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Descreva brevemente esta rota..." 
                                {...field} 
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Rota</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo de rota" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="mountain">Mountain Bike</SelectItem>
                                <SelectItem value="gravel">Gravel</SelectItem>
                                <SelectItem value="road">Estrada</SelectItem>
                                <SelectItem value="urban">Urbano</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="distance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Distância (km)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0.0" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                  value={routeDistance || field.value}
                                  readOnly={routeDistance > 0}
                                  className={routeDistance > 0 ? "bg-gray-100" : ""}
                                />
                              </FormControl>
                              {routeDistance > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Calculado automaticamente com base nos pontos da rota
                                </p>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="elevation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Elevação (m)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                  value={elevationGain || field.value}
                                  readOnly={elevationGain > 0}
                                  className={elevationGain > 0 ? "bg-gray-100" : ""}
                                />
                              </FormControl>
                              {elevationGain > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Calculado automaticamente com base nos pontos da rota
                                </p>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Surface Type Selector */}
                      <TerrainSelector
                        trailPercentage={terrainData.trail}
                        onTrailPercentageChange={(value) => 
                          setTerrainData(prev => ({ 
                            ...prev, 
                            trail: value,
                            gravel: Math.floor((100 - value) * 0.7),
                            road: 100 - value - Math.floor((100 - value) * 0.7)
                          }))
                        }
                        gravelPercentage={terrainData.gravel}
                        onGravelPercentageChange={(value) => 
                          setTerrainData(prev => ({ 
                            ...prev, 
                            gravel: value,
                            road: 100 - prev.trail - value
                          }))
                        }
                        roadPercentage={terrainData.road}
                        onRoadPercentageChange={(value) => 
                          setTerrainData(prev => ({ 
                            ...prev, 
                            road: value 
                          }))
                        }
                      />
                      
                      {/* Technical Difficulty Selector */}
                      <TechnicalDifficultySelector
                        value={technicalDifficulty}
                        onChange={setTechnicalDifficulty}
                      />
                      
                      {/* Tags Selector */}
                      <TagSelector
                        tags={tags}
                        onTagsChange={setTags}
                      />
                      
                      {/* AI-Suggested Difficulty */}
                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Dificuldade Sugerida</h3>
                            <p className="text-xs text-gray-500 mt-1">Baseado nos dados da rota</p>
                          </div>
                          <Badge 
                            className={
                              aiDifficulty === 'easy' ? "bg-green-500" :
                              aiDifficulty === 'moderate' ? "bg-yellow-500" : "bg-red-500"
                            }
                          >
                            {aiDifficulty === 'easy' ? 'Fácil' : 
                             aiDifficulty === 'moderate' ? 'Moderada' : 'Difícil'}
                          </Badge>
                        </CardContent>
                      </Card>

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleCancelRoute}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancelar
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-[#2ECC71] hover:bg-[#27ae60]"
                          disabled={!canSave}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Rota
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewRoute;
