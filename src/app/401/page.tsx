import { ErrorPage } from "@/components/common/ErrorPage";

export default function UnauthorizedPage() {
    return <ErrorPage errorCode={401} />;
}
