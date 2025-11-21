import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import FloatingShapes from "@/components/FloatingShapes";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Heart, Share2, Download } from "lucide-react";

const Planner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  // Mock AI-generated itinerary data
  const itinerary = {
    destination: formData.destination || "Paris",
    days: formData.days || "7",
    budget: formData.budget || "2000",
    interests: formData.interests || "Culture, Food, History",
    dailyPlan: [
      {
        day: 1,
        title: "Arrival & City Orientation",
        activities: ["Check into hotel", "Visit Eiffel Tower", "Seine River cruise"],
        cost: "$150",
      },
      {
        day: 2,
        title: "Art & Culture Day",
        activities: ["Louvre Museum", "Notre-Dame Cathedral", "Latin Quarter exploration"],
        cost: "$100",
      },
      {
        day: 3,
        title: "Historical Landmarks",
        activities: ["Arc de Triomphe", "Champs-Élysées shopping", "Montmartre & Sacré-Cœur"],
        cost: "$120",
      },
    ],
    hotels: [
      {
        name: "Hotel Le Bristol Paris",
        price: "$280/night",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      },
      {
        name: "Pullman Paris Tour Eiffel",
        price: "$220/night",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      },
    ],
    flights: [
      {
        airline: "Air France",
        route: "NYC → Paris",
        price: "$650",
        duration: "7h 30m",
      },
      {
        airline: "Delta Airlines",
        route: "NYC → Paris",
        price: "$720",
        duration: "7h 45m",
      },
    ],
  };

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
          <div className="flex flex-wrap gap-4 text-muted-foreground">
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
