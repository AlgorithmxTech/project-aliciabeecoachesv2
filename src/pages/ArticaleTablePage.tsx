'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
} from 'antd';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const { Search } = Input;
const { Option } = Select;

interface Article {
  article_id: string;
  title: string;
  slug?: string;
  tags: string[];
  author_by?: string;
  content: string;
}

interface Author {
  author_id: string;
  author_name: string;
  author_desciption: string;
  author_image?: string;
}

const ArticleTablePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredData, setFilteredData] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [form] = Form.useForm();
  const [quillContent, setQuillContent] = useState('');
  const router = useRouter();

  const [editAuthorVisible, setEditAuthorVisible] = useState(false);
  const [authorForm] = Form.useForm();
  const constantAuthorId = 'a8c743fb-60dc-4c2f-8ccf-264dbf4a6c00';
  const [authorLoading, setAuthorLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
    setFilteredData(data);
    setLoading(false);
  };

  const fetchAuthors = async () => {
    const res = await fetch('/api/authors');
    const data = await res.json();
    setAuthors(data);
  };

  const fetchAuthor = async () => {
    try {
      setAuthorLoading(true);
      const res = await fetch(`/api/authors/${constantAuthorId}`);
      const data = await res.json();
      if (res.ok) {
        authorForm.setFieldsValue(data);
        setEditAuthorVisible(true);
      } else {
        message.error(data.error || 'Failed to fetch author');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err:unknown) {
      message.error('Error fetching author');
    } finally {
      setAuthorLoading(false);
    }
  };

  const handleAuthorSubmit = async () => {
    try {
      const values = await authorForm.validateFields();
      const formData = new FormData();

      formData.append('author_name', values.author_name);
      formData.append('author_desciption', values.author_desciption);

      const file = authorForm.getFieldValue('author_image_file');
      if (file) {
        formData.append('author_image', file);
      }

      const res = await fetch(`/api/authors/${constantAuthorId}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        message.success('Author updated successfully');
        setEditAuthorVisible(false);
        fetchAuthors();
      } else {
        message.error(data.error || 'Failed to update author');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error('Update failed');
    }
  };


  useEffect(() => {
    fetchArticles();
    fetchAuthors();
  }, []);

  const handleSearch = (value: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        message.success('Article deleted');
        fetchArticles();
      } else {
        message.error('Failed to delete article');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error('Something went wrong');
    }
  };

  const openEditModal = (article: Article) => {
    setCurrentArticle(article);
    setQuillContent(article.content);
    form.setFieldsValue({
      title: article.title,
      slug: article.slug,
      tags: article.tags,
      author_by: article.author_by,
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    const values = await form.validateFields();
    const payload = { ...values, content: quillContent };
    try {
      const res = await fetch(`/api/articles/${currentArticle?.article_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        message.success('Article updated successfully');
        setEditModalVisible(false);
        fetchArticles();
      } else {
        const data = await res.json();
        message.error(data.error || 'Failed to update');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error('Update failed');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) =>
        tags?.length > 0
          ? tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)
          : '-',
    },
    {
      title: 'Author',
      dataIndex: 'author_by',
      key: 'author_by',
      render: (value: string) => {
        const author = authors.find((a) => a.author_id === value);
        return author ? author.author_name : '-';
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Article) => (
        <Space>
          <Button
            size="small"
            type="link"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this article?"
            onConfirm={() => handleDelete(record.slug!)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Articles</h2>
        <Space>
          <Button onClick={fetchAuthor}>Edit Author</Button>
          <Button
            type="primary"
            onClick={() => router.push('/admin/dashboard/create_article')}
          >
            Create Article
          </Button>
        </Space>
      </div>

      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by title"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="article_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Edit Article Modal */}
      <Modal
        title="Edit Article"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Update"
        width={800}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Slug is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="author_by"
            label="Author"
            rules={[{ required: true, message: 'Author is required' }]}
          >
            <Select placeholder="Select author">
              {authors.map((author) => (
                <Option key={author.author_id} value={author.author_id}>
                  {author.author_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Content">
            <ReactQuill
              theme="snow"
              value={quillContent}
              onChange={setQuillContent}
              style={{ height: '250px' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Author Modal */}
      <Modal
        title="Edit Author"
        open={editAuthorVisible}
        onCancel={() => setEditAuthorVisible(false)}
        onOk={handleAuthorSubmit}
        okText="Update"
        confirmLoading={authorLoading}
      >
        <Form layout="vertical" form={authorForm}>
          <Form.Item
            name="author_name"
            label="Author Name"
            rules={[{ required: true, message: 'Author name is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author_desciption"
            label="Description"
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Current Image">
            {authorForm.getFieldValue('author_image') ? (
              <img
                src={authorForm.getFieldValue('author_image')}
                alt="Author"
                className='w-18 h-18'
                style={{ maxWidth: '100%', borderRadius: '0.5rem', marginBottom: 8 }}
              />
            ) : (
              <span>No image available</span>
            )}
          </Form.Item>
          <Form.Item label="Upload New Image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  authorForm.setFieldValue('author_image_file', file);
                }
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default ArticleTablePage;