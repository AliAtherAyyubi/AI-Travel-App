import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import FloatingShapes from "@/components/FloatingShapes";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Heart, Share2, Download, Loader2, Sparkles, AlertCircle, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  cost: string;
}

interface Hotel {
  name: string;
  price: string;
  rating: number;
  description?: string;
  image?: string;
}

interface Flight {
  airline: string;
  route: string;
  price: string;
  duration: string;
}

interface Itinerary {
  destination: string;
  days: string;
  budget: string;
  interests: string;
  summary?: string;
  dailyPlan: DayPlan[];
  hotels: Hotel[];
  flights: Flight[];
  tips?: string[];
}

const Planner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const formData = location.state || {};
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  useEffect(() => {
    const generateItinerary = async () => {
      if (!formData.destination) {
        setError("No destination provided. Please go back and fill in the form.");
        setIsLoading(false);
        return;
      }

      try {
        console.log('Calling generate-itinerary with:', formData);
        
        const { data, error: funcError } = await supabase.functions.invoke('generate-itinerary', {
          body: {
            destination: formData.destination,
            budget: formData.budget,
            days: formData.days,
            interests: formData.interests,
          }
        });

        if (funcError) {
          console.error('Function error:', funcError);
          throw new Error(funcError.message);
        }

        if (data.error) {
          throw new Error(data.error);
        }

        console.log('Received itinerary:', data);
        
        // Add placeholder images for hotels
        const itineraryWithImages = {
          ...data,
          hotels: data.hotels?.map((hotel: Hotel, index: number) => ({
            ...hotel,
            image: index === 0 
              ? "https://images.unsplash.com/photo-1566073771259-6a8506099945"
              : "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
          })) || []
        };

        setItinerary(itineraryWithImages);
        toast({
          title: "Itinerary Generated!",
          description: `Your ${formData.days}-day trip to ${formData.destination} is ready.`,
        });
      } catch (err) {
        console.error('Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to generate itinerary';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateItinerary();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <FloatingShapes />
        <div className="container mx-auto px-6 pt-28 pb-20 relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
              <Sparkles className="w-8 h-8 text-secondary absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-4">AI is crafting your perfect itinerary...</h2>
            <p className="text-muted-foreground">
              Analyzing destinations, finding the best hotels, and planning activities for your {formData.days || 7}-day trip to {formData.destination || "your destination"}
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <FloatingShapes />
        <div className="container mx-auto px-6 pt-28 pb-20 relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Button variant="neon" onClick={() => navigate(-1)}>
              Go Back & Try Again
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!itinerary) return null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <FloatingShapes />

      <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI-Generated
            </span>{" "}
            Itinerary
          </h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{itinerary.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{itinerary.days} days</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>${itinerary.budget} budget</span>
            </div>
          </div>
          
          {itinerary.summary && (
            <GlassCard className="bg-primary/10 border-primary/30">
              <p className="text-foreground/90">{itinerary.summary}</p>
            </GlassCard>
          )}
        </motion.div>

        {/* Daily Itinerary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Daily Itinerary</h2>
          <div className="space-y-4">
            {itinerary.dailyPlan.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-primary font-semibold mb-1">Day {day.day}</div>
                      <h3 className="text-xl font-bold">{day.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Est. Cost</div>
                      <div className="font-semibold text-primary">{day.cost}</div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travel Tips */}
        {itinerary.tips && itinerary.tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Travel Tips
            </h2>
            <GlassCard>
              <ul className="space-y-3">
                {itinerary.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary font-bold">{index + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        )}

        {/* Recommended Hotels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Recommended Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itinerary.hotels.map((hotel, index) => (
              <GlassCard 
                key={index} 
                className="overflow-hidden p-0 cursor-pointer transition-transform hover:scale-105"
                onClick={() => navigate('/hotel-details', { state: { hotel } })}
              >
                <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
                  {hotel.description && (
                    <p className="text-sm text-muted-foreground mb-3">{hotel.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">{hotel.price}</span>
                    <span className="text-sm text-muted-foreground">★ {hotel.rating}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Flight Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Flight Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itinerary.flights.map((flight, index) => (
              <GlassCard key={index}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">{flight.airline}</h3>
                  <span className="text-primary font-semibold text-lg">{flight.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{flight.route}</span>
                  <span>{flight.duration}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button variant="neon" size="lg">
            <Heart className="w-5 h-5" />
            Save Itinerary
          </Button>
          <Button variant="glass" size="lg">
            <Share2 className="w-5 h-5" />
            Share
          </Button>
          <Button variant="glass" size="lg">
            <Download className="w-5 h-5" />
            Export PDF
          </Button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Planner;
