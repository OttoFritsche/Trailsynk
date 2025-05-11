
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { NutritionProfile, ActivityLevel, NutritionGoal, DietaryRestriction, NutritionFormValues } from '@/types/nutrition';
import { nutritionService } from '@/services/nutritionService';
import { toast } from 'sonner';

interface NutritionProfileFormProps {
  profile: NutritionProfile | null;
  onSaved: (profileId: string) => void;
}

const formSchema = z.object({
  weight: z.number().min(30).max(250).nullable(),
  height: z.number().min(100).max(250).nullable(),
  age: z.number().min(12).max(120).nullable(),
  activity_level: z.enum(['sedentário', 'leve', 'moderado', 'ativo', 'muito ativo']).nullable(),
  goals: z.array(z.enum(['perder_peso', 'ganhar_massa', 'melhorar_performance', 'saúde_geral'])),
  dietary_restrictions: z.array(z.enum(['vegetariano', 'vegano', 'sem_gluten', 'sem_lactose', 'outro'])),
  other_restrictions: z.string().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const goalOptions = [
  { value: 'perder_peso', label: 'Perder peso' },
  { value: 'ganhar_massa', label: 'Ganhar massa muscular' },
  { value: 'melhorar_performance', label: 'Melhorar performance' },
  { value: 'saúde_geral', label: 'Saúde geral' },
];

const restrictionOptions = [
  { value: 'vegetariano', label: 'Vegetariano' },
  { value: 'vegano', label: 'Vegano' },
  { value: 'sem_gluten', label: 'Sem glúten' },
  { value: 'sem_lactose', label: 'Sem lactose' },
  { value: 'outro', label: 'Outra restrição' },
];

const NutritionProfileForm: React.FC<NutritionProfileFormProps> = ({ profile, onSaved }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: profile?.weight || null,
      height: profile?.height || null,
      age: profile?.age || null,
      activity_level: profile?.activity_level || null,
      goals: (profile?.goals || []) as NutritionGoal[],
      dietary_restrictions: (profile?.dietary_restrictions || []) as DietaryRestriction[],
      other_restrictions: profile?.other_restrictions || null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Ensure data matches the NutritionFormValues interface
      const formData: NutritionFormValues = {
        weight: data.weight,
        height: data.height,
        age: data.age,
        activity_level: data.activity_level as ActivityLevel | null,
        goals: data.goals as NutritionGoal[],
        dietary_restrictions: data.dietary_restrictions as DietaryRestriction[],
        other_restrictions: data.other_restrictions,
      };
      
      const result = await nutritionService.saveNutritionProfile(formData);
      toast.success('Perfil nutricional salvo com sucesso');
      if (result?.id) {
        onSaved(result.id);
      }
    } catch (error) {
      toast.error('Erro ao salvar perfil nutricional');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 70"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 175"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 30"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="activity_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível de atividade física</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu nível de atividade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sedentário">Sedentário</SelectItem>
                  <SelectItem value="leve">Leve - Exercícios 1-2x por semana</SelectItem>
                  <SelectItem value="moderado">Moderado - Exercícios 3-4x por semana</SelectItem>
                  <SelectItem value="ativo">Ativo - Exercícios 5-6x por semana</SelectItem>
                  <SelectItem value="muito ativo">Muito ativo - Exercícios diários ou intensos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goals"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Objetivos</FormLabel>
                <FormDescription>
                  Selecione seus objetivos nutricionais.
                </FormDescription>
              </div>
              {goalOptions.map((option) => (
                <FormField
                  key={option.value}
                  control={form.control}
                  name="goals"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value as NutritionGoal)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              const optionValue = option.value as NutritionGoal;
                              return checked
                                ? field.onChange([...currentValue, optionValue])
                                : field.onChange(
                                    currentValue.filter((value) => value !== optionValue)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietary_restrictions"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Restrições alimentares</FormLabel>
                <FormDescription>
                  Selecione suas restrições alimentares.
                </FormDescription>
              </div>
              {restrictionOptions.map((option) => (
                <FormField
                  key={option.value}
                  control={form.control}
                  name="dietary_restrictions"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value as DietaryRestriction)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              const optionValue = option.value as DietaryRestriction;
                              return checked
                                ? field.onChange([...currentValue, optionValue])
                                : field.onChange(
                                    currentValue.filter((value) => value !== optionValue)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="other_restrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outras restrições ou observações</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva outras restrições alimentares ou observações importantes."
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Salvar perfil nutricional</Button>
      </form>
    </Form>
  );
};

export default NutritionProfileForm;
