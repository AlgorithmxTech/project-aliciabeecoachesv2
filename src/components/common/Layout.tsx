import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='bg-[#fff0f5] '>
    <div className="max-w-[960px]  mx-auto min-h-screen ">
      <main>{children}</main>
    </div>
    </div>

  );
};

export default Layout;