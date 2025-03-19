import { FeePaymentHeader } from "../components/fees/FeePayHeader"
import { FeeBreakdown } from "../components/fees/feeBreakdown"
import { PaymentHistory } from "../components/fees/payHistory"
import { PaymentMethods } from "../components/fees/payMethods"
import { DuePayments } from "../components/fees/duePays"

export default function FeePaymentPage() {
  return (
    <div className="container py-6 space-y-6">
      <FeePaymentHeader />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <DuePayments />
          <PaymentHistory />
        </div>
        <div className="space-y-6">
          <FeeBreakdown />
          <PaymentMethods />
        </div>
      </div>
    </div>
  )
}

