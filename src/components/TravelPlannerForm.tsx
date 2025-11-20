import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import GlassCard from "./GlassCard";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TravelPlannerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    days: "",
    interests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/planner", { state: formData });
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Travel{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Planner
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us your preferences and let AI create your perfect itinerary
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-8" hover={false}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, Tokyo, Bali"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="bg-muted/50 border-glass-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 2000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="bg-muted/50 border-glass-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="days">Duration (Days)</Label>
                  <Input
                    id="days"
                    type="number"
                    placeholder="e.g., 7"
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    className="bg-muted/50 border-glass-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Input
                    id="interests"
                    placeholder="e.g., Culture, Adventure, Food"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    className="bg-muted/50 border-glass-border"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="neon" size="lg" className="w-full group">
                <Sparkles className="w-5 h-5" />
                Generate AI Itinerary
                <Sparkles className="w-5 h-5" />
              </Button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelPlannerForm;
