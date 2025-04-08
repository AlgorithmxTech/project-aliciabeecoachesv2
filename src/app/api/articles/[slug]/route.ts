import { NextResponse } from 'next/server';
import { getArticleBySlug, deleteArticle,updateArticle } from '@/servies/article.services';

export async function GET(
  req: Request,
  contextPromise: Promise<{ params: { slug: string } }>
) {
  const { params } = await contextPromise;
  const { slug } = params;

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  contextPromise: Promise<{ params: { slug: string } }>
) {
  const { params } = await contextPromise;
  const { slug } = params;

  try {
    const deleted = await deleteArticle(slug);
    return NextResponse.json(deleted);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}


export async function PUT(
  req: Request,
  contextPromise: Promise<{ params: { slug: string } }>
) {
  const { params } = await contextPromise;
  const { slug } = params;

  try {
    const body = await req.json();
    const { title, slug: newSlug, tags, content } = body;

    const updated = await updateArticle(slug, {
      title,
      slug: newSlug,
      tags,
      content,
    });

    return NextResponse.json(updated);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}