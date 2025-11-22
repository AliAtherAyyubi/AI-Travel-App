import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import { 
  User, Mail, Lock, Camera, Save, Bell, Shield, 
  MapPin, Calendar, Clock, Package, History, Activity,
  CreditCard, Download, Eye
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
  });

  // Mock data for orders
  const orders = [
    {
      id: "ORD-001",
      destination: "Paris, France",
      date: "2024-03-15",
      amount: "$2,450",
      status: "Completed",
    },
    {
      id: "ORD-002",
      destination: "Tokyo, Japan",
      date: "2024-02-20",
      amount: "$3,200",
      status: "Upcoming",
    },
    {
      id: "ORD-003",
      destination: "Bali, Indonesia",
      date: "2024-01-10",
      amount: "$1,800",
      status: "Completed",
    },
  ];

  // Mock data for activity
  const activities = [
    {
      id: 1,
      action: "Generated itinerary for Paris",
      timestamp: "2 hours ago",
      icon: MapPin,
    },
    {
      id: 2,
      action: "Updated profile picture",
      timestamp: "1 day ago",
      icon: Camera,
    },
    {
      id: 3,
      action: "Saved destination: Tokyo",
      timestamp: "3 days ago",
      icon: Package,
    },
    {
      id: 4,
      action: "Changed password",
      timestamp: "1 week ago",
      icon: Lock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <GlassCard className="mb-8 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-primary shadow-neon">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="neon"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10"
                >
                  <Camera className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                <p className="text-muted-foreground mb-4">{profileData.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {profileData.location}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined March 2024
                  </Badge>
                </div>
              </div>

              <div className="flex gap-4">
                <Card className="bg-gradient-card border-glass-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-sm text-muted-foreground">Trips</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-glass-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-secondary">8</p>
                    <p className="text-sm text-muted-foreground">Countries</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </GlassCard>

          {/* Tabs Section */}
          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-glass-bg/50 backdrop-blur-sm border border-glass-border">
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid gap-6">
                <GlassCard className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="pl-10 bg-muted/50 border-glass-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="pl-10 bg-muted/50 border-glass-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="bg-muted/50 border-glass-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                            className="pl-10 bg-muted/50 border-glass-border"
                          />
                        </div>
                      </div>
                    </div>
                    <Button variant="neon" className="w-full md:w-auto">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </GlassCard>

                <GlassCard className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive trip updates via email</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Payment Methods</p>
                          <p className="text-sm text-muted-foreground">Manage your payment options</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </GlassCard>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <GlassCard className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and manage your travel bookings</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="bg-gradient-card border-glass-border hover:shadow-neon transition-all">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{order.destination}</h3>
                                <Badge 
                                  variant={order.status === "Completed" ? "default" : "secondary"}
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {order.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Package className="w-3 h-3" />
                                  {order.id}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">{order.amount}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <GlassCard className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions and updates</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-4">
                    {activities.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
                            <Icon className="w-4 h-4 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="grid gap-6">
                <GlassCard className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-muted/50 border-glass-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-muted/50 border-glass-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-muted/50 border-glass-border"
                        />
                      </div>
                    </div>
                    <Button variant="neon">Update Password</Button>
                  </CardContent>
                </GlassCard>

                <GlassCard className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">2FA Status</p>
                        <p className="text-sm text-muted-foreground">Currently disabled</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </CardContent>
                </GlassCard>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
