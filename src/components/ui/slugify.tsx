export const slugify = (text: string): string => {
  return text
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // khoảng trắng => gạch ngang
    .replace(/[^a-z0-9\-]/g, ''); // xóa ký tự đặc biệt
};
