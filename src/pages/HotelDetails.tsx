import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import FloatingShapes from "@/components/FloatingShapes";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Coffee, Dumbbell, Car, ArrowLeft } from "lucide-react";

const HotelDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;

  // Mock detailed hotel information
  const hotelDetails = {
    name: hotel?.name || "Hotel Le Bristol Paris",
    price: hotel?.price || "$280/night",
    rating: hotel?.rating || 4.8,
    image: hotel?.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Experience luxury in the heart of Paris. This elegant 5-star hotel offers world-class amenities, stunning city views, and impeccable service.",
    address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
    amenities: [
      { icon: Wifi, name: "Free WiFi" },
      { icon: Coffee, name: "Restaurant & Bar" },
      { icon: Dumbbell, name: "Fitness Center" },
      { icon: Car, name: "Valet Parking" },
    ],
    rooms: [
      {
        type: "Deluxe Room",
        size: "35 m²",
        beds: "1 King Bed",
        price: "$280/night",
      },
      {
        type: "Executive Suite",
        size: "55 m²",
        beds: "1 King Bed + Sofa Bed",
        price: "$450/night",
      },
      {
        type: "Presidential Suite",
        size: "120 m²",
        beds: "2 King Beds",
        price: "$850/night",
      },
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely stunning hotel! The service was exceptional and the location is perfect.",
        date: "2 weeks ago",
      },
      {
        name: "Michael Chen",
        rating: 4.5,
        comment: "Beautiful rooms with great amenities. Breakfast was amazing. Highly recommend!",
        date: "1 month ago",
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
        >
          <Button
            variant="glass"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Itinerary
          </Button>

          {/* Hotel Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={hotelDetails.image}
                alt={hotelDetails.name}
                className="w-full h-full object-cover min-h-[400px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {hotelDetails.name}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm">{hotelDetails.address}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold">{hotelDetails.rating}</span>
                  <span className="text-muted-foreground text-sm">(248 reviews)</span>
                </div>

                <p className="text-muted-foreground mb-6">{hotelDetails.description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {hotelDetails.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <amenity.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Starting from</div>
                    <div className="text-3xl font-bold text-primary">{hotelDetails.price}</div>
                  </div>
                  <Button variant="neon" size="lg">
                    Book Now
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Room Types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotelDetails.rooms.map((room, index) => (
                <GlassCard key={index}>
                  <h3 className="font-bold text-lg mb-3">{room.type}</h3>
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{room.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beds:</span>
                      <span>{room.beds}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-primary font-semibold text-lg">{room.price}</span>
                    <Button variant="glass" size="sm">
                      Select
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
            <div className="space-y-4">
              {hotelDetails.reviews.map((review, index) => (
                <GlassCard key={index}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetails;
