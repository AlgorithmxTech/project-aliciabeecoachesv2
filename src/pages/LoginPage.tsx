"use client"

import { useState } from "react"
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Spin,
  Alert
} from "antd"
import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { LoadingOutlined } from "@ant-design/icons"


interface LoginFormValues {
  email: string
  password: string
}

const { Link, Title } = Typography

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const router = useRouter()

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true)
    setServerError("")
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        console.log(data)
        setServerError(data.error || "Something went wrong.")
      } else {
        router.push("/admin/dashboard")
        message.success("Logged in successfully!")
        setAuthLoading(true)
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000) // Short delay for loading spinner
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setServerError("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 to-black text-white">
        <div className="text-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
          <p className="mt-4 text-lg">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-300 to-white">
      <div className="flex-grow flex items-center justify-center px-4">
        <Card
          title={<Title level={3} className="!mb-0 !text-center"> Alicia Bee Coaches Login</Title>}
          className="w-full max-w-md shadow-2xl rounded-lg"
          style={{ borderRadius: 12 }}
        >
          <Form<LoginFormValues> onFinish={handleLogin} layout="vertical">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Enter your email" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Enter your password" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            {serverError && (
              <div className="mb-4">
                   <Alert message={serverError} type="error" showIcon className="mb-4" />
              </div>
         
          )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
              >
                Login
              </Button>
            </Form.Item>

            <div className="text-center">
              <Link href="/admin/request-password-reset">Forgot Password?</Link>
            </div>
          </Form>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center text-black text-sm py-4">
        &copy; {new Date().getFullYear()} ABC Admin Panel. All rights reserved.
      </footer>
    </div>
  )
}

export default LoginPage