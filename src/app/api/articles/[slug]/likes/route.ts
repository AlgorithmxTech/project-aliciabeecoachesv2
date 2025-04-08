import { NextRequest, NextResponse } from 'next/server';
import client from '@/utils/redis';


export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const body = await req.json();
    const { action } = body; // expects { action: 'like' | 'unlike' }

    const key = `like:${slug}`;

    if (action === 'like') {
      const updated = await client.incr(key);
      return NextResponse.json({ liked: true, likes: updated }, { status: 200 });
    } else if (action === 'unlike') {
      const currentLikes = parseInt((await client.get(key)) || '0');
      const newCount = Math.max(currentLikes - 1, 0);
      await client.set(key, newCount);
      return NextResponse.json({ liked: false, likes: newCount }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



export async function GET(  req: NextRequest,
  { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const likes = await client.get(`like:${slug}`);
    return NextResponse.json({ likes: parseInt(likes || '0') }, { status: 200 });
  } catch (error) {
    console.error('Error fetching like count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}