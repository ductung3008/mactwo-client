'use client';

import { PageLoading } from '@/components/ui';
import ProfileSidebar from '@/components/ui/profile-sidebar';
import { useAuth } from '@/hooks';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileWrapper({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && hasHydrated) {
      router.replace(`/login`);
    }
  }, [isAuthenticated, hasHydrated, router]);

  if (!isAuthenticated) {
    return <PageLoading />;
  }

  return (
    <>
      <ProfileSidebar locale={locale} />
      <div className='size-full rounded-xl bg-white p-4 shadow-xl'>
        {children}
      </div>
    </>
  );
}
