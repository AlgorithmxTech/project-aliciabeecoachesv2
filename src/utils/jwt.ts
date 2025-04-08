import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'dev-secret');

export async function signToken(id: string): Promise<string> {
  return await new SignJWT({ userid: id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ userid: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userid: string };
  } catch (e) {
    console.error("JWT verification failed:", e);
    return null;
  }
}
