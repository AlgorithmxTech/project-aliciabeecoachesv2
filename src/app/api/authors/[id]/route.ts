import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from '@/services/author.services';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const author = await getAuthorById(params.id);
  if (!author) {
    return NextResponse.json({ error: 'Author not found' }, { status: 404 });
  }
  return NextResponse.json(author);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const updated = await updateAuthor(params.id, data);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteAuthor(params.id);
    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
