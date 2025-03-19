import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const paymentHistory = [
  {
    id: "TXN001",
    date: "2024-02-01",
    amount: 25000,
    mode: "Online",
    status: "SUCCESS",
    description: "First Semester Fee",
  },
  {
    id: "TXN002",
    date: "2024-01-15",
    amount: 25000,
    mode: "Online",
    status: "SUCCESS",
    description: "Second Installment",
  },
  {
    id: "TXN003",
    date: "2023-12-01",
    amount: 25000,
    mode: "Bank Transfer",
    status: "SUCCESS",
    description: "First Installment",
  },
];

export function PaymentHistory() {
  const downloadReceipt = (transactionId) => {
    // In a real application, this would generate and download a PDF receipt
    alert(`Downloading receipt for transaction ${transactionId}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                <TableCell>{payment.mode}</TableCell>
                <TableCell>
                  <Badge variant={payment.status === "SUCCESS" ? "success" : "destructive"}>{payment.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => downloadReceipt(payment.id)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}