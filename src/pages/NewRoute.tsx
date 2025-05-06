
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { MapPin, Map, Save, X, ArrowLeft } from 'lucide-react';
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
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';

const routeFormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome da rota deve ter pelo menos 3 caracteres.",
  }),
  description: z.string().optional(),
  type: z.enum(["road", "mountain", "urban"]),
  distance: z.number().optional(),
  elevation: z.number().optional(),
});

type RouteFormValues = z.infer<typeof routeFormSchema>;

const NewRoute = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mapPoints, setMapPoints] = useState<Array<[number, number]>>([]);
  const [isMapEditMode, setIsMapEditMode] = useState(false);

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "road",
      distance: undefined,
      elevation: undefined,
    },
  });

  const onSubmit = (data: RouteFormValues) => {
    // Here we would send the data to the backend
    console.log("Form data:", data);
    console.log("Map points:", mapPoints);
    
    // Show success message
    toast.success("Rota criada com sucesso!");
    
    // Navigate back to routes page
    navigate("/app/routes");
  };

  const handleAddMapPoint = () => {
    setIsMapEditMode(true);
    toast("Clique no mapa para adicionar pontos à sua rota", {
      description: "Clique várias vezes para desenhar o percurso",
    });
  };

  const handleCancelRoute = () => {
    if (form.formState.isDirty || mapPoints.length > 0) {
      // Confirm before discarding changes
      if (confirm("Tem certeza que deseja cancelar? Todas as alterações serão perdidas.")) {
        navigate("/app/routes");
      }
    } else {
      navigate("/app/routes");
    }
  };

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
          {/* Map Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <RouteMap 
                  className="w-full h-[350px] md:h-[400px]" 
                  isEditing={isMapEditMode}
                  onPointAdded={(lat, lng) => {
                    if (isMapEditMode) {
                      setMapPoints(prev => [...prev, [lat, lng]]);
                    }
                  }}
                />
              </CardContent>
            </Card>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={handleAddMapPoint}
                className="flex-1"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Adicionar Pontos
              </Button>
              {mapPoints.length > 0 && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setMapPoints(prev => prev.slice(0, -1));
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Desfazer Ponto
                </Button>
              )}
            </div>
          </div>

          {/* Form Section */}
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
                          <Input placeholder="Ex: Circuito da Lagoa" {...field} />
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
                            <SelectItem value="road">Asfalto</SelectItem>
                            <SelectItem value="mountain">Trilha</SelectItem>
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
                            />
                          </FormControl>
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
      </div>
    </>
  );
};

export default NewRoute;
