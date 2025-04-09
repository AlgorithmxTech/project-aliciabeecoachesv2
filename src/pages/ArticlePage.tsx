"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Input, Tag } from "antd";
import { Empty } from "antd"; // ⬅️ Add this import at the top
import { FileTextOutlined } from "@ant-design/icons";
import { ShareAltOutlined } from "@ant-design/icons";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import Link from "next/link";
import ShareMenu from "@/components/ui/ShareMenu";
const { Search } = Input;

interface Article {
  article_id: string;
  title: string;
  slug: string;
  content: string;
  image_url?: string;
  author_by: string;
  created_at: string;
  views: number;
  likes: number;
  tags: string[];
}

interface Author {
  author_id: string;
  author_name: string;
  author_image: string;
}

const calculateReadTime = (content: string): string => {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>("All Posts");
  const [showAllTags, setShowAllTags] = useState(false);
  const [showShare, setShowShare] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Start loading

      try {
        const res = await fetch("/api/articles");
        const data = await res.json();

        const viewsData = await Promise.all(
          data.map(async (article: Article) => {
            try {
              const res = await fetch(`/api/articles/${article.slug}/views`);
              const viewJson = await res.json();
              return viewJson.views || 0;
            } catch {
              return 0;
            }
          })
        );

        const likesData = await Promise.all(
          data.map(async (article: Article) => {
            try {
              const res = await fetch(`/api/articles/${article.slug}/likes`);
              const likeJson = await res.json();
              return likeJson.likes || 0;
            } catch {
              return 0;
            }
          })
        );

        const articlesWithCounts = data.map((article: Article, i: number) => ({
          ...article,
          views: viewsData[i],
          likes: likesData[i],
        }));
        setArticles(articlesWithCounts);
        setFilteredArticles(articlesWithCounts);

        const uniqueTags = [
          "All Posts",
          ...new Set(data.flatMap((article: Article) => article.tags)),
        ];
        setTags(uniqueTags as string[]);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false); // Done loading
      }
    };

    const fetchAuthors = async () => {
      const res = await fetch("/api/authors");
      const data = await res.json();
      setAuthors(data);
    };

    fetchArticles();
    fetchAuthors();
  }, []);

  const handleLike = async (slug: string) => {
    const likeKey = `liked:${slug}`;
    const alreadyLiked = localStorage.getItem(likeKey);

    const action = alreadyLiked ? "unlike" : "like";

    const res = await fetch(`/api/articles/${slug}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      const result = await res.json();

      if (action === "like") {
        localStorage.setItem(likeKey, "true");
      } else {
        localStorage.removeItem(likeKey);
      }

      // Update article likes in UI
      setArticles((prev) =>
        prev.map((article) =>
          article.slug === slug ? { ...article, likes: result.likes } : article
        )
      );
      setFilteredArticles((prev) =>
        prev.map((article) =>
          article.slug === slug ? { ...article, likes: result.likes } : article
        )
      );
    }
  };

  const isLiked = (slug: string): boolean => {
    return !!localStorage.getItem(`liked:${slug}`);
  };

  const handleTagFilter = (tag: string) => {
    if (tag === "All Posts") {
      setSelectedTag("All Posts");
      setFilteredArticles(articles);
    } else {
      setSelectedTag(tag);
      setFilteredArticles(
        articles.filter((article) => article.tags.includes(tag))
      );
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const getAuthorName = (authorId: string): string => {
    const author = authors.find((a) => a.author_id === authorId);
    return author ? author.author_name : "Unknown Author";
  };
  const getAuthorImage = (authorId: string): string => {
    const author = authors.find((a) => a.author_id === authorId);
    return author ? author.author_image : "No Image";
  };
  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Latest Articles</h2>
        <Search
          placeholder="Search articles..."
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
          style={{ width: 300 }}
          allowClear
        />
      </div>

      {/* Tags Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tags.slice(0, showAllTags ? tags.length : 5).map((tag) => (
          <Tag
            key={tag}
            color={selectedTag === tag ? "red" : "default"}
            className="cursor-pointer text-lg px-3 py-1 rounded-md"
            onClick={() => handleTagFilter(tag)}
            style={{
              fontSize: selectedTag === tag ? "1rem" : "0.95rem",
              fontWeight: selectedTag === tag ? "bold" : "normal",
            }}
          >
            {tag}
          </Tag>
        ))}
        {tags.length > 5 && (
          <Button type="link" onClick={() => setShowAllTags(!showAllTags)}>
            {showAllTags ? "Show Less" : "More"}
          </Button>
        )}
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div>
          <div className="text-center mt-20 text-gray-500 text-lg">
            Loading articles...
          </div>
        </div>
      ) : (
        <>
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.article_id}>
                  <div className="w-full shadow-md hover:shadow-lg transition p-4 flex flex-col relative md:flex-row">
                    {/* Article Image (Left Side) */}
                    <div className="w-full md:w-1/2">
                      <img
                        alt={article.title}
                        src={article.image_url}
                        className="h-68 w-full object-cover rounded-md"
                      />
                    </div>

                    <div className="w-full md:w-2/3 relative  md:pl-4 flex flex-col justify-between">
                      <div className="w-full">
                        <div className="flex  w-full flex-col items-start mb-3">
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                alt={getAuthorName(article.author_by)}
                                src={getAuthorImage(article.author_by)}
                                className="h-18 w-18 object-cover rounded-full"
                              />
                              <div className="flex flex-col">
                                <span className="ml-2 capitalize  text-xl font-medium">
                                  {getAuthorName(article.author_by)}
                                </span>
                                <span className="ml-2 text-gray-500 text-sm">
                                  {new Date(
                                    article.created_at
                                  ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}{" "}
                                  • {calculateReadTime(article.content)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => handleLike(article.slug)}
                              >
                                {isLiked(article.slug) ? (
                                  <BsHeartFill className="text-red-500 text-lg" />
                                ) : (
                                  <BsHeart className="text-red-500 text-lg" />
                                )}
                              </div>

                              <div className="relative">
                                <ShareAltOutlined
                                  className="cursor-pointer text-gray-500 text-lg"
                                  onClick={() =>
                                    setShowShare((prev) =>
                                      prev === article.slug
                                        ? null
                                        : article.slug
                                    )
                                  }
                                />
                                <ShareMenu
                                  show={showShare === article.slug}
                                  slug={article.slug}
                                  onClose={() => setShowShare(null)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold">
                          {article.title}
                        </h3>
                        <p
                          className="text-gray-600 mt-2"
                          dangerouslySetInnerHTML={{
                            __html: article.content.slice(0, 350) + "...",
                          }}
                        />
                        <div className="mt-3 font-bold">
                          <Link href={`/articles/${article.slug}`}>
                            <span className="text-red-500 ">Read More →</span>
                          </Link>
                        </div>

                        <div className="mt-10">
                          <span className="text-red-500">
                            {article.views}{" "}
                            {article.views === 1 ? "view" : "views"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-20">
              <Empty
                image={
                  <FileTextOutlined style={{ fontSize: 48, color: "#ccc" }} />
                }
                description={
                  <span className="text-lg text-gray-600">
                    No articles added yet
                  </span>
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticlesPage;
