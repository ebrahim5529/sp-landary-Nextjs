"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/common/ErrorPage";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <ErrorPage
            errorCode={500}
            showRefreshButton={true}
            customActions={
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                    أعد المحاولة
                </button>
            }
        />
    );
}
