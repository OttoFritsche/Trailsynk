
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarIcon,
  Clock,
  ChevronLeft,
  MapPin,
  Upload,
  PlusCircle,
  MinusCircle,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Define validation schema
const eventFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  description: z.string().min(20, { message: "Descrição deve ter pelo menos 20 caracteres" }),
  location: z.string().min(5, { message: "Localização é obrigatória" }),
  coordinates: z.string().optional(),
  date: z.date({ required_error: "Data é obrigatória" }),
  time: z.string().min(1, { message: "Horário é obrigatório" }),
  type: z.string({ required_error: "Tipo de evento é obrigatório" }),
  distance: z.coerce.number().min(1, { message: "Distância deve ser maior que 0" }),
  elevation: z.coerce.number().min(0, { message: "Elevação deve ser pelo menos 0" }),
  difficulty: z.string({ required_error: "Dificuldade é obrigatória" }),
  terrain: z.string({ required_error: "Tipo de terreno é obrigatório" }),
  pace: z.string({ required_error: "Ritmo é obrigatório" }),
  bikeType: z.string({ required_error: "Tipo de bike é obrigatório" }),
  maxParticipants: z.coerce.number().optional(),
  limitParticipants: z.boolean().default(false),
  requirements: z.array(z.string()).optional(),
  mainImage: z.any().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      coordinates: "",
      time: "",
      type: "",
      distance: 0,
      elevation: 0,
      difficulty: "",
      terrain: "",
      pace: "",
      bikeType: "",
      limitParticipants: false,
      maxParticipants: 0,
      requirements: [],
    },
  });
  
  const onSubmit = (data: EventFormValues) => {
    setLoading(true);
    
    // Prepare requirements data
    data.requirements = requirements.filter(req => req.trim() !== "");
    
    // In a real application, this would send data to a backend
    console.log("Form data:", data);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Evento criado com sucesso!");
      navigate("/app/events");
    }, 1500);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Set the file in the form data
      form.setValue("mainImage", file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addRequirementField = () => {
    setRequirements([...requirements, ""]);
  };
  
  const removeRequirementField = (index: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };
  
  const updateRequirement = (index: number, value: string) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };

  return (
    <>
      <Helmet>
        <title>Criar Evento | TrailSynk</title>
      </Helmet>
      
      <div className="container mx-auto p-4 max-w-4xl animate-fade-in">
        <div className="mb-6">
          <Link
            to="/app/events"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para Eventos
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Criar Novo Evento
          </h1>
          <p className="text-gray-500 mt-1">
            Preencha os dados abaixo para criar um novo evento de ciclismo
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Informações Básicas</h2>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Evento*</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Pedal na Serra do Mar" {...field} />
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
                        <FormLabel>Descrição*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva o evento, percurso, dificuldade e outras informações relevantes..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Localização*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input className="pl-10" placeholder="Endereço do ponto de encontro" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Você pode especificar o ponto exato no mapa
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Data*</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: ptBR })
                                    ) : (
                                      <span>Selecione uma data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário*</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  type="time"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Evento*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de evento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Grupo">Grupo</SelectItem>
                            <SelectItem value="Competição">Competição</SelectItem>
                            <SelectItem value="Aberto">Aberto</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Detalhes da Rota</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="distance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Distância (km)*</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0" {...field} />
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
                          <FormLabel>Elevação (m)*</FormLabel>
                          <FormControl>
                            <Input type="number" step="1" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dificuldade*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a dificuldade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Iniciante">Iniciante</SelectItem>
                              <SelectItem value="Moderado">Moderado</SelectItem>
                              <SelectItem value="Avançado">Avançado</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="terrain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Terreno*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o terreno" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Estrada">Estrada</SelectItem>
                              <SelectItem value="Trilha">Trilha</SelectItem>
                              <SelectItem value="Misto">Misto</SelectItem>
                              <SelectItem value="Urbano">Urbano</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ritmo*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o ritmo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Leve">Leve (Passeio)</SelectItem>
                              <SelectItem value="Moderado">Moderado</SelectItem>
                              <SelectItem value="Intermediário">Intermediário</SelectItem>
                              <SelectItem value="Acelerado">Acelerado</SelectItem>
                              <SelectItem value="Competitivo">Competitivo</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bikeType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Bicicleta*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo de bike" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Mountain Bike">Mountain Bike</SelectItem>
                              <SelectItem value="Road">Road</SelectItem>
                              <SelectItem value="Gravel">Gravel</SelectItem>
                              <SelectItem value="Urbana">Urbana</SelectItem>
                              <SelectItem value="Qualquer">Qualquer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Participantes e Requisitos</h2>
                  
                  <FormField
                    control={form.control}
                    name="limitParticipants"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Limitar número de participantes</FormLabel>
                          <FormDescription>
                            Defina um limite máximo de participantes para o evento
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("limitParticipants") && (
                    <FormField
                      control={form.control}
                      name="maxParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número Máximo de Participantes</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <div className="space-y-4">
                    <FormLabel>Requisitos</FormLabel>
                    <FormDescription>
                      Adicione requisitos para participação no evento (equipamentos, preparação, etc.)
                    </FormDescription>
                    
                    {requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          placeholder={`Requisito ${index + 1}`}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeRequirementField(index)}
                          disabled={requirements.length === 1}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addRequirementField}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Adicionar Requisito
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Imagem do Evento</h2>
                  
                  <div className="space-y-4">
                    <FormLabel htmlFor="eventImage">Imagem Principal</FormLabel>
                    <FormDescription>
                      Upload de uma imagem representativa para o evento (recomendado: 1200×600px)
                    </FormDescription>
                    
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <img
                            src={imagePreview}
                            alt="Event preview"
                            className="max-h-64 mx-auto rounded-md"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setImagePreview(null);
                              form.setValue("mainImage", undefined);
                            }}
                          >
                            Remover imagem
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Clique para fazer upload ou arraste uma imagem
                          </p>
                          <label htmlFor="eventImage" className="block">
                            <Button
                              type="button"
                              variant="outline"
                              className="mt-4"
                              onClick={() => document.getElementById("eventImage")?.click()}
                            >
                              Selecionar imagem
                            </Button>
                            <input
                              id="eventImage"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/app/events")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary-dark">
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                    Criando...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Criar Evento
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateEvent;
