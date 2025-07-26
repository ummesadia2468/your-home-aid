import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Users } from "lucide-react";
import Header from "@/components/Header";
import AreaFilter from "@/components/AreaFilter";

const ServiceCategory = () => {
  const { category } = useParams();

  // Sample services data with Pakistani prices
  const servicesData: Record<string, any[]> = {
    "cleaning": [
      {
        id: 1,
        name: "Basic House Cleaning",
        provider: "CleanPro Services",
        price: "PKR 2,000",
        originalPrice: "PKR 2,500",
        rating: 4.8,
        reviews: 125,
        duration: "2-3 hours",
        image: "/placeholder.svg",
        description: "Complete house cleaning including dusting, mopping, and bathroom cleaning"
      },
      {
        id: 2,
        name: "Deep Cleaning Service",
        provider: "Sparkle Clean",
        price: "PKR 4,500",
        originalPrice: "PKR 5,000",
        rating: 4.9,
        reviews: 89,
        duration: "4-5 hours",
        image: "/placeholder.svg",
        description: "Comprehensive deep cleaning with kitchen appliances and carpet cleaning"
      },
      {
        id: 3,
        name: "Office Cleaning",
        provider: "Commercial Clean Co.",
        price: "PKR 3,000",
        rating: 4.7,
        reviews: 67,
        duration: "3-4 hours",
        image: "/placeholder.svg",
        description: "Professional office cleaning including workstations and meeting rooms"
      }
    ],
    "painting": [
      {
        id: 1,
        name: "Interior Wall Painting",
        provider: "Paint Masters",
        price: "PKR 15,000",
        rating: 4.8,
        reviews: 45,
        duration: "2-3 days",
        image: "/placeholder.svg",
        description: "Complete interior painting with premium quality paint"
      },
      {
        id: 2,
        name: "Exterior House Painting",
        provider: "Color Craft",
        price: "PKR 25,000",
        rating: 4.9,
        reviews: 32,
        duration: "3-5 days",
        image: "/placeholder.svg",
        description: "Weather-resistant exterior painting with primer"
      }
    ],
    "electrician": [
      {
        id: 1,
        name: "Electrical Wiring",
        provider: "PowerFix Solutions",
        price: "PKR 5,000",
        rating: 4.7,
        reviews: 78,
        duration: "4-6 hours",
        image: "/placeholder.svg",
        description: "Complete electrical wiring installation and repair"
      },
      {
        id: 2,
        name: "Fan Installation",
        provider: "Quick Electric",
        price: "PKR 800",
        rating: 4.6,
        reviews: 156,
        duration: "1 hour",
        image: "/placeholder.svg",
        description: "Ceiling fan installation with proper wiring"
      }
    ],
    "appliance": [
      {
        id: 1,
        name: "AC Repair & Service",
        provider: "Cool Tech",
        price: "PKR 2,500",
        rating: 4.8,
        reviews: 134,
        duration: "2-3 hours",
        image: "/placeholder.svg",
        description: "AC repair, gas refilling, and general maintenance"
      },
      {
        id: 2,
        name: "Washing Machine Repair",
        provider: "Appliance Pro",
        price: "PKR 1,800",
        rating: 4.5,
        reviews: 89,
        duration: "1-2 hours",
        image: "/placeholder.svg",
        description: "Washing machine repair and parts replacement"
      }
    ]
  };

  const categoryMap: Record<string, string> = {
    "cleaning": "Cleaning Services",
    "painting": "House Painting",
    "electrician": "Electrician Services", 
    "appliance": "Home Appliance Repair",
    "laundry": "Laundry Service",
    "beauty": "Beauty & Salon",
    "moving": "Moving & Shifting",
    "car": "Car Services",
    "printing": "Printing Services",
    "renovation": "Home Renovation"
  };

  const services = servicesData[category || "cleaning"] || [];
  const categoryName = categoryMap[category || "cleaning"] || "Services";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">Choose from verified professionals in your area</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <AreaFilter />
          <div className="flex gap-2">
            <Badge variant="outline">Price: Low to High</Badge>
            <Badge variant="outline">Highest Rated</Badge>
            <Badge variant="outline">Most Popular</Badge>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-hover transition-shadow cursor-pointer">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{service.provider}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                      <span className="text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{service.price}</span>
                      {service.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {service.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg">
            Load More Services
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;