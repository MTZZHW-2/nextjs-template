'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { register } from '@/services/auth';

export default function Register() {
  const { push } = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    const result = await register({ username, password });

    if (result.success) {
      toast.success(result.message);
      push('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-100 flex-col items-center space-y-4">
        <Input placeholder="用户名" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="密码" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full" onClick={handleRegister}>
          注册
        </Button>
        <Link href="/login" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon className="size-4" />
          登录
        </Link>
      </div>
    </div>
  );
}
