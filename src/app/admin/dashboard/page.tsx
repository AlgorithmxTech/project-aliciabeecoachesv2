import AdminNav from '@/components/common/AdminNav'
import ArticleTablePage from '@/pages/ArticleTablePage'
import React from 'react'

const page = () => {
  return (
    <>
    <AdminNav/>
    <div className='max-w-[1280px] mx-auto'>
    <ArticleTablePage/>
    </div>

    </>
  
  )
}

export default page
