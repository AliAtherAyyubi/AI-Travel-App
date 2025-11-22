import { motion } from "framer-motion";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Plane, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState, useEffect } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Mock logged in state - set to true to show profile button
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-glass-bg/30 backdrop-blur-lg border-b border-glass-border"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
              <Plane className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TravelAI
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className="text-muted-foreground hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              Home
            </NavLink>
            <NavLink
              to="/planner"
              className="text-muted-foreground hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              AI Planner
            </NavLink>
            <NavLink
              to="/destinations"
              className="text-muted-foreground hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              Destinations
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-glass-bg/50 transition-colors"
              >
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium">Profile</span>
              </button>
            ) : (
              <Button variant="neon" size="lg" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
