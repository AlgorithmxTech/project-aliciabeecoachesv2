'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

interface Article {
  title: string;
  content: string;
  image_url?: string;
  author_by: string;
  created_at: string;
  tags: string[];
}

interface Author {
  author_id: string;
  author_name: string;
  author_image?: string;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const calculateReadTime = (content: string): string => {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
};

const ReadArticle = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/articles/${slug}`);
      const data = await res.json();
      setArticle(data);

      if (data.author_by) {
        const authorRes = await fetch(`/api/authors/${data.author_by}`);
        const authorData = await authorRes.json();
        setAuthor(authorData);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      {/* Article Header */}
      <div className="flex items-center mb-6">
        <Avatar src={author?.author_image || "/default-avatar.jpg"} size="large" />
        <div className="ml-3">
          <p className="font-semibold text-sm">{author?.author_name || "Unknown Author"}</p>
          <p className="text-xs text-gray-500">
            {formatDate(article.created_at)} • {calculateReadTime(article.content)}
          </p>
        </div>
        <HeartOutlined className="ml-auto text-xl text-red-500 cursor-pointer" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-4">{article.title}</h1>

      {/* Tags */}
      <div className="flex justify-center gap-2 mb-6">
        {article.tags.map((tag, index) => (
          <Tag key={index} className="rounded-full px-4 py-1 text-sm bg-gray-200 border-none">
            {tag}
          </Tag>
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none text-justify text-gray-700 mb-10">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-100 p-6 rounded-lg mt-12 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Connect With Me</h2>
        <p className="text-sm text-gray-700">
          Are you interested in a technical career but you want to know more about the no-code jobs?
          Are you already a technician? Want to tell me how you started and the skills you gained?
          Do you own a taco truck and need a taste tester? Connect with me for a free 15-minute tech and business growth coaching session.
          Schedule at <a href="https://coachablecoaches.com" className="text-blue-600 underline">coachablecoaches.com</a> or email me at 
          <a href="mailto:hello@aliciabeecoaches.com" className="text-blue-600 underline"> hello@aliciabeecoaches.com</a>.
        </p>
      </div>
    </div>
  );
};

export default ReadArticle;