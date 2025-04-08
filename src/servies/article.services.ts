import { prisma } from '@/utils/prisma';

export const createArticle = async (data: {
  title: string;
  content: string;
  author_by?: string;

  tags?: string[];
  image_url?: string;
}) => {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const slug = generateSlug(data.title);
  return prisma.article.create({
    data:{
      title:data.title,
      content:data.content,
      slug:slug,
      author_by:data.author_by,
      tags:data.tags,
      image_url:data.image_url
    }
  });
};

export const getAllArticles = async () => {
  return prisma.article.findMany();
};

export const getArticleById = async (id: string) => {
  return prisma.article.findUnique({ where: { article_id: id } });
};

export const updateArticle = async (id: string, data: Partial<{
  title: string;
  content: string;
  slug: string;
  tags: string[];
}>) => {
  return prisma.article.update({
    where: { article_id: id },
    data,
  });
};

export const deleteArticle = async (slug: string) => {
  return prisma.article.delete({ where: { slug:slug} });
};

export const getArticleBySlug = async (slug:string)=>{
  return prisma.article.findUnique({where:{slug:slug},include:{
    author:true
  }})
}