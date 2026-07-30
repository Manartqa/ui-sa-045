import React from "react";

/** Sign-in screens render full-bleed — no AdminLayout chrome. */
export default function AuthGroupLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
