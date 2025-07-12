'use client';

import { useAppContext } from '@/context/use-app-context';

export default function Home() {
  const { userProfile } = useAppContext();

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <span>模板项目</span>
      <span>{userProfile.username}</span>
    </div>
  );
}
