"use client"

import { useState } from "react"
import { Form, Input, Button, Alert, Typography } from "antd"
import { MailOutlined } from "@ant-design/icons"

const { Title } = Typography

export default function RequestPasswordResetPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
      } else {
        setError(data.message || "Something went wrong.")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Something went wrong.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300 px-4">
      <div className="bg-white shadow-xl p-6 max-w-md w-full rounded-lg">
        <Title level={3} className="text-center text-black">Forgot Password</Title>
        <p className="text-center mb-4">Enter your email to receive a reset link.</p>

        {message && <Alert message={message} type="success" className="mb-4" showIcon />}
        {error && <Alert message={error} type="error" className="mb-4" showIcon />}

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}