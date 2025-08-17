import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import { HRDashboard } from "./pages/hr/HRDashboard";
import { EmployeeDashboard } from "./pages/employee/EmployeeDashboard";
import NotFound from "./pages/NotFound";
 import { RequestLeaveForm } from "./pages/employee/RequestLeaveForm";
 import MyRequests from "./pages/employee/MyRequests";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/hr/dashboard"
            element={
              <Layout>
                <HRDashboard />
              </Layout>
            }
          />
          <Route
            path="/employee/dashboard"
            element={
              <Layout>
                <EmployeeDashboard />
              </Layout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/employee/request" element={<Layout><RequestLeaveForm /></Layout>} />
          <Route path="/employee/requests" element={<Layout><MyRequests /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
