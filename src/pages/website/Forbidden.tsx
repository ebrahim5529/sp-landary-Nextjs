import { ErrorPage } from "@/components/common/ErrorPage";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function Forbidden() {
  return <ErrorPage errorCode={403} />;
}

