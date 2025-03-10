
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RoiAnalysis from "./pages/RoiAnalysis";
import CostTracking from "./pages/CostTracking";
import UsageMetrics from "./pages/UsageMetrics";
import Performance from "./pages/Performance";
import Adoption from "./pages/Adoption";
import NotFound from "./pages/NotFound";
import ToolLifecycle from "./pages/ToolLifecycle";
import ToolRequestForm from "./pages/ToolRequestForm";
import ToolDetails from "./pages/ToolDetails";
import Surveys from "./pages/Surveys";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roi" element={<RoiAnalysis />} />
          <Route path="/costs" element={<CostTracking />} />
          <Route path="/usage" element={<UsageMetrics />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/tools" element={<ToolLifecycle />} />
          <Route path="/tools/request" element={<ToolRequestForm />} />
          <Route path="/tools/:id" element={<ToolDetails />} />
          <Route path="/surveys" element={<Surveys />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
