'use client';

import Link from 'next/link';
import {
  MdOutlineCalendarViewMonth,
  MdOutlineConfirmationNumber,
  MdOutlineLibraryBooks,
  MdOutlineTravelExplore,
} from 'react-icons/md';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

export function NavButtons(): JSX.Element {
  const pathname = usePathname();
  const links = [
    { href: 'explore', label: 'Explore Courses', icon: <MdOutlineTravelExplore /> },
    { href: 'scheduler', label: 'Timetables', icon: <MdOutlineCalendarViewMonth /> },
    { href: 'register', label: 'Register', icon: <MdOutlineConfirmationNumber /> },
    { href: 'booklist', label: 'Booklist', icon: <MdOutlineLibraryBooks /> },
  ].map((link) => {
    const isActive = pathname.split('/')[1] === link.href;
    return (
      <li
        className={classNames('text-xl font-semibold', 'md:hover:bg-gray-200 transition-all md:text-sm md:join-item', {
          'bg-gray-300': isActive,
        })}
      >
        <Link className="flex items-center gap-1 md:py-1 md:px-4" href={`/${link.href}`}>
          {link.icon}
          {link.label}
        </Link>
      </li>
    );
  });
  return <>{links}</>;
}
