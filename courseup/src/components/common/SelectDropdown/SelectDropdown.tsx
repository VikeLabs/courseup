'use client';

import classNames from 'classnames';
import { useState, useEffect } from 'react';

/**
 * A combination of the DaisyUI Select and Dropdown elements
 *
 * The Select looks nice but the menu is super plain so the plan is
 * to replace the menu with the menu that comes out of the Dropdown
 * element
 */
export function SelectDropdown({ label }: SelectDropdownProps): React.ReactNode {
  const [open, setOpen] = useState<boolean>(false);
  const [chevronColor, setChevronColor] = useState<string>('rgb(255,255,255)');

  const chevronBackgroundCss = {
    background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><polygon fill="${chevronColor}" points="0,0 0.5,0.4 1,0" /></svg>')`,
    backgroundSize: '1em',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'calc(100% - 20px) calc(1px + 50%), calc(100% - 16.1px) calc(1px + 50%)',
  };

  useEffect(() => {
    const el = document.getElementById('tempForColorCalc');
    const rawBackgroundColor = window.getComputedStyle(el as Element).getPropertyValue('background-color');
    console.log(rawBackgroundColor);

    //TODO: we need to figure out some way to convert the oklch raw background color into rgb or hsl so we can use it in svg fill

    const separationRegex = /(?<=oklch\()(\d+\.\d*)(\s)(\d+\.\d*)(\s)(\d+\.\d*)/;
    const oklch = separationRegex.exec(rawBackgroundColor);

    //TODO: this isn't working yet, best idea atm is to override
    // background-color and use some rgb value so we don't have to do any conversion or weird hacks
    // el?.remove();
  }, []);

  return (
    <div className={classNames({ dropdown: !open })}>
      <div className="select" id="tempForColorCalc"></div>
      <summary
        style={chevronBackgroundCss}
        className="m-1 btn select select-bordered w-full max-w-xs"
        onClick={() => setOpen(!open)}
      >
        {label}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {/* TODO: list items are not being displayed */}
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}

export interface SelectDropdownProps {
  label?: string;
}
