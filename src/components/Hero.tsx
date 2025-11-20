import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      <FloatingShapes />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-glass-bg/50 backdrop-blur-md border border-glass-border rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Travel Planning</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Plan Your Dream Trip with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Get personalized itineraries, cost estimates, and travel recommendations in seconds. 
            Your perfect journey starts here.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="neon" size="lg" className="group" onClick={() => navigate("/planner")}>
              Start Planning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg" onClick={() => navigate("/destinations")}>
              Explore Destinations
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500K+</div>
              <div className="text-sm text-muted-foreground">Trips Planned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
