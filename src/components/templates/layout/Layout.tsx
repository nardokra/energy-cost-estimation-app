import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps): JSX.Element => (
  <main className='flex justify-center max-w-5xl w-full mx-auto'>
    {children}
  </main>
);
