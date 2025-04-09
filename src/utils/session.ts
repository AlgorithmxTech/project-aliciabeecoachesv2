// utils/session.ts
import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

export async function getSession() {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('auth_token')?.value;
  
    if (!token) return null;
  if (!token) return null;

  const payload = verifyToken(token);
  return payload; 
}
