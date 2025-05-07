
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MarketplaceItemDetail from "./pages/MarketplaceItemDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Protected App Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AppHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/complete" element={<CompleteProfile />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="routes/:routeId" element={<RouteDetail />} />
            <Route path="routes/new" element={<NewRoute />} />
            <Route path="activity/:activityId" element={<ActivityDetail />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="badges" element={<Badges />} />
            <Route path="trails" element={<Trails />} />
            <Route path="find-cyclists" element={<FindCyclists />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="groups" element={<Groups />} />
            <Route path="groups/:groupId" element={<GroupDetail />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="subscription-success" element={<SubscriptionSuccess />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:chatId" element={<ChatDetail />} />
            
            {/* New Marketplace Routes */}
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="marketplace/:itemId" element={<MarketplaceItemDetail />} />
            
            {/* New Events Routes */}
            <Route path="events" element={<Events />} />
            <Route path="events/:eventId" element={<EventDetail />} />
            
            {/* Training Routes */}
            <Route path="training">
              <Route path="calendar" element={<TrainingCalendar />} />
              <Route path="activities" element={<MyActivities />} />
              <Route path="weekly" element={<WeeklyControl />} />
              <Route path="performance" element={<PerformanceReadiness />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
