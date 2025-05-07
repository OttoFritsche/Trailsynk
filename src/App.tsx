
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
import AppLayout from "./components/app/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
