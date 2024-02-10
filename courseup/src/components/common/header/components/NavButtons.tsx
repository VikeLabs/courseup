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
        key={link.href}
        className={classNames(
          'btn text-xl font-semibold btn-ghost',
          'transition-all md:text-sm',
          'px-0 md:px-4 items-start md:items-center',
          {
            'outline outline-2': isActive,
          }
        )}
      >
        <Link className={classNames('flex w-full items-center gap-1 md:py-1', 'pl-2 md:px-0')} href={`/${link.href}`}>
          {link.icon}
          {link.label}
        </Link>
      </li>
    );
  });
  return <div className={classNames('flex flex-col md:flex-row', 'gap-3 md:gap-7')}>{links}</div>;
}
