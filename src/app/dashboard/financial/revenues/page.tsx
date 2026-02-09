"use client";

import { Revenues } from "@/components/financial/Revenues";

export default function RevenuesPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">الإيرادات</h2>
            <Revenues />
        </div>
    );
}
