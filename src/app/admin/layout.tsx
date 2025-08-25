'use client';

import { Loading, ToastProvider } from '@/components/ui';
import { useAdminAuth } from '@/hooks';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Messages = Record<string, unknown> | null;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<Messages>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        const msgs = await import('@/../messages/vi.json');
        setMessages(msgs.default);
      } catch (error) {
        console.error('Failed to load messages:', error);
        setMessages({});
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NextIntlClientProvider messages={messages} locale='vi'>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </NextIntlClientProvider>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { canAccessAdmin, loading, logout } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !canAccessAdmin) {
      logout();
      router.push('/admin/login');
    }
  }, [loading, canAccessAdmin, router, logout]);

  if (loading) {
    return <Loading />;
  }

  return <ToastProvider>{children}</ToastProvider>;
}
