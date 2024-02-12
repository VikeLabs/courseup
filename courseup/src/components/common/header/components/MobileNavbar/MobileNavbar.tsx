'use client';

import { useRef } from 'react';

import { ThreeLines, Close } from './svg/svg';

import { NavButtons } from '../NavButtons';
import classNames from 'classnames';

export function MobileNavbar({ blurBackground, setBlurBackground }: any): React.ReactNode {
  const unblurOverride = useRef(false);
  const unblurListenerAdded = useRef(false);

  const onClick = (): void => {
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
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden" onClick={onClick}>
        <DropdownButon active={blurBackground} />
      </div>
      <ul
        tabIndex={0}
        className={classNames('menu dropdown-content rounded-md bg-base-100 p-0 shadow w-72', 'px-4 py-4 mt-4', 'z-10')}
        onClick={() => (unblurOverride.current = true)}
      >
        <NavButtons />
      </ul>
    </div>
  );
}

function DropdownButon({ active }: any) {
  // TODO: it might be cool to have some sort of a transition effect between the two icons here
  return active ? <Close /> : <ThreeLines />;
}
