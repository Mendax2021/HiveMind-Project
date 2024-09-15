export interface JWTPayload {
  user: {
    id: number;
    username: string;
  };
  iat: number;
  exp: number;
}
