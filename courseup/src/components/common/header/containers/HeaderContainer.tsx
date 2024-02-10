'use client';

import { useRef } from 'react';

import { Term } from '../../../../../lib/term';
import { NavButtons } from '../components/NavButtons';
import { MiscHeaderButtons } from '../components/MiscHeaderButtons';
import classNames from 'classnames';

export function HeaderContainer({ setBlurBackground }: any) {
  const unblurOverride = useRef(false);
  const unblurListenerAdded = useRef(false);

  return (
    <div className="navbar flex items-center bg-base-100 shadow-md px-2 md:px-4 lg:px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost md:hidden"
            onClick={() => {
              // TODO: make it so that somehow clicking on the menu button once its open closes the dropdown content
              // TODO: also, the outline of the menu still isn't really that visible (that was the point of adding blur)
              // TODO: need to find some way to make it look a little bit better and add some contrast
              setBlurBackground((prev: Boolean) => !prev);
              const unBlurBackground = () => {
                if (!unblurOverride.current) {
                  setBlurBackground((prev: Boolean) => !prev);
                  document.removeEventListener('click', unBlurBackground);
                  unblurListenerAdded.current = false;
                } else {
                  unblurOverride.current = false;
                }
              };
              if (!unblurListenerAdded.current) {
                document.addEventListener('click', unBlurBackground);
                unblurListenerAdded.current = true;
              }
            }}
          >
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
          {/* Mobile Navbar Menu */}
          <ul
            tabIndex={0}
            className={classNames(
              'menu dropdown-content rounded-md bg-base-100 p-0 shadow w-72',
              'px-4 py-4 mt-4',
              'z-10'
            )}
            onClick={() => (unblurOverride.current = true)}
          >
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
