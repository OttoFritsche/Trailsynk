
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLayout from "@/components/admin/AdminLayout";
import FutureSectionPlaceholder from "@/components/admin/FutureSectionPlaceholder";
import { useToast } from "@/components/ui/use-toast";

// Tipo para os dados de leads
interface WaitlistLead {
  id: string;
  email: string;
  created_at: string;
}

const AdminPage: React.FC = () => {
  const [leads, setLeads] = useState<WaitlistLead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("waitlist_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setLeads(data || []);
    } catch (error: any) {
      console.error("Erro ao buscar dados da lista de espera:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível buscar os registros da lista de espera.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <AdminLayout>
      <AdminHeader title="Painel Administrativo" subtitle="Gerenciamento TrailSynk" />
      
      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Gerenciamento da Lista de Espera</CardTitle>
              <CardDescription>
                Emails registrados por usuários interessados no lançamento
              </CardDescription>
            </div>
            <div className="bg-primary/10 text-primary font-medium rounded-lg px-3 py-1">
              {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-secondary/60">Carregando dados...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-10 text-secondary/60">
                <p>Nenhum registro encontrado na lista de espera.</p>
              </div>
            ) : (
              <div className="overflow-auto max-h-[50vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Data de Registro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.email}</TableCell>
                        <TableCell>{formatDate(lead.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <FutureSectionPlaceholder 
            title="Gerenciamento de Usuários"
            description="Visualize e gerencie contas de usuários"
            icon="users"
          />
          <FutureSectionPlaceholder 
            title="Análise de Atividades"
            description="Métricas e estatísticas de uso do aplicativo"
            icon="layout-dashboard"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
