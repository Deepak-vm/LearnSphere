import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const duePayments = [
  {
    id: "DUE001",
    dueDate: "2024-03-15",
    amount: 25000,
    description: "Third Installment",
    status: "PENDING",
  },
  {
    id: "DUE002",
    dueDate: "2024-04-15",
    amount: 25000,
    description: "Final Installment",
    status: "UPCOMING",
  },
];

export function DuePayments() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");
  
  const handlePayment = () => {
    // In a real application, this would initiate the payment process
    alert(`Processing payment using ${paymentMethod}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Due Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {duePayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-1">
                <p className="font-medium">{payment.description}</p>
                <p className="text-sm text-muted-foreground">
                  Due by: {new Date(payment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                  <Badge variant={payment.status === "PENDING" ? "destructive" : "secondary"}>{payment.status}</Badge>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedPayment(payment.id)} disabled={payment.status === "UPCOMING"}>
                      Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Make Payment</DialogTitle>
                      <DialogDescription>Choose your preferred payment method</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online">Online Payment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank">Bank Transfer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi">UPI</Label>
                        </div>
                      </RadioGroup>
                      <div className="pt-4 border-t">
                        <Button onClick={handlePayment} className="w-full">
                          Pay ₹{duePayments.find(p => p.id === selectedPayment)?.amount.toLocaleString() || 0}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}