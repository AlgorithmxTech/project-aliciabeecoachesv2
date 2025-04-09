import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from '@/servies/author.services';
import path from 'path';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

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
    const formData = await req.formData();
  
    const file = formData.get('author_image') as File | null;
    const author_name = formData.get('author_name')?.toString() || '';
  const author_description = formData.get('author_desciption')?.toString() || '';
console.log(formData)
  let author_image: string | undefined = undefined;

  if (file && typeof file.arrayBuffer === 'function') {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

    await writeFile(filePath, buffer);
    author_image = `/uploads/${filename}`;
  }
  await updateAuthor(params.id,author_name,author_description,author_image)
 return NextResponse.json({message:'updated successfully '},{status:201})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err)
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


