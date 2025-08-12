'use client';

import { useAuth } from '@/hooks';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (!loading) {
  //     if (!isAuthenticated || user?.role !== Role.Admin) {
  //       router.push('/admin/dashboard');
  //     }
  //   }

  //   if (!loading && isAuthenticated && user?.role === Role.Admin) {
  //     router.push('/admin/dashboard');
  //   }
  // }, [loading, isAuthenticated, user, pathname, router]);

  return <>{children}</>;
}
