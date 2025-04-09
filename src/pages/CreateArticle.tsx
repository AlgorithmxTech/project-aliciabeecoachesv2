'use client';

import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Space,
} from 'antd';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const CreateArticleForm: React.FC = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [editorModules, setEditorModules] = useState({});
  const [editorFormats, setEditorFormats] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Quill = require('react-quill-new').Quill;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const ImageResize = require('quill-image-resize-module-react').default;
  
      Quill.register('modules/imageResize', ImageResize);
  
      setEditorModules({
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        clipboard: {
          matchVisual: false,
        },
        imageResize: {
           parchment: Quill.import('parchment')
        }, // Simpler setup
      });
  
      setEditorFormats([
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
      ]);
    }
  }, []);
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    if (!file) {
      return message.warning('Please upload an image');
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('tags', JSON.stringify(values.tags));
    formData.append('content', content);
    formData.append('image', file);

    try {
      setLoading(true);
      const res = await fetch('/api/articles', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        message.success('Article created successfully');
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        message.error(data.error || 'Error creating article');
      }
    } catch (err) {
      console.error(err);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Article</h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="Enter article title" />
        </Form.Item>

        <Form.Item label="Tags" name="tags" rules={[{ required: true }]}>
          <Select mode="tags" style={{ width: '100%' }} placeholder="Add tags" />
        </Form.Item>

        <Form.Item label="Cover Image" required>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) setFile(selected);
            }}
          />
        </Form.Item>

        <Form.Item label="Content" required>
          <div className="border rounded">
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={editorModules}
              formats={editorFormats}
              theme="snow"
              placeholder="Write your article content here..."
            />
          </div>
        </Form.Item>

        <Form.Item className="mt-5">
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button onClick={() => router.back()}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateArticleForm;
