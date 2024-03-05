import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore • CourseUp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="p-3 md:p-5 lg:p-8">{children}</main>;
}
