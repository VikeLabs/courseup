import { Term } from '../../../../../lib/term';
import { NavButtons } from '../components/NavButtons';
import { MiscHeaderButtons } from '../components/MiscHeaderButtons';
import MobileNavbar from '../components/MobileNavbar';

export function HeaderContainer({ blurBackground, setBlurBackground }: any) {
  return (
    <div className="navbar flex items-center bg-base-300 shadow-md px-2 md:px-4 lg:px-5">
      <div className="navbar-start">
        <MobileNavbar blurBackground={blurBackground} setBlurBackground={setBlurBackground} />
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
