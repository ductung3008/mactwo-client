import { Link } from '@/i18n/navigation';
import { categoryApi } from '@/lib/api/categories.api';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { slugify } from './slugify';
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
// export function AutoBreadcrumbs() {
//   const pathname = usePathname();
//   const segments = pathname.split('/').filter(Boolean);
//   const localeList = ['vi', 'en'];

//   // 👉 Nếu là trang chủ hoặc chỉ có locale thì không render breadcrumbs
//   if (
//     segments.length === 0 || // '/'
//     (segments.length === 1 && localeList.includes(segments[0])) // '/vi' hoặc '/en'
//   ) {
//     return null;
//   }

//   const parts = localeList.includes(segments[0]) ? segments.slice(1) : segments;

//   const items = [
//     { name: 'Trang chủ', href: '/' },
//     ...parts.map((part, idx) => {
//       const nameMap: Record<string, string> = {
//         iphone: 'iPhone',
//         ipad: 'iPad',
//         mac: 'Mac',
//         watch: 'Watch',
//         accessories: 'Phụ kiện',
//         sound: 'Âm thanh',
//         camera: 'Camera',
//         'home-appliances': 'Gia dụng',
//         refurbished: 'Máy lướt',
//         news: 'Tin tức',
//         contact: 'Liên hệ',
//       };
//       const name = nameMap[part] || part;
//       const href =
//         '/' +
//         segments
//           .slice(0, (localeList.includes(segments[0]) ? 1 : 0) + idx + 1)
//           .join('/');
//       return { name, href };
//     }),
//   ];

//   return <Breadcrumbs items={items} />;
// }
// export function AutoBreadcrumbs() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id');

//   const [items, setItems] = useState<BreadcrumbItem[]>([]);
//   const [categories, setCategories] = useState<Category | null>(null);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       if (id) {
//         try {
//           const res = await categoryApi.getCategoryById(id);
//           const cat = res.data;

//           const crumbs: BreadcrumbItem[] = [{ name: 'Trang chủ', href: '/' }];

//           if (cat.children && cat.children.length === 0) {
//             // có cha => add cha trước
//             crumbs.push({
//               name: cat.slug!,
//               href: slugify(cat.slug!),
//             });
//           }

//           // cuối cùng là chính category hiện tại
//           crumbs.push({ name: cat.categoryName });

//           setItems(crumbs);
//           setCategories(res.data);
//         } catch (e) {
//           console.error(e);
//         }
//       } else {
//         // fallback nếu không có id
//         const segments = pathname.split('/').filter(Boolean);
//         if (segments.length > 0) {
//           setItems([{ name: 'Trang chủ', href: '/' }, { name: segments[0] }]);
//         }
//       }
//     };

//     fetchCategory();
//   }, [id, pathname]);

//   console.log('q', categories);

//   if (items.length === 0) return null;
//   return <Breadcrumbs items={items} />;
// }
export function AutoBreadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const localeList = ['vi', 'en'];
    const segments = pathname.split('/').filter(Boolean);

    // 👉 Nếu là trang chủ hoặc chỉ có locale thì không render breadcrumbs
    if (
      segments.length === 0 ||
      (segments.length === 1 && localeList.includes(segments[0]))
    ) {
      setItems([]);
      return;
    }

    const fetchBreadcrumbs = async () => {
      if (id) {
        try {
          const res = await categoryApi.getCategoryById(id);
          const cat = res.data;

          const crumbs: BreadcrumbItem[] = [{ name: 'Trang chủ', href: '/' }];

          if (cat.children && cat.children.length === 0) {
            // có cha => add cha trước
            crumbs.push({
              name: cat.slug!,
              href: slugify(cat.slug!),
            });
          }

          // Cuối cùng là category hiện tại
          crumbs.push({
            name: cat.categoryName,
            href: `/${slugify(cat.categoryName)}?id=${cat.id}`,
          });

          setItems(crumbs);
        } catch (e) {
          console.error(e);
        }
      } else {
        // fallback nếu không có id
        const parts = localeList.includes(segments[0])
          ? segments.slice(1)
          : segments;

        const crumbs: BreadcrumbItem[] = [{ name: 'Trang chủ', href: '/' }];

        parts.forEach((part, idx) => {
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
          const href = '/' + parts.slice(0, idx + 1).join('/');
          crumbs.push({ name, href });
        });

        setItems(crumbs);
      }
    };

    fetchBreadcrumbs();
  }, [id, pathname]);

  if (items.length === 0) return null;
  return <Breadcrumbs items={items} />;
}
