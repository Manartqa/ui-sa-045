import { ForgotPasswordContent } from "@/components/partials/ForgotPassword";
import { LOGIN_VARIANTS } from "@/components/partials/Login/Login.config";

export default function OperatorForgotPasswordPage() {
  return <ForgotPasswordContent variant={LOGIN_VARIANTS.operator} />;
}
