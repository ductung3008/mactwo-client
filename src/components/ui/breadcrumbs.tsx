import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav className='mb-4 text-sm' aria-label='Breadcrumb'>
      <ol className='list-reset flex text-gray-600'>
        {items.map((item, idx) => (
          <li
            key={item.name + idx}
            className={
              idx === items.length - 1 ? 'font-semibold text-black' : ''
            }
          >
            {item.href && idx !== items.length - 1 ? (
              <Link href={item.href} className='hover:underline'>
                {item.name}
              </Link>
            ) : (
              item.name
            )}
            {idx < items.length - 1 && <span className='mx-2'>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Tự động tạo breadcrumbs từ route
export function AutoBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const localeList = ['vi', 'en'];

  // 👉 Nếu là trang chủ hoặc chỉ có locale thì không render breadcrumbs
  if (
    segments.length === 0 || // '/'
    (segments.length === 1 && localeList.includes(segments[0])) // '/vi' hoặc '/en'
  ) {
    return null;
  }

  const parts = localeList.includes(segments[0]) ? segments.slice(1) : segments;

  const items = [
    { name: 'Trang chủ', href: '/' },
    ...parts.map((part, idx) => {
      const nameMap: Record<string, string> = {
        iphone: 'iPhone',
        ipad: 'iPad',
        mac: 'Mac',
        watch: 'Watch',
        accessories: 'Phụ kiện',
        sound: 'Âm thanh',
        camera: 'Camera',
        'home-appliances': 'Gia dụng',
        refurbished: 'Máy lướt',
        news: 'Tin tức',
        contact: 'Liên hệ',
      };
      const name = nameMap[part] || part;
      const href =
        '/' +
        segments
          .slice(0, (localeList.includes(segments[0]) ? 1 : 0) + idx + 1)
          .join('/');
      return { name, href };
    }),
  ];

  return <Breadcrumbs items={items} />;
}
