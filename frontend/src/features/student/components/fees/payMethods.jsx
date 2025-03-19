import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const savedMethods = [
  {
    id: 1,
    type: "Credit Card",
    last4: "4242",
    expiry: "12/25",
  },
  {
    id: 2,
    type: "UPI",
    id: "user@upi",
  },
];

export function PaymentMethods() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">{method.type}</p>
                <p className="text-sm text-muted-foreground">
                  {method.type === "Credit Card" ? `•••• ${method.last4} | Expires ${method.expiry}` : method.id}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}