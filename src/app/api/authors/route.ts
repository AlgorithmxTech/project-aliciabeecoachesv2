import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { createAuthor,getAllAuthors } from '@/servies/author.services';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('image') as File | null;
  const author_name = formData.get('author_name')?.toString() || '';
  const author_desciption = formData.get('author_desciption')?.toString() || '';
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

  const author = await createAuthor({
    author_name,
    author_desciption,
    author_image,
  });

  return NextResponse.json(author, { status: 201 });
}

export async function GET() {
    const authors = await getAllAuthors();
    return NextResponse.json(authors);
  }
  
export const config = {
  api: {
    bodyParser: false, 
  },
};


