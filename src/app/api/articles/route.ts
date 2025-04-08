import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { createArticle, getAllArticles } from '@/servies/article.services';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const articles = await getAllArticles();
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
  
    const file = formData.get('image') as File | null;
    const title = formData.get('title')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const tags = formData.get('tags')?.toString() || '[]';

  
    let image_url: string | undefined = undefined;
  
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(filePath, buffer);
      image_url = `/uploads/${filename}`;
    }
  
    const article = await createArticle({
      title,
      content,
      tags: JSON.parse(tags),
      image_url,
    });
  
    return NextResponse.json(article, { status: 201 });
  }

  export const config = {
    api: {
      bodyParser: false, 
    },
  };
  
  