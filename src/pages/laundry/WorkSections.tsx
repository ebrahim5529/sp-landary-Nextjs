import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { WorkSectionList } from "@/components/work-sections/WorkSectionList";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function WorkSections() {
  const { section } = useParams<{ section: string }>();
    const [sectionId, setSectionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const sectionNames: Record<string, string> = {
    receive: "استلام الملابس",
    sort: "الفرز والبقع",
    wash: "الغسيل والتجفيف",
    iron: "الكوي والتعليق",
  };

  const sectionNameToDbName: Record<string, string> = {
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

  const fetchWorkSection = async () => {
    // Backend removal cleanup: logic removed
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">{sectionNames[section || ''] || 'قسم العمل'}</h2>

        {loading ? (
          <Card>
            <CardContent className="p-6">
              <LoadingState variant="spinner" size="lg" />
            </CardContent>
          </Card>
        ) : sectionId ? (
          <WorkSectionList
            sectionId={sectionId}
            sectionName={sectionNames[section || ''] || 'قسم العمل'}
            previousSectionName={previousSectionMap[section || ''] || null}
          />
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              لم يتم العثور على قسم العمل
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

