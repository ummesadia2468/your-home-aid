import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2, Smartphone, Wallet } from "lucide-react";

const PaymentMethods = () => {
  const paymentMethods = [
    {
      id: 1,
      name: "Credit/Debit Cards",
      icon: CreditCard,
      description: "Visa, MasterCard, American Express",
      available: true
    },
    {
      id: 2,
      name: "Bank Transfer",
      icon: Building2,
      description: "HBL, UBL, MCB, Allied Bank",
      available: true
    },
    {
      id: 3,
      name: "Mobile Banking",
      icon: Smartphone,
      description: "JazzCash, EasyPaisa, UPaisa",
      available: true
    },
    {
      id: 4,
      name: "Wallet",
      icon: Wallet,
      description: "Pay with your app wallet",
      available: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <div 
                key={method.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary text-white rounded-lg">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                {method.available && (
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;