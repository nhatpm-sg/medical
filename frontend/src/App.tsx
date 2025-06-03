import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
// Dashboard imports
import Dashboard from "./pages/dashboard/Index";
import PatientList from "./pages/dashboard/doctor/PatientList";
import DoctorSchedule from "./pages/dashboard/doctor/Schedule";
import MedicalRecords from "./pages/dashboard/doctor/MedicalRecords";
import BlogManagement from "./pages/dashboard/staff/BlogManagement";
import DoctorManagement from "./pages/dashboard/admin/DoctorManagement";
import PatientAppointments from "./pages/dashboard/patient/Appointments";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Dashboard routes - protected */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Doctor routes - protected */}
          <Route 
            path="/dashboard/doctor" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/doctor/patients" 
            element={
              <ProtectedRoute>
                <PatientList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/doctor/schedule" 
            element={
              <ProtectedRoute>
                <DoctorSchedule />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/doctor/records" 
            element={
              <ProtectedRoute>
                <MedicalRecords />
              </ProtectedRoute>
            } 
          />
          
          {/* Staff routes - protected */}
          <Route 
            path="/dashboard/staff" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/staff/blog" 
            element={
              <ProtectedRoute>
                <BlogManagement />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes - protected */}
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/admin/doctors" 
            element={
              <ProtectedRoute>
                <DoctorManagement />
              </ProtectedRoute>
            } 
          />
          
          {/* Patient routes - protected */}
          <Route 
            path="/dashboard/patient" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/patient/appointments" 
            element={
              <ProtectedRoute>
                <PatientAppointments />
              </ProtectedRoute>
            } 
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
