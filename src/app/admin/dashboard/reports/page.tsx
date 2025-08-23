<<<<<<< HEAD
const AdminReportsPage = () => {
  return <div>AdminReportsPage</div>;
=======
import { BarChart } from 'lucide-react';

const AdminReportsPage = () => {
  return (
    <div className='space-y-6'>
      {/* Modern Page Header */}
      <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='rounded-lg bg-gradient-to-r from-orange-500 to-red-600 p-3 text-white shadow-lg'>
              <BarChart className='h-6 w-6' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Báo cáo & Phân tích
              </h1>
              <p className='text-slate-600'>
                Xem thông tin chi tiết và số liệu hiệu suất
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className='rounded-xl border border-slate-200 bg-white p-12 text-center shadow-lg'>
        <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600'>
          <BarChart className='h-12 w-12 text-white' />
        </div>
        <h2 className='mb-4 text-3xl font-bold text-slate-900'>
          Báo cáo sắp có
        </h2>
        <p className='mx-auto mb-8 max-w-md text-lg text-slate-600'>
          Chúng tôi đang phát triển các tính năng phân tích và báo cáo toàn diện
          để giúp bạn đưa ra quyết định dựa trên dữ liệu.
        </p>
        <div className='mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 p-6'>
            <div className='mb-4 text-3xl text-blue-600'>📊</div>
            <h3 className='mb-2 font-semibold text-slate-900'>
              Phân tích doanh số
            </h3>
            <p className='text-sm text-slate-600'>
              Theo dõi doanh thu, đơn hàng và hành vi khách hàng
            </p>
          </div>
          <div className='rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 p-6'>
            <div className='mb-4 text-3xl text-green-600'>📈</div>
            <h3 className='mb-2 font-semibold text-slate-900'>
              Số liệu hiệu suất
            </h3>
            <p className='text-sm text-slate-600'>
              Giám sát hiệu suất sản phẩm và xu hướng
            </p>
          </div>
          <div className='rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-violet-100 p-6'>
            <div className='mb-4 text-3xl text-purple-600'>👥</div>
            <h3 className='mb-2 font-semibold text-slate-900'>
              Thông tin khách hàng
            </h3>
            <p className='text-sm text-slate-600'>
              Hiểu rõ khách hàng của bạn hơn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
};

export default AdminReportsPage;
