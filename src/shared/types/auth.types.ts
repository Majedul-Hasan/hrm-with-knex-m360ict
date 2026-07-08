export interface JwtPayload {
  id: number;
  userName: string;
  email: string | null;
  roleId: number | null;
  roleName: string;
}
