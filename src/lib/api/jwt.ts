import { SignJWT, type JWTPayload } from 'jose';

type User = {
  id: string;
  email: string;
};

export const generateToken = async (user: User): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000); // unix timestamp
  const exp = iat + 60 * 60; // timestamp + one hour

  const payload: JWTPayload = { _id: user.id, email: user.email };
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return token;
};
