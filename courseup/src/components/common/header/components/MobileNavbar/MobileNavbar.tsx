'use client';

import { useRef } from 'react';

import { ThreeLines, Close } from './svg/svg';

import { NavButtons } from '../NavButtons';
import classNames from 'classnames';

export function MobileNavbar({ blurBackground, setBlurBackground }: any): React.ReactNode {
  const menuOverrride = useRef(false);
  const unblurListenerAdded = useRef(false);

  const onClick = (): void => {
    // TODO: also, the outline of the menu still isn't really that visible (that was the point of adding blur)
    // TODO: need to find some way to make it look a little bit better and add some contrast
    const unBlurBackground = () => {
      if (!blurBackground) {
        if (!menuOverrride.current) {
          document.removeEventListener('click', unBlurBackground);
          setBlurBackground(false);
        } else {
          menuOverrride.current = false;
        }
      }
    };
    if (!unblurListenerAdded.current) {
      document.addEventListener('click', unBlurBackground);
      setBlurBackground(true);
    }
  };

  return (
    <div className={classNames('dropdown', { 'dropdown-open': blurBackground })}>
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden" onClick={onClick}>
        <DropdownButon active={blurBackground} />
      </div>
      <ul
        tabIndex={0}
        className={classNames(
          'menu dropdown-content rounded-md bg-base-100 p-0 shadow w-72',
          'px-4 py-4 mt-4',
          'z-10',
          { hidden: !blurBackground }
        )}
        onClick={() => (menuOverrride.current = true)}
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
