import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, Users } from "lucide-react";
import LoginModal from "@/components/ui/LoginModal"; // Import login modal

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Navigation */}
      <nav className="glass-effect border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">LJ</span>
              </div>
              <span className="text-xl font-roboto-slab font-semibold text-primary">
                PeoplePulse
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-black transition-colors"
                onClick={() => setShowLogin(true)}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
          <Badge variant="secondary" className="mx-auto mb-6">
            <Heart className="w-3 h-3 mr-2" />
            Delightful Minimalism
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-roboto-slab font-bold text-foreground leading-tight">
            PeoplePulse
            <span className="block gradient-hero bg-clip-text text-transparent">
              HR Made Easy
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Manage employee leaves easily. HR can approve or reject requests quickly, and employees can request or track leaves without any hassle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/hr/dashboard">
              <Button className="group gradient-hero text-white hover:opacity-90 shadow-glow hover:shadow-xl transition-all duration-300">
                HR Dashboard
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link to="/employee/dashboard">
              <Button variant="outline" className="group">
                Employee Portal
                <Users className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/20 py-12 mt-24 text-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground">PeoplePulse</h3>
        <p className="text-muted-foreground text-sm">
          Simple and joyful HR leave management for teams and employees.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-primary hover:underline">About</a>
          <a href="#" className="text-primary hover:underline">Privacy</a>
          <a href="#" className="text-primary hover:underline">Contact</a>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          &copy; {new Date().getFullYear()} PeoplePulse. All rights reserved.
        </p>
      </footer>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default Index;
