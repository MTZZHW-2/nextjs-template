'use client';

import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { login } from '@/services/auth';

export default function Login() {
  const { push } = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const result = await login({ username, password });

    if (result.success) {
      push('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-100 flex-col items-center space-y-4">
        <Input placeholder="用户名" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="密码" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full" onClick={handleLogin}>
          登录
        </Button>
        <Link href="/register" className="flex items-center space-x-2 text-sm">
          注册
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
