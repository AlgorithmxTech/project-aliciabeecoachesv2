import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from '@/servies/author.services';

export async function GET(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const author = await getAuthorById(params.id);
  if (!author) {
    return NextResponse.json({ error: 'Author not found' }, { status: 404 });
  }
  return NextResponse.json(author);
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const data = await req.json();
    const updated = await updateAuthor(params.id, data);
    return NextResponse.json(updated);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const deleted = await deleteAuthor(params.id);
    return NextResponse.json(deleted);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
