import { motion } from "framer-motion";
import { Plane, Twitter, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 bg-glass-bg/30 backdrop-blur-lg border-t border-glass-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
                <Plane className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TravelAI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered travel planning for your perfect journey.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">AI Planner</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Destinations</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">About</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-glass-bg/50 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-glass-bg/50 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-glass-bg/50 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-glass-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TravelAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
