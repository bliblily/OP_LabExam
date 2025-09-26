import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, UserPlus } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b shadow-card-shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-elegant">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                UM CCE
              </h1>
              <p className="text-xs text-muted-foreground">College of Computing Education</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
              className="transition-smooth"
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant={isActive("/login") ? "default" : "ghost"}
              asChild
              className="transition-smooth"
            >
              <Link to="/login" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </Button>
            <Button
              variant={isActive("/register") ? "default" : "ghost"}
              asChild
              className="transition-smooth"
            >
              <Link to="/register" className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex space-x-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;