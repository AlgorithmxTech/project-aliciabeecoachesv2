import { prisma } from '@/utils/prisma';


export const createAuthor = async (data: {
  author_name: string;
  author_desciption: string;
  author_image?: string;
}) => {
  return prisma.author.create({ data });
};

export const getAllAuthors = async () => {
  return prisma.author.findMany();
};


export const getAuthorById = async (id: string) => {
  return prisma.author.findUnique({
    where: { author_id: id },
    include: { article: true }, // Include articles written by this author
  });
};

export const updateAuthor = async (id: string,
  author_name: string,
  author_desciption: string,
  author_image?: string) => {
  return prisma.author.update({
    where: { author_id: id },
    data:{
      author_name:author_name,
      author_desciption:author_desciption,
      author_image:author_image || " "
    },
  });
};


export const deleteAuthor = async (id: string) => {
  return prisma.author.delete({ where: { author_id: id } });
};
