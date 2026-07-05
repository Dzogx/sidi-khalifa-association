import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Board from "@/pages/Board";
import Projects from "@/pages/Projects";
import News from "@/pages/News";
import Events from "@/pages/Events";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Membership from "@/pages/Membership";
import Volunteer from "@/pages/Volunteer";
import Complaints from "@/pages/Complaints";
import Documents from "@/pages/Documents";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import AdminDashboard from "@/pages/AdminDashboard";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

/**
 * App Router
 * 
 * Design: Saharan Modern Architecture
 * - RTL layout support
 * - Dark mode support
 * - Responsive design
 */
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/board" component={Board} />
      <Route path="/projects" component={Projects} />
      <Route path="/news" component={News} />
      <Route path="/events" component={Events} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/membership" component={Membership} />
      <Route path="/volunteer" component={Volunteer} />
      <Route path="/complaints" component={Complaints} />
      <Route path="/documents" component={Documents} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <div dir="rtl" className="min-h-screen">
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
