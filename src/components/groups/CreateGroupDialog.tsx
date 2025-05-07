import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, 'Nome do grupo deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Adicione uma descrição com pelo menos 10 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ open, onOpenChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview da imagem
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulando criação do grupo - aqui seria integrado com Supabase
      console.log('Criando novo grupo:', values);
      
      // Simular um delay para demonstrar o estado de carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simular ID do grupo recém-criado - em uma implementação real, seria retornado pela API
      const newGroupId = `group-${Date.now()}`;
      
      toast.success('Grupo criado com sucesso!');
      
      // Fechar o modal e limpar o formulário
      onOpenChange(false);
      form.reset();
      setCoverImageUrl(null);
      
      // Redirecionar para a página de detalhes do grupo recém-criado
      navigate(`/app/groups/${newGroupId}`);
    } catch (error: any) {
      console.error('Erro ao criar grupo:', error);
      toast.error(`Erro ao criar grupo: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar Novo Grupo</DialogTitle>
          <DialogDescription>
            Crie um grupo para conectar-se com amigos e organizar pedais em conjunto
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Upload de Imagem de Capa */}
            <div className="space-y-2">
              <FormLabel>Imagem de Capa</FormLabel>
              <div className="relative h-40 w-full bg-gray-100 rounded-md overflow-hidden border border-dashed border-gray-300">
                {coverImageUrl ? (
                  <img 
                    src={coverImageUrl} 
                    alt="Capa do grupo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Clique para fazer upload</p>
                    <p className="text-xs text-gray-400">Recomendado: 800x300px</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {coverImageUrl && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">Alterar imagem</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Nome do Grupo */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Grupo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: MTB Salvador" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o propósito e atividades do grupo"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  'Criar Grupo'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
