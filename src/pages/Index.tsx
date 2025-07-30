import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import AreaFilter from "@/components/AreaFilter";

const Index = () => {
  const [selectedArea, setSelectedArea] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Area Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Find Services in Your Area</h2>
          <p className="text-muted-foreground mb-6">Select your area to see available services</p>
          <div className="flex justify-center">
            <AreaFilter onAreaChange={setSelectedArea} />
          </div>
          {selectedArea && (
            <p className="mt-4 text-primary font-medium">
              Showing services available in {selectedArea}
            </p>
          )}
        </div>
      </div>
      
      <ServiceCategories selectedArea={selectedArea} />
      <HowItWorks />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
