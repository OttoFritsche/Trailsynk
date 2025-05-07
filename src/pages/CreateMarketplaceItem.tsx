
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Pencil, 
  X, 
  Tag, 
  DollarSign, 
  List, 
  Check, 
  MapPin, 
  Image,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { ImageUploader } from '@/components/marketplace/ImageUploader';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Título deve ter pelo menos 3 caracteres' }).max(100),
  description: z.string().min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' }),
  price: z.coerce.number().positive({ message: 'Preço deve ser um valor positivo' }),
  category: z.string().min(1, { message: 'Selecione uma categoria' }),
  condition: z.string().min(1, { message: 'Selecione uma condição' }),
  location: z.string().min(3, { message: 'Localização é obrigatória' })
});

type FormValues = z.infer<typeof formSchema>;

const CreateMarketplaceItem = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: undefined,
      category: '',
      condition: '',
      location: ''
    }
  });

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  const onSubmit = async (data: FormValues) => {
    if (images.length === 0) {
      toast.error('Adicione pelo menos uma imagem ao anúncio');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock submission for now - in a real app, this would connect to Supabase
      console.log('Form data:', data);
      console.log('Images to upload:', images);
      
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Anúncio criado com sucesso!');
      navigate('/app/marketplace');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao criar anúncio. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Criar Novo Anúncio</h1>
        <Button variant="outline" onClick={() => navigate('/app/marketplace')}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Item</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input placeholder="Ex: Bicicleta Specialized Epic Comp" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição Completa</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva detalhes sobre o item, como estado de conservação, tempo de uso, etc."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-10" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value === '' ? undefined : Number(e.target.value));
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <div className="flex items-center">
                            <List className="h-4 w-4 mr-2 text-gray-500" />
                            <SelectValue placeholder="Selecione a categoria" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bikes">Bicicletas</SelectItem>
                        <SelectItem value="components">Componentes</SelectItem>
                        <SelectItem value="accessories">Acessórios</SelectItem>
                        <SelectItem value="clothes">Vestuário</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Condition Field */}
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condição</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <div className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-gray-500" />
                            <SelectValue placeholder="Selecione a condição" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">Novo</SelectItem>
                        <SelectItem value="like-new">Usado - Como Novo</SelectItem>
                        <SelectItem value="good">Usado - Boa Condição</SelectItem>
                        <SelectItem value="fair">Usado - Com Marcas de Uso</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input placeholder="Ex: São Paulo, SP" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload Component */}
            <div className="space-y-2">
              <Label>Fotos do Item</Label>
              <ImageUploader onImagesChange={handleImageChange} />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/app/marketplace')}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Publicar Anúncio
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateMarketplaceItem;
