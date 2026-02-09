"use client";

import { Payments } from "@/components/financial/Payments";

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">المدفوعات (المصروفات)</h2>
            <Payments />
        </div>
    );
}
