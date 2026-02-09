import { ErrorPage } from "@/components/common/ErrorPage";

export default function ForbiddenPage() {
    return <ErrorPage errorCode={403} />;
}
