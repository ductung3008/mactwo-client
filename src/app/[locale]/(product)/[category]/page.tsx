import { slugify } from '@/components/ui/slugify';
import { mainBanners } from '@/data/banners';
import { Link } from '@/i18n/navigation';
import { categoryApi } from '@/lib/api/categories.api';
import { productApi } from '@/lib/api/products.api';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import './style.css';

const BannerSlider = dynamic(() =>
  import('@/components/ui/banner-slider').then(mod => ({
    default: mod.BannerSlider,
  }))
);

const ProductItem = dynamic(() =>
  import('@/components/ui/product-item').then(mod => ({
    default: mod.ProductItem,
  }))
);

const mockDescription = `<div><section><div><div><div><div><div><div><div><h2 style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#1d1d1f">Lịch sử hình thành, phát triển của iPhone</span></h2></div></div><div><div><p style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;font-size:11pt;color:#515154">iPhone là dòng điện thoại thông minh được phát triển từ Apple Inc, được ra mắt lần đầu tiên bởi Steve Jobs và mở bán năm 2007. Bên cạnh tính năng của một máy điện thoại thông thường, iPhone còn được trang bị màn hình cảm ứng, camera, khả năng chơi nhạc và chiếu phim, trình duyệt web... Phiên bản thứ hai là iPhone 3G ra mắt tháng 7 năm 2008, được trang bị thêm hệ thống định vị toàn cầu, mạng 3G tốc độ cao. Trải qua 15 năm tính đến nay đã có đến 34 mẫu iPhone được sản xuất từ dòng 2G cho đến iPhone 13 Pro Max và Apple là một trong những thương hiệu điện thoại được yêu thích và sử dụng phổ biến nhất trên thế giới.</span></p><h2 style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#1d1d1f">iPhone có những mã máy nào?</span></h2><p style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">Những chiếc iPhone do Apple phân phối tại thị trường nước nào thì sẽ mang mã của nước đó. Ví dụ: LL: Mỹ, ZA: Singapore, TH: Thái Lan, JA: Nhật Bản, Những mã này xuất hiện tại Việt Nam đều là hàng xách tay, nhập khẩu. Còn tại Việt Nam, iPhone sẽ được mang mã VN/A. Tất cả các mã này đều là hàng chính hãng phân phối của Apple. Lợi thế khi bạn sử dụng iPhone mã VN/A đó là chế độ bảo hành tốt hơn với 12 tháng theo tiêu chuẩn của Apple. iPhone của bạn sẽ được bảo hành tại tất cả các trung tâm bảo hành Apple tại Việt Nam, một số mã quốc tế bị từ chối bảo hành và phải đem ra các trung tâm bảo hành Apple tại nước ngoài. Rất là phức tạp đúng không nào?</span></p><h2 style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#1d1d1f">Apple đã khai tử những dòng iPhone nào?</span></h2><p style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">Tính đến nay, Apple đã khai tử (ngừng sản xuất) các dòng iPhone đời cũ bao gồm: iPhone 2G, iPhone 3G, iPhone 4, iPhone 5 series, iPhone 6 series, iPhone 7 series, iPhone 8 series, iPhone X series, iPhone SE (thế hệ 1), iPhone SE (thế hệ 2), iPhone 11 Pro, iPhone 11 Pro Max, iPhone 12 Pro, iPhone 12 Pro Max.</span></p><h2 style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#1d1d1f">MacTwo cung cấp những dòng iPhone nào?</span></h2><p style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">MacTwo là một trong những thương hiệu bán lẻ được Apple uỷ quyền tại Việt Nam, đáp ứng được các yêu cầu khắt khe từ Apple như: dịch vụ kinh doanh, dịch vụ chăm sóc khách hàng, vị trí đặt cửa hàng...</span><br><br><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">Những chiếc iPhone do Apple Việt Nam phân phối tại nước ta đều mang mã VN/A và được bảo hành 12 tháng theo theo tiêu chuẩn tại các trung tâm bảo hành Apple. Các dòng iPhone được cung cấp tại MacTwo gồm:</span></p><ul><li style="text-align:justify"><span style="color:#3598db"><strong><a style="color:#3598db" href="https://shopdunk.com/iphone-15-series"><span style="font-family:arial,helvetica,sans-serif;font-size:11pt">iPhone 15 Series</span></a></strong></span></li><li style="text-align:justify"><span style="color:#3598db"><strong><a style="color:#3598db" href="https://shopdunk.com/iphone-14-series"><span style="font-family:arial,helvetica,sans-serif;font-size:11pt">iPhone 14 Series</span></a></strong></span></li><li style="text-align:justify"><span style="color:#3598db"><strong><a style="color:#3598db" href="https://shopdunk.com/iphone-13-series"><span style="font-family:arial,helvetica,sans-serif;font-size:11pt">iPhone 13 Series</span></a></strong></span></li><li style="text-align:justify"><span style="color:#3598db"><strong><a style="color:#3598db" href="https://shopdunk.com/iphone-12-series"><span style="font-family:arial,helvetica,sans-serif;font-size:11pt">iPhone 12 Series</span></a></strong></span></li><li style="text-align:justify"><span style="color:#3598db"><strong><a style="color:#3598db" href="https://shopdunk.com/iphone-11-series"><span style="font-family:arial,helvetica,sans-serif;font-size:11pt">iPhone 11 Series</span></a></strong></span></li><li style="text-align:justify"><span style="color:#3598db"><strong><a style="color:#3598db" href="https://shopdunk.com/iphone-se-series"><span style="font-family:arial,helvetica,sans-serif;font-size:11pt">iPhone SE 3</span></a></strong></span></li></ul><p style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">iPhone 11 được trang bị màn hình LCD và không hỗ trợ HDR, nâng cấp với chế độ chụp đêm Night Mode cùng Deep Fusion. Camera trước được nâng độ phân giải từ 7MP lên thành 12MP. Được trang bị chip A13 Bionic và hỗ trợ công nghệ WiFi 6. Với 6 màu sắc bắt mắt: Đen, Trắng, Xanh Mint, Đỏ, Vàng, Tím. </span><br><br><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">iPhone 12 mini, iPhone 12 là những chiếc iPhone đầu tiên của hãng hỗ trợ mạng di động 5G. Apple đã thay đổi thiết kế của iPhone từ khung viền bo tròn thành khung viền vuông vức như những dòng iPhone 5 và sử dụng mặt kính trước Ceramic Shield. Ngoài ra, hộp của thiết bị iPhone 12 và các dòng iPhone sau đều đã được loại bỏ củ sạc.</span><br><br><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">Tháng 9 năm 2021, Apple đã chính thức ra mắt 4 chiếc iPhone mới của hãng bao gồm iPhone 13 mini, iPhone 13, iPhone 13 Pro, iPhone 13 Pro Max. Các cụm Camera trên bộ 4 iPhone mới của Apple đều to hơn một chút so với thế hệ tiền nhiệm và phần tai thỏ ở mặt trước cũng được làm nhỏ hơn. Đối với iPhone 13 Pro và iPhone 13 Pro Max, Apple đã nâng cấp bộ nhớ tối đa của máy lên đến 1TB. Đi cùng với đó là tần số quét của dòng iPhone 13 cũng đã được nâng cấp lên 120Hz.</span><br><br><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">iPhone SE thế hệ 3 (còn gọi là iPhone SE 3 hay iPhone SE 2022) được Apple công bố vào tháng 3 năm 2022, kế nhiệm iPhone SE 2. Đây là một phần của iPhone thế hệ thứ 15, cùng với iPhone 13 và iPhone 13 Pro. Thế hệ thứ 3 có kích thước và yếu tố hình thức của thế hệ trước, trong khi các thành phần phần cứng bên trong được lựa chọn từ dòng iPhone 13, bao gồm cả hệ thống trên chip A15 Bionic.</span></p><p style="text-align:justify"><em>&gt;&gt;&gt; Tham khảo thêm: <strong><span style="color:#06c"><a style="color:#06c" href="https://shopdunk.com/iPhone-15-pro" target="_blank" rel="noopener">iPhone 15 Pro</a></span></strong>&nbsp;</em></p><h2 style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#1d1d1f">Mua iPhone giá tốt nhất tại MacTwo</span></h2><p style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">MacTwo là đại lý uỷ quyền Apple tại Việt Nam với hệ thống 40 cửa hàng trên toàn quốc, trong đó có 11 Mono Store. Đến nay, MacTwo đã trở thành điểm dừng chân lý tưởng cho iFans nói chung và thế hệ GenZ nói riêng bởi độ chuẩn và chất. Không gian thiết kế và bài trí sản phẩm theo tiêu chuẩn của Apple, chia theo từng khu vực rõ ràng, bàn trải nghiệm rộng rãi và đầy đủ sản phẩm.</span></p><p style="text-align:justify"><span style="font-family:arial,helvetica,sans-serif;color:#515154;font-size:11pt">Tại <a href="/"><strong>MacTwo</strong></a> luôn có mức giá tốt nhất cho người dùng cùng với nhiều chương trình hấp dẫn diễn ra liên tục trong tháng. Hãy đến với chúng tôi và trải nghiệm ngay những mẫu iPhone mới nhất với đội ngũ chuyên viên tư vấn được đào tạo bài bản từ Apple, sẵn sàng hỗ trợ bạn về sản phẩm, kỹ thuật hay các công nghệ mới nhất từ Apple.</span></p></div></div></div></div></div></div></div></section></div>`;

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  if (!id) return notFound();

  try {
    const [categoriesResponse, productsResponse] = await Promise.all([
      categoryApi.getCategoryById(id),
      productApi.getProductByCategoryId(id),
    ]);

    const categories = categoriesResponse.data;
    const products = productsResponse.data;

    if (!categories || !products) return notFound();

    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <BannerSlider
          banners={mainBanners}
          aspectRatio='16 / 9'
          autoPlay={true}
          height={400}
          className='mb-6 mt-5 w-full'
        />

        <div className='flex flex-row flex-wrap gap-4'>
          {categories?.children?.map(category => (
            <Link
              key={category.id}
              className='rounded-xl bg-white px-4 py-2 shadow-md hover:bg-gray-100'
              href={{
                pathname: slugify(category.categoryName),
                query: { id: category.id },
              }}
            >
              <span className='text-sm text-black'>
                {category.categoryName}
              </span>
            </Link>
          ))}
        </div>

        <div className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
          {products?.map(product => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>

        <div
          className='prose prose-lg description my-10 max-w-none rounded-xl bg-white p-6 shadow-md'
          dangerouslySetInnerHTML={{
            __html:
              typeof window !== 'undefined'
                ? DOMPurify.sanitize(mockDescription)
                : mockDescription,
          }}
        />
      </div>
    );
  } catch (err) {
    console.error(err);
    return notFound();
  }
}
