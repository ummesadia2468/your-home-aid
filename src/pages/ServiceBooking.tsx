import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Star, Clock, MapPin, Calendar as CalendarIcon, CreditCard, Building2, Smartphone, Wallet, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const ServiceBooking = () => {
  const { category, serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    transactionId: ""
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });

  // Sample service data
  const serviceData: Record<string, any> = {
    "1": {
      id: 1,
      name: "Basic House Cleaning",
      provider: "CleanPro Services",
      price: "PKR 2,000",
      originalPrice: "PKR 2,500",
      rating: 4.8,
      reviews: 125,
      duration: "2-3 hours",
      description: "Complete house cleaning including dusting, mopping, and bathroom cleaning",
      features: ["Dusting all surfaces", "Mopping floors", "Bathroom cleaning", "Kitchen cleaning", "Vacuum cleaning"]
    }
  };

  const service = serviceData[serviceId || "1"];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, details: "Visa, MasterCard, American Express" },
    { id: "bank", name: "Bank Transfer", icon: Building2, details: "HBL, UBL, MCB, Allied Bank" },
    { id: "mobile", name: "Mobile Banking", icon: Smartphone, details: "JazzCash, EasyPaisa, UPaisa" },
    { id: "wallet", name: "App Wallet", icon: Wallet, details: "Pay with your app wallet" }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedPayment || !customerDetails.name || !customerDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPayment === "bank" && (!bankDetails.accountHolder || !bankDetails.bankName || !bankDetails.accountNumber)) {
      toast({
        title: "Missing Bank Information",
        description: "Please fill all bank details to proceed.",
        variant: "destructive"
      });
      return;
    }

    // Show success popup
    toast({
      title: "Submit Successfully - Service Confirmed! 🎉",
      description: `Your payment has been processed and service is booked for ${format(selectedDate, 'PPP')} at ${selectedTime}`,
    });

    setTimeout(() => {
      navigate("/booking-dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{service.name}</CardTitle>
                    <p className="text-muted-foreground">{service.provider}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                    {service.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {service.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{service.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">What's Included:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {service.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Service Address</Label>
                  <Input
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    placeholder="Enter complete address"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Special Notes</Label>
                  <Textarea
                    id="notes"
                    value={customerDetails.notes}
                    onChange={(e) => setCustomerDetails({...customerDetails, notes: e.target.value})}
                    placeholder="Any special requirements or notes..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Date & Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label>Select Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-primary text-white rounded-lg">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.details}</p>
                        </div>
                        {selectedPayment === method.id && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Bank Details for Bank Transfer */}
            {selectedPayment === "bank" && (
              <Card>
                <CardHeader>
                  <CardTitle>Bank Transfer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm">HBL Bank</h4>
                      <p className="text-sm text-muted-foreground">Account: 1234567890</p>
                      <p className="text-sm text-muted-foreground">IBAN: PK12HABB1234567890</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm">UBL Bank</h4>
                      <p className="text-sm text-muted-foreground">Account: 0987654321</p>
                      <p className="text-sm text-muted-foreground">IBAN: PK34UBL0987654321</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Enter Your Bank Details</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="accountHolder">Account Holder Name *</Label>
                        <Input
                          id="accountHolder"
                          value={bankDetails.accountHolder}
                          onChange={(e) => setBankDetails({...bankDetails, accountHolder: e.target.value})}
                          placeholder="Enter account holder name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bankName">Bank Name *</Label>
                        <Select value={bankDetails.bankName} onValueChange={(value) => setBankDetails({...bankDetails, bankName: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HBL">HBL Bank</SelectItem>
                            <SelectItem value="UBL">UBL Bank</SelectItem>
                            <SelectItem value="MCB">MCB Bank</SelectItem>
                            <SelectItem value="Allied">Allied Bank</SelectItem>
                            <SelectItem value="NBP">National Bank</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Account Number *</Label>
                        <Input
                          id="accountNumber"
                          value={bankDetails.accountNumber}
                          onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                          placeholder="Enter your account number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                        <Input
                          id="transactionId"
                          value={bankDetails.transactionId}
                          onChange={(e) => setBankDetails({...bankDetails, transactionId: e.target.value})}
                          placeholder="Enter transaction reference"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Total & Book Button */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Service Cost</span>
                    <span>{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Fee</span>
                    <span>PKR 200</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">PKR 2,200</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;