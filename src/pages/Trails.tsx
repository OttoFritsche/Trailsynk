
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, UserPlus, Users } from 'lucide-react';
import TrailsList from '@/components/trails/TrailsList';
import { useTrailConnections } from '@/hooks/useTrailConnections';

const Trails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { connections, loading, error } = useTrailConnections();

  return (
    <>
      <Helmet>
        <title>Meus Trails | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Meus Trails</h1>
          <p className="text-muted-foreground">
            Conecte-se com outros ciclistas e acompanhe suas atividades
          </p>
        </div>

        {/* Search and Invite Section */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar ciclistas..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[#2ECC71] hover:bg-[#27ae60]">
              <UserPlus className="mr-2 h-4 w-4" />
              Convidar Amigos
            </Button>
          </div>
        </Card>

        {/* Connected Cyclists List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <Users className="mr-2 h-5 w-5 text-[#2ECC71]" />
              Ciclistas Conectados
            </h2>
            <Button variant="ghost" className="text-[#2ECC71] hover:text-[#27ae60] hover:bg-green-50">
              Ver Todos
            </Button>
          </div>

          <TrailsList 
            connections={connections} 
            loading={loading} 
            error={error} 
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </>
  );
};

export default Trails;
