'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useViewTracker from '@/hooks/useViewTracker';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Layout from '@/components/common/Layout';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface Author {
  author_name: string;
  author_image: string;
}

interface Article {
  title: string;
  content: string;
  tags: string[] | string;
  image_url?: string;
  created_at: string;
  author?: Author;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [views, setViews] = useState(0);

  useViewTracker(slug);

  const articleUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/articles/${slug}`
      : '';

  const calculateReadTime = (content: string) => {
    const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
  };

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/articles/${slug}`);
        const data = await res.json();

        const parsedTags = Array.isArray(data.tags)
          ? data.tags
          : JSON.parse(data.tags || '[]');

        setArticle({ ...data, tags: parsedTags });

        const likeRes = await fetch(`/api/articles/${slug}/likes`);
        const likeData = await likeRes.json();
        setLikeCount(likeData.likes || 0);

        const viewRes = await fetch(`/api/articles/${slug}/views`);
        const viewData = await viewRes.json();
        setViews(viewData.views || 0);

        const likedKey = `liked:${slug}`;
        if (typeof window !== 'undefined') {
          setLiked(!!localStorage.getItem(likedKey));
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleLike = async () => {
    const likeKey = `liked:${slug}`;
    const alreadyLiked =
      typeof window !== 'undefined' && localStorage.getItem(likeKey);

    const action = alreadyLiked ? 'unlike' : 'like';

    const res = await fetch(`/api/articles/${slug}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      const result = await res.json();
      setLikeCount(result.likes);

      if (action === 'like') {
        localStorage.setItem(likeKey, 'true');
        setLiked(true);
      } else {
        localStorage.removeItem(likeKey);
        setLiked(false);
      }
    }
  };

  if (loading || !article) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Layout>
        <div className="max-w-5xl mx-auto p-6">
          {/* Author Info */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              {article.author?.author_image && (
                <img
                  alt={article.author.author_name}
                  src={article.author.author_image}
                  className="h-10 w-10 object-cover rounded-full"
                />
              )}
              <div className="flex flex-col">
                <span className="text-md font-semibold text-black capitalize">
                  {article.author?.author_name || 'Unknown Author'}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(article.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  • {calculateReadTime(article.content)}
                </span>
              </div>
            </div>
            <div
              className="flex text-red-500 items-center gap-1 cursor-pointer"
              onClick={handleLike}
            >
              {liked ? <BsHeartFill size={24} /> : <BsHeart size={24} />}
              <span>{likeCount}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

          {/* Image */}
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full max-h-[500px] object-cover rounded mb-6"
            />
          )}

          {/* Tags */}
          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="border rounded-full px-3 py-1 text-sm border-gray-400 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg text-black dark:text-white mb-10"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share Section */}
          <hr className="w-full h-[2px]" />
          <div className="py-4 flex items-center gap-3 text-gray-600">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={22} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={22} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?url=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={22} />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(articleUrl)}
              title="Copy Link"
            >
              <FaLink size={22} />
            </button>
          </div>
          <hr className="w-full h-[2px]" />

          {/* Views */}
          <div className="pt-4 text-gray-500">
            <span>
              {views} {views === 1 ? 'view' : 'views'}
            </span>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
