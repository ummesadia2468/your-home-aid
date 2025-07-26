import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, DollarSign, Users, Star } from "lucide-react";
import Header from "@/components/Header";

const ProviderDashboard = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Deep House Cleaning",
      category: "Cleaning Services",
      price: "PKR 3,000",
      description: "Complete house cleaning with kitchen and bathroom deep clean",
      duration: "3-4 hours"
    },
    {
      id: 2,
      name: "AC Installation",
      category: "Electrician", 
      price: "PKR 2,500",
      description: "Professional AC installation with warranty",
      duration: "2-3 hours"
    }
  ]);

  const [newService, setNewService] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    duration: ""
  });

  const categories = [
    "Cleaning Services",
    "House Painting", 
    "Electrician",
    "Home Appliance Repair",
    "Laundry Service",
    "Beauty & Salon",
    "Moving & Shifting",
    "Car Services",
    "Printing Services",
    "Home Renovation"
  ];

  const addService = () => {
    if (newService.name && newService.category && newService.price) {
      setServices([...services, { 
        id: Date.now(), 
        ...newService 
      }]);
      setNewService({
        name: "",
        category: "",
        price: "",
        description: "",
        duration: ""
      });
    }
  };

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your services and business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">PKR 45,500</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Bookings</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Services</p>
                  <p className="text-2xl font-bold">{services.length}</p>
                </div>
                <Plus className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
              />
              
              <Select value={newService.category} onValueChange={(value) => setNewService({...newService, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Price (PKR)"
                value={newService.price}
                onChange={(e) => setNewService({...newService, price: e.target.value})}
              />
              
              <Input
                placeholder="Duration (e.g., 2-3 hours)"
                value={newService.duration}
                onChange={(e) => setNewService({...newService, duration: e.target.value})}
              />
              
              <Textarea
                placeholder="Service Description"
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
              />
              
              <Button onClick={addService} className="w-full">
                Add Service
              </Button>
            </CardContent>
          </Card>

          {/* My Services */}
          <Card>
            <CardHeader>
              <CardTitle>My Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteService(service.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{service.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-primary">{service.price}</span>
                      <span className="text-muted-foreground">{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;