'use client';

import { Loading, ToastProvider } from '@/components/ui';
import { useAuth } from '@/hooks';
import { NextIntlClientProvider } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
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
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // if (!isAuthenticated || user?.role !== Role.Admin) {
      if (!isAuthenticated) {
        router.push('/admin/login');
      }
    }

    // if (!loading && isAuthenticated && user?.role === Role.Admin) {
    if (!loading && isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [loading, isAuthenticated, user, pathname, router]);

  return <ToastProvider>{children}</ToastProvider>;
}
