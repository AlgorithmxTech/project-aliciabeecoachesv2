
import { NextRequest, NextResponse } from 'next/server';
import client from '@/utils/redis'; // Make sure this is your configured Redis client

export async function GET(_req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json({ error: 'Missing article slug' }, { status: 400 });
    }
  
    const views = await client.get(`view:${slug}`);
    console.log(views)
    return NextResponse.json({ views: Number(views) || 0 }); 
  } catch (error) {
    return NextResponse.json({ error:error},{status:400}); 
  }
}

export async function POST(_req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Missing article slug' }, { status: 400 });
  }

  // INCR key in Redis
  const updatedViews = await client.incr(`view:${slug}`);
  return NextResponse.json({ views: updatedViews });
}