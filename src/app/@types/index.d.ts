interface UserRole {
  id?: string;
  _id?: string;
  name: string;
  isSuperAdmin: boolean;
  permissions: string[];
}

interface AuthUser {
  id?: string;
  _id?: string;
  status?: string;
  email?: string;
  role: UserRole;
}
declare global {
  namespace Express {
    interface Request {
      user?: T;
    }
  }
}
export {};
