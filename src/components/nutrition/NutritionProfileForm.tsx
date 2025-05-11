
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import InputRow from '@/components/ui/input-row';
import { Checkbox } from '@/components/ui/checkbox';
import { ActivityLevel, NutritionFormValues, NutritionProfile, NutritionGoal, DietaryRestriction } from '@/types/nutrition';
import { nutritionService } from '@/services/nutritionService';
import { toast } from 'sonner';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

const formSchema = z.object({
  weight: z.number().nullable(),
  height: z.number().nullable(),
  age: z.number().nullable(),
  activity_level: z.enum(['sedentário', 'leve', 'moderado', 'ativo', 'muito ativo']).nullable(),
  goals: z.array(z.string()),
  dietary_restrictions: z.array(z.string()),
  other_restrictions: z.string().nullable()
});

interface NutritionProfileFormProps {
  profile?: NutritionProfile | null;
  onSaved?: (profileId: string) => void;
}

const activityLevelOptions: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentário', label: 'Sedentário (pouca ou nenhuma atividade física)' },
  { value: 'leve', label: 'Leve (exercício leve 1-3x por semana)' },
  { value: 'moderado', label: 'Moderado (exercício moderado 3-5x por semana)' },
  { value: 'ativo', label: 'Ativo (exercício intenso 5-7x por semana)' },
  { value: 'muito ativo', label: 'Muito Ativo (exercício intenso diário ou atleta)' }
];

const nutritionGoals: { value: NutritionGoal; label: string }[] = [
  { value: 'perder_peso', label: 'Perder peso' },
  { value: 'ganhar_massa', label: 'Ganhar massa muscular' },
  { value: 'melhorar_performance', label: 'Melhorar performance' },
  { value: 'saúde_geral', label: 'Manter saúde geral' }
];

const dietaryRestrictions: { value: DietaryRestriction; label: string }[] = [
  { value: 'vegetariano', label: 'Vegetariano' },
  { value: 'vegano', label: 'Vegano' },
  { value: 'sem_gluten', label: 'Sem glúten' },
  { value: 'sem_lactose', label: 'Sem lactose' },
  { value: 'outro', label: 'Outras restrições' }
];

const NutritionProfileForm: React.FC<NutritionProfileFormProps> = ({ profile, onSaved }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NutritionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: profile?.weight || null,
      height: profile?.height || null,
      age: profile?.age || null,
      activity_level: profile?.activity_level || null,
      goals: profile?.goals || [],
      dietary_restrictions: profile?.dietary_restrictions || [],
      other_restrictions: profile?.other_restrictions || null
    }
  });

  const handleSubmit = async (values: NutritionFormValues) => {
    setIsSubmitting(true);
    try {
      const profileId = await nutritionService.saveNutritionProfile(values);
      if (profileId && onSaved) {
        onSaved(profileId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Perfil Nutricional</CardTitle>
        <CardDescription>
          Preencha suas informações nutricionais para receber sugestões personalizadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputRow
                form={form}
                name="weight"
                label="Peso (kg)"
                type="number"
                placeholder="70"
                min={30}
                max={200}
                step={0.1}
              />
              
              <InputRow
                form={form}
                name="height"
                label="Altura (cm)"
                type="number"
                placeholder="175"
                min={100}
                max={250}
                step={1}
              />
              
              <InputRow
                form={form}
                name="age"
                label="Idade"
                type="number"
                placeholder="30"
                min={13}
                max={120}
                step={1}
              />
            </div>
            
            <div className="space-y-2">
              <FormItem className="space-y-3">
                <FormLabel>Nível de Atividade Física</FormLabel>
                <div className="space-y-1">
                  {activityLevelOptions.map((option) => (
                    <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="radio"
                          value={option.value}
                          className="radio"
                          checked={form.watch('activity_level') === option.value}
                          onChange={() => form.setValue('activity_level', option.value)}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            </div>
            
            <div className="space-y-3">
              <FormLabel>Objetivos Nutricionais</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {nutritionGoals.map((goal) => (
                  <FormItem key={goal.value} className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={form.watch('goals').includes(goal.value)}
                        onCheckedChange={(checked) => {
                          const currentGoals = form.getValues('goals');
                          if (checked) {
                            form.setValue('goals', [...currentGoals, goal.value]);
                          } else {
                            form.setValue('goals', currentGoals.filter(g => g !== goal.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {goal.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </div>
            
            <div className="space-y-3">
              <FormLabel>Restrições Alimentares</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {dietaryRestrictions.map((restriction) => (
                  <FormItem key={restriction.value} className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={form.watch('dietary_restrictions').includes(restriction.value)}
                        onCheckedChange={(checked) => {
                          const currentRestrictions = form.getValues('dietary_restrictions');
                          if (checked) {
                            form.setValue('dietary_restrictions', [...currentRestrictions, restriction.value]);
                          } else {
                            form.setValue('dietary_restrictions', currentRestrictions.filter(r => r !== restriction.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {restriction.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </div>
            
            <FormItem>
              <FormLabel>Outras Restrições ou Observações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva outras informações relevantes sobre sua alimentação..."
                  className="min-h-[100px]"
                  {...form.register('other_restrictions')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Perfil Nutricional
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NutritionProfileForm;
