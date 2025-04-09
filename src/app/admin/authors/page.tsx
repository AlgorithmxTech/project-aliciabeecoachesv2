import AdminNav from '@/components/common/AdminNav'
import AuthorPage from '@/pages/AuthorPage'
const page = () => {
  return (
    <>
      <AdminNav/>
      <div className='max-w-[1280px] mx-auto'>
      <AuthorPage/>
      </div>
 
    </>
  )
}

export default page
