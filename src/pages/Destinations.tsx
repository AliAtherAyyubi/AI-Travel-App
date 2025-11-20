import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Plane, Calendar, DollarSign } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    rating: 4.9,
    trips: "125K+",
    description: "The City of Light awaits with iconic landmarks, world-class museums, and exquisite cuisine.",
    avgBudget: "$2,500",
    bestTime: "Apr-Oct",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Montmartre"],
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    rating: 4.8,
    trips: "98K+",
    description: "Experience the perfect blend of ancient traditions and cutting-edge technology.",
    avgBudget: "$3,000",
    bestTime: "Mar-May",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Mt. Fuji", "Robot Restaurant"],
  },
  {
    id: 3,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: 4.7,
    trips: "156K+",
    description: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture.",
    avgBudget: "$1,800",
    bestTime: "Apr-Sep",
    highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach", "Monkey Forest"],
  },
  {
    id: 4,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    rating: 4.8,
    trips: "210K+",
    description: "The city that never sleeps offers endless entertainment, culture, and iconic landmarks.",
    avgBudget: "$3,500",
    bestTime: "May-Oct",
    highlights: ["Statue of Liberty", "Central Park", "Times Square", "Brooklyn Bridge"],
  },
  {
    id: 5,
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    rating: 4.9,
    trips: "145K+",
    description: "Luxury and innovation meet in this futuristic desert metropolis.",
    avgBudget: "$4,000",
    bestTime: "Nov-Mar",
    highlights: ["Burj Khalifa", "Palm Jumeirah", "Desert Safari", "Dubai Mall"],
  },
  {
    id: 6,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    rating: 4.9,
    trips: "89K+",
    description: "Whitewashed villages, stunning sunsets, and crystal-clear Aegean waters.",
    avgBudget: "$2,200",
    bestTime: "May-Oct",
    highlights: ["Oia Sunset", "Red Beach", "Ancient Akrotiri", "Wine Tasting"],
  },
  {
    id: 7,
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    rating: 5.0,
    trips: "67K+",
    description: "Overwater bungalows, pristine beaches, and world-class diving in paradise.",
    avgBudget: "$5,000",
    bestTime: "Nov-Apr",
    highlights: ["Underwater Restaurant", "Coral Reefs", "Luxury Resorts", "Water Sports"],
  },
  {
    id: 8,
    name: "London, UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    rating: 4.7,
    trips: "175K+",
    description: "Historic landmarks, royal palaces, and a vibrant multicultural atmosphere.",
    avgBudget: "$3,200",
    bestTime: "May-Sep",
    highlights: ["Big Ben", "Buckingham Palace", "Tower Bridge", "British Museum"],
  },
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Explore{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Amazing Destinations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the world's most captivating places with AI-powered travel planning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-0 overflow-hidden h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-glass-bg/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold">{destination.rating}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Plane className="w-4 h-4" />
                          <span>{destination.trips} trips planned</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 flex-grow">
                      {destination.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Avg. Budget</div>
                          <div className="text-sm font-semibold">{destination.avgBudget}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Best Time</div>
                          <div className="text-sm font-semibold">{destination.bestTime}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-2">Top Highlights</div>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="neon" className="w-full">
                      <MapPin className="w-4 h-4" />
                      Plan Your Trip
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
