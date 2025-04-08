"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Form, Input, Button, Alert, Typography } from "antd"
import { LockOutlined } from "@ant-design/icons"

const { Title } = Typography

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams!.get("token")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    setLoading(true)
    setMessage("")
    setError("")

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, token }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage(data.message)
      setTimeout(() => router.push("/admin/login"), 1500)
    } else {
      setError(data.message || "Reset failed.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-white shadow-xl p-6 max-w-md w-full rounded-lg">
        <Title level={3} className="text-center text-black">Reset Password</Title>
        <p className="text-center mb-4">Enter your new password below.</p>

        {message && <Alert message={message} type="success" className="mb-4" showIcon />}
        {error && <Alert message={error} type="error" className="mb-4" showIcon />}

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="New Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}