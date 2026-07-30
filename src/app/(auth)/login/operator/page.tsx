import { LoginContent } from "@/components/partials/Login";
import { LOGIN_VARIANTS } from "@/components/partials/Login/Login.config";

export default function OperatorLoginPage() {
  return <LoginContent variant={LOGIN_VARIANTS.operator} />;
}
