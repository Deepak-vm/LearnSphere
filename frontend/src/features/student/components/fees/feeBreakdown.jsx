import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const feeBreakdown = {
  totalFee: 125000,
  paid: 75000,
  components: [
    { name: "Tuition Fee", amount: 100000 },
    { name: "Development Fee", amount: 15000 },
    { name: "Library Fee", amount: 5000 },
    { name: "Laboratory Fee", amount: 5000 },
  ],
};

export function FeeBreakdown() {
  const progress = (feeBreakdown.paid / feeBreakdown.totalFee) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Fee Paid</span>
            <span className="font-medium">₹{feeBreakdown.paid.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining</span>
            <span className="font-medium text-red-600">
              ₹{(feeBreakdown.totalFee - feeBreakdown.paid).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          {feeBreakdown.components.map((component, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{component.name}</span>
              <span className="font-medium">₹{component.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="pt-4 border-t flex justify-between items-center font-medium">
            <span>Total</span>
            <span>₹{feeBreakdown.totalFee.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}