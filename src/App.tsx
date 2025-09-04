import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";
import Index from "./pages/Index";
import Ansiedade from "./pages/Ansiedade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1">
              <header className="h-12 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 px-4">
                <SidebarTrigger className="flex items-center gap-2 text-primary hover:bg-primary/10 p-2 rounded-md transition-colors">
                  <Menu className="w-5 h-5" />
                  <span className="text-sm font-medium">Depoimentos</span>
                </SidebarTrigger>
              </header>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ansiedade" element={<Ansiedade />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
