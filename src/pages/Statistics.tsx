
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/useAuth';
import {
  Activity, BarChart3, Calendar, Clock, Mountain, Trophy,
  TrendingUp, Bike, Gauge, MapPin, Flame, Medal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for charts - will be replaced with API data later
const monthlyPerformanceData = [
  { month: 'Jan', distance: 120, duration: 600, elevation: 800 },
  { month: 'Feb', distance: 170, duration: 750, elevation: 1100 },
  { month: 'Mar', distance: 140, duration: 800, elevation: 950 },
  { month: 'Apr', distance: 200, duration: 1000, elevation: 1300 },
  { month: 'May', distance: 250, duration: 1200, elevation: 1500 },
  { month: 'Jun', distance: 190, duration: 900, elevation: 1250 },
  { month: 'Jul', distance: 220, duration: 1100, elevation: 1400 },
  { month: 'Aug', distance: 300, duration: 1400, elevation: 1800 },
  { month: 'Sep', distance: 280, duration: 1350, elevation: 1700 },
  { month: 'Oct', distance: 240, duration: 1150, elevation: 1450 },
  { month: 'Nov', distance: 190, duration: 900, elevation: 1200 },
  { month: 'Dec', distance: 160, duration: 750, elevation: 950 },
];

const weeklyDistanceData = [
  { day: 'Seg', distance: 15 },
  { day: 'Ter', distance: 0 },
  { day: 'Qua', distance: 22 },
  { day: 'Qui', distance: 8 },
  { day: 'Sex', distance: 0 },
  { day: 'Sáb', distance: 35 },
  { day: 'Dom', distance: 42 },
];

const terrainDistributionData = [
  { name: 'Asfalto', value: 55 },
  { name: 'Terra', value: 25 },
  { name: 'Trilha', value: 15 },
  { name: 'Cascalho', value: 5 },
];

const COLORS = ['#2ECC71', '#E67E22', '#3498DB', '#9B59B6'];

// Mock stats data
const statsData = {
  totalDistance: 1457.8,
  totalDuration: 13840, // in minutes
  highestElevation: 1870,
  longestRide: 148.5,
  maxAvgSpeed: 32.3,
  totalRides: 142,
  totalElevationGain: 28750,
  highestHeartRate: 192,
  bestPower: 850,
  weeklyAvgDistance: 78.5,
  yearToDateDistance: 845.2,
  lastMonthDistance: 210.5
};

const formatDuration = (minutes: number) => {
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;
  
  return `${days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${mins}min`;
};

const Statistics = () => {
  return (
    <>
      <Helmet>
        <title>Minhas Estatísticas | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Minhas Estatísticas de Performance</h1>
          <p className="text-muted-foreground">
            Visualize e analise seus dados de performance ao longo do tempo.
          </p>
        </div>

        {/* Key Metrics Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-primary" />
              Métricas Chave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Bike className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Distância Total</p>
                <p className="text-xl font-bold">{statsData.totalDistance} km</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Tempo Total</p>
                <p className="text-xl font-bold">{formatDuration(statsData.totalDuration)}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Mountain className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior Elevação</p>
                <p className="text-xl font-bold">{statsData.highestElevation}m</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Trophy className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior Pedalada</p>
                <p className="text-xl font-bold">{statsData.longestRide} km</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Metrics Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Métricas Avançadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Gauge className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior Vel. Média</p>
                <p className="text-xl font-bold">{statsData.maxAvgSpeed} km/h</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <MapPin className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Total de Pedais</p>
                <p className="text-xl font-bold">{statsData.totalRides}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <TrendingUp className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Acumul. Subida</p>
                <p className="text-xl font-bold">{statsData.totalElevationGain}m</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Flame className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior FC</p>
                <p className="text-xl font-bold">{statsData.highestHeartRate} bpm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Análise de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="annual" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="annual">Performance Anual</TabsTrigger>
                <TabsTrigger value="weekly">Atividade Semanal</TabsTrigger>
                <TabsTrigger value="terrain">Distribuição de Terreno</TabsTrigger>
              </TabsList>
              
              {/* Annual Performance Tab */}
              <TabsContent value="annual" className="mt-6">
                <div className="h-80">
                  <ChartContainer 
                    config={{
                      distance: {
                        label: "Distância (km)",
                        color: "#2ECC71",
                      },
                      elevation: {
                        label: "Elevação (m)",
                        color: "#E67E22",
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyPerformanceData}
                        margin={{ top: 5, right: 20, left: 20, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          height={40}
                        />
                        <YAxis 
                          yAxisId="left"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                                  <div className="font-medium">{payload[0]?.payload.month}</div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Distância: {payload[0]?.value || 0} km</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    <span>Elevação: {payload[2]?.value || 0} m</span>
                                  </div>
                                </div>
                              )
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={36}
                          payload={[
                            { value: 'Distância (km)', type: 'line', color: '#2ECC71' },
                            { value: 'Elevação (m)', type: 'line', color: '#E67E22' }
                          ]}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="distance"
                          stroke="#2ECC71"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="elevation"
                          stroke="#E67E22"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    Evolução da distância e elevação ao longo do ano
                  </div>
                </div>
              </TabsContent>
              
              {/* Weekly Activity Tab */}
              <TabsContent value="weekly" className="mt-6">
                <div className="h-80">
                  <ChartContainer 
                    config={{
                      distance: {
                        label: "Distância (km)",
                        color: "#2ECC71",
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weeklyDistanceData}
                        margin={{ top: 5, right: 20, left: 20, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                        <XAxis 
                          dataKey="day" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          height={40}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                                  <div className="font-medium">{payload[0]?.payload.day}</div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Distância: {payload[0]?.value || 0} km</span>
                                  </div>
                                </div>
                              )
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={36}
                          payload={[
                            { value: 'Distância (km)', type: 'rect', color: '#2ECC71' }
                          ]}
                        />
                        <Bar 
                          dataKey="distance" 
                          fill="#2ECC71"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    Distância percorrida em cada dia da semana atual
                  </div>
                </div>
              </TabsContent>
              
              {/* Terrain Distribution Tab */}
              <TabsContent value="terrain" className="mt-6">
                <div className="h-80">
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <Pie
                          data={terrainDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={130}
                          innerRadius={70}
                          fill="#2ECC71"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {terrainDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                                  <div className="font-medium">{payload[0]?.name}</div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div 
                                      className="h-2 w-2 rounded-full" 
                                      style={{ backgroundColor: payload[0]?.color }}
                                    />
                                    <span>{payload[0]?.value || 0}% das pedaladas</span>
                                  </div>
                                </div>
                              )
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom"
                          height={36}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    Distribuição dos tipos de terreno percorridos
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Statistics;
