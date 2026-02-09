import { ErrorPage } from "@/components/common/ErrorPage";

export default function ServerErrorPage() {
    return <ErrorPage errorCode={500} />;
}
