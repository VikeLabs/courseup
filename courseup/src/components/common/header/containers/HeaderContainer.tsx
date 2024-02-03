import { Term } from '../../../../../lib/term';
import { NavButtons } from '../components/NavButtons';
import { MiscHeaderButtons } from '../components/MiscHeaderButtons';

export function HeaderContainer() {
  return (
    // <div className="navbar px-3 md:px-5 lg:px-8 w-full flex justify-between shadow-md">
    //   <a href="/" className="text-xl font-bold">
    //     CourseUp
    //   </a>
    //   <NavButtons />
    // </div>
    <div className="navbar flex items-center bg-base-100 shadow-md px-3 md:px-5 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu dropdown-content rounded-md bg-base-100 mt-3 p-0 shadow w-72">
            <NavButtons />
          </ul>
        </div>
        <a href="/" className="text-xl font-bold">
          CourseUp
        </a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="join">
          <NavButtons />
        </ul>
      </div>
      <div className="navbar-end">
        <MiscHeaderButtons />
      </div>
    </div>
  );
}
