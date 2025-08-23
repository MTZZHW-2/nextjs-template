'use client';

import type React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { logout } from '@/services/auth';

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: Readonly<LayoutProps>) {
  const { push } = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      push('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex h-10 items-center justify-center border-b">
        <span>Frontend</span>
        <span onClick={handleLogout} className="absolute right-8">
          登出
        </span>
      </div>
      {children}
    </div>
  );
}
