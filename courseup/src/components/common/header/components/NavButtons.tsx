import Link from 'next/link';
import {
  MdOutlineCalendarViewMonth,
  MdOutlineConfirmationNumber,
  MdOutlineLibraryBooks,
  MdOutlineTravelExplore,
} from 'react-icons/md';

export function NavButtons(): JSX.Element {
  const links = [
    { href: '/explore', label: 'Explore Courses', icon: <MdOutlineTravelExplore /> },
    { href: '/scheduler', label: 'Timetables', icon: <MdOutlineCalendarViewMonth /> },
    { href: '/register', label: 'Register', icon: <MdOutlineConfirmationNumber /> },
    { href: '/booklist', label: 'Booklist', icon: <MdOutlineLibraryBooks /> },
  ].map((link) => (
    <li key={link.href} className="md:btn text-xl font-normal md:font-semibold md:btn-sm md:btn-ghost md:join-item">
      <Link className="flex items-center gap-2" href={link.href}>
        {link.icon}
        {link.label}
      </Link>
    </li>
  ));
  return <>{links}</>;
}
