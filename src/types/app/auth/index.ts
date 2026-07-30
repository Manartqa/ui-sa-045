/** Roles the demo ships with — `admin` is a ministry officer, `user` an operator. */
export type UserRole = "admin" | "user";

export interface MockUser {
  username: string;
  password: string;
  role: UserRole;
  /** Shown in the header once signed in. */
  displayName: string;
  /** Thai label for the role, e.g. "เจ้าหน้าที่". */
  roleLabel: string;
}

/** What we keep in the browser session after a successful sign-in. */
export type AuthSession = Omit<MockUser, "password"> & {
  /** Set once a real backend issues one — the API interceptor sends it. */
  token?: string;
};
