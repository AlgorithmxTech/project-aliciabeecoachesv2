"use client";

import dynamic from 'next/dynamic';

import React, { Suspense } from 'react';

import AdminNavbar from '@/components/common/AdminNav'
const CreateArticleForm = dynamic(() => import('@/pages/CreateArticle'), { ssr: false });
function AddPostPage() {
  return   <>
  <AdminNavbar/>
  <CreateArticleForm/>
  </>;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AddPostPage />
    </Suspense>
  );
}