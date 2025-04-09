'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,

  message,
  Space,
  Popconfirm,
  Avatar,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Author {
  author_id: string;
  author_name: string;
  author_desciption: string;
  author_image?: string;
}

const AuthorPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const fetchAuthors = async () => {
    setLoading(true);
    const res = await fetch('/api/authors');
    const data = await res.json();
    setAuthors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const openModal = (author?: Author) => {
    if (author) {
      form.setFieldsValue(author);
      setEditingAuthor(author);
    } else {
      form.resetFields();
      setEditingAuthor(null);
      setFile(null);
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    const values = await form.validateFields();
    const formData = new FormData();
    formData.append('author_name', values.author_name);
    formData.append('author_desciption', values.author_desciption);
    if (file) {
      formData.append('image', file);
    }

    try {
      const res = await fetch(
        editingAuthor ? `/api/authors/${editingAuthor.author_id}` : '/api/authors',
        {
          method: editingAuthor ? 'PUT' : 'POST',
          body: formData,
        }
      );

      if (res.ok) {
        message.success(`Author ${editingAuthor ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
        setFile(null);
        fetchAuthors();
      } else {
        const data = await res.json();
        message.error(data.error || 'Something went wrong');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error('Request failed');
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/authors/${id}`, { method: 'DELETE' });
    if (res.ok) {
      message.success('Author deleted');
      fetchAuthors();
    } else {
      message.error('Failed to delete');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'author_image',
      key: 'image',
      render: (url: string) =>
        url ? <Avatar size="large" src={url} /> : <Avatar size="large">A</Avatar>,
    },
    {
      title: 'Name',
      dataIndex: 'author_name',
      key: 'author_name',
    },
    {
      title: 'Description',
      dataIndex: 'author_desciption',
      key: 'author_desciption',
    },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Author) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this author?"
            onConfirm={() => handleDelete(record.author_id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Authors</h2>
        <Button type="primary" onClick={() => openModal()}>
          Add Author
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={authors}
        rowKey="author_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingAuthor ? 'Edit Author' : 'Add Author'}
        open={isModalOpen}
        onOk={handleModalSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={editingAuthor ? 'Update' : 'Create'}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="author_name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Author name" />
          </Form.Item>
          <Form.Item
            name="author_desciption"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Short bio or description" />
          </Form.Item>
          <Form.Item label="Profile Image">
            <Input
              type="file"
              onChange={(e)=>setFile(e.target.files?.[0] || null) }
              />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuthorPage;
