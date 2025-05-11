import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import AppHome from "./pages/AppHome";
import Profile from "./pages/Profile";
import CompleteProfile from "./pages/CompleteProfile";
import RoutesPage from "./pages/Routes";
import RouteDetail from "./pages/RouteDetail";
import ActivityDetail from "./pages/ActivityDetail";
import Statistics from "./pages/Statistics";
import Badges from "./pages/Badges";
import Trails from "./pages/Trails";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";
import NewRoute from "./pages/NewRoute";
import Assistant from "./pages/Assistant";
import FindCyclists from "./pages/FindCyclists";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import ChatDetail from "./pages/ChatDetail";
import Subscription from "./pages/Subscription";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import AIAssistant from "./pages/AIAssistant";
import AppLayout from "./components/app/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import TrainingCalendar from "./pages/training/TrainingCalendar";
import MyActivities from "./pages/training/MyActivities";
import WeeklyControl from "./pages/training/WeeklyControl";
import PerformanceReadiness from "./pages/training/PerformanceReadiness";
import VerifyEmail from "./pages/VerifyEmail";
import Marketplace from "./pages/Marketplace";
import CreateMarketplaceItem from "./pages/CreateMarketplaceItem";
import MarketplaceItemDetail from "./pages/MarketplaceItemDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import Nutrition from './pages/Nutrition';

// Criando o cliente de query com configurações otimizadas
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
      // Removed 'suspense' property as it's not supported in this version
      useErrorBoundary: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner position="top-right" closeButton={true} />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Rotas Protegidas */}
            <Route 
              path="/app" 
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AppHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/complete" element={<CompleteProfile />} />
              
              {/* Rotas de Ciclismo */}
              <Route path="routes" element={<RoutesPage />} />
              <Route path="routes/:routeId" element={<RouteDetail />} />
              <Route path="routes/new" element={<NewRoute />} />
              <Route path="activity/:activityId" element={<ActivityDetail />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="badges" element={<Badges />} />
              <Route path="trails" element={<Trails />} />
              
              {/* Rotas Sociais */}
              <Route path="find-cyclists" element={<FindCyclists />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="groups" element={<Groups />} />
              <Route path="groups/:groupId" element={<GroupDetail />} />
              <Route path="messages" element={<Messages />} />
              <Route path="messages/:chatId" element={<ChatDetail />} />
              
              {/* Rotas de IA e Assistência */}
              <Route path="assistant" element={<Assistant />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              
              {/* Rotas de Configuração e Conta */}
              <Route path="settings" element={<Settings />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="subscription-success" element={<SubscriptionSuccess />} />
              
              {/* Marketplace */}
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/new" element={<CreateMarketplaceItem />} />
              <Route path="marketplace/:itemId" element={<MarketplaceItemDetail />} />
              
              {/* Eventos */}
              <Route path="events" element={<Events />} />
              <Route path="events/new" element={<CreateEvent />} />
              <Route path="events/:eventId" element={<EventDetail />} />
              
              {/* Treinamento */}
              <Route path="training">
                <Route path="calendar" element={<TrainingCalendar />} />
                <Route path="activities" element={<MyActivities />} />
                <Route path="weekly" element={<WeeklyControl />} />
                <Route path="performance" element={<PerformanceReadiness />} />
              </Route>
              
              {/* Nutrição */}
              <Route path="nutrition" element={<Nutrition />} />
              
              {/* Rota de fallback dentro da área protegida */}
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Route>
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
