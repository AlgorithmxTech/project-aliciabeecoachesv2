"use client"
import React from 'react'
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Layout from "@/components/common/Layout";
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
const page = () => {
  return (
  <>
  <Navbar/>
  <Layout>
<PrivacyPolicyPage/>
  </Layout>
  <Footer/>
  </>
  )
}

export default page