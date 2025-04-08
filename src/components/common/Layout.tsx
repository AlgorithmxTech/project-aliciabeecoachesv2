import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-[1280px] mx-auto min-h-screen ">
      <main>{children}</main>
    </div>
  );
};

export default Layout;