import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Content from './Content';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CourseUp',
  description: 'A simple way to browse and schedule UVic Courses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Content>{children}</Content>
      </body>
    </html>
  );
}
