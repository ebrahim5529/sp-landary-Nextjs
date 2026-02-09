"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { WorkSectionList } from "@/components/work-sections/WorkSectionList";
import { LoadingState } from "@/components/ui/loading";

export default function WorkSectionsPage() {
    const params = useParams();
    const section = params.section as string;
    const [loading, setLoading] = useState(true);

    const sectionNames: Record<string, string> = {
        receive: "استلام الملابس",
        sort: "الفرز والبقع",
        wash: "الغسيل والتجفيف",
        iron: "الكوي والتعليق",
    };

    const previousSectionMap: Record<string, string | null> = {
        receive: null,
        sort: "استلام الملابس",
        wash: "الفرز والبقع",
        iron: "الغسيل والتجفيف",
    };

    useEffect(() => {
        setLoading(false);
    }, [section]);

    // Mock sectionId since we don't have a backend
    const sectionId = "mock-section-id";

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">{sectionNames[section] || 'قسم العمل'}</h2>

            {loading ? (
                <Card>
                    <CardContent className="p-6">
                        <LoadingState variant="spinner" size="lg" />
                    </CardContent>
                </Card>
            ) : sectionId ? (
                <WorkSectionList
                    sectionId={sectionId}
                    sectionName={sectionNames[section] || 'قسم العمل'}
                    previousSectionName={previousSectionMap[section] || null}
                />
            ) : (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        لم يتم العثور على قسم العمل
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
