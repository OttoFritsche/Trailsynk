
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NutritionProfileForm from '@/components/nutrition/NutritionProfileForm';
import NutritionSuggestionList from '@/components/nutrition/NutritionSuggestionList';
import { nutritionService } from '@/services/nutritionService';
import { NutritionProfile } from '@/types/nutrition';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Nutrition: React.FC = () => {
  const [profile, setProfile] = useState<NutritionProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sugestoes');

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await nutritionService.getUserNutritionProfile();
      setProfile(data);
      
      // If no profile exists, switch to profile tab
      if (!data) {
        setActiveTab('perfil');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileSaved = (profileId: string) => {
    fetchProfile();
    setActiveTab('sugestoes');
  };

  return (
    <>
      <Helmet>
        <title>Nutrição | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Assessor Nutricional</h1>
          <p className="text-muted-foreground">
            Gerencie seu perfil nutricional e receba recomendações alimentares personalizadas para seus treinos.
          </p>
        </div>

        {!profile && !loading && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Perfil nutricional não encontrado</AlertTitle>
            <AlertDescription>
              Preencha seu perfil nutricional para receber recomendações personalizadas.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 max-w-[400px]">
            <TabsTrigger value="sugestoes">Sugestões</TabsTrigger>
            <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sugestoes" className="mt-6">
            {profile ? (
              <NutritionSuggestionList />
            ) : (
              <div className="text-center py-8 border rounded-md bg-gray-50">
                <p className="text-gray-500">Preencha seu perfil nutricional para receber sugestões personalizadas.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="perfil" className="mt-6">
            <NutritionProfileForm profile={profile} onSaved={handleProfileSaved} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Nutrition;
