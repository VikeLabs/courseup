'use client';

import classNames from 'classnames';
import { useState, useEffect } from 'react';

import { formatRgb, type Oklch } from 'culori';

/**
 * A combination of the DaisyUI Select and Dropdown elements
 *
 * The Select looks nice but the menu is super plain so the plan is
 * to replace the menu with the menu that comes out of the Dropdown
 * element
 */
export function SelectDropdown({ label }: SelectDropdownProps): React.ReactNode {
  const [open, setOpen] = useState<boolean>(false);
  const [chevronColor, setChevronColor] = useState<string>('rgb(255, 255, 255)');
  const [displayTempSelect, setDisplayTempSelect] = useState<boolean>(true);

  // couldn't find a good way to sync up the useEffect to run after the a ref is set so we'll use good-old document.getElementById
  const id = `SelectDropdown-${crypto.randomUUID()}`;

  // TODO: the backgroundRepeat is still buggy
  const chevronBackgroundCss = {
    background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><polygon fill="${chevronColor}" points="0,0 0.5,0.4 1,0" /></svg>')`,
    backgroundSize: '1em',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'calc(100% - 20px) calc(1px + 50%), calc(100% - 16.1px) calc(1px + 50%)',
  };

  // TODO: need to find a way to force a rerender after theme toggle is changed (chevron doesn't update)

  useEffect(() => {
    const el = document.getElementById(id);
    const rawBackgroundColor = window.getComputedStyle(el as Element).getPropertyValue('color');

    const separationRegex = /(?<=oklch\()(\d+\.\d*)(\s)(\d+\.\d*)(\s)(\d+\.\d*)/;
    const regexOutput = separationRegex.exec(rawBackgroundColor);
    const oklch: Oklch = {
      mode: 'oklch',
      l: parseFloat(regexOutput?.[1] ?? '0'),
      c: parseFloat(regexOutput?.[3] ?? '0'),
      h: parseFloat(regexOutput?.[5] ?? '0'),
    };

    setChevronColor(formatRgb(oklch));
    setDisplayTempSelect(() => false);
  }, []);

  return (
    <div className={classNames({ dropdown: !open })}>
      {displayTempSelect && <div className="select" id={id} />}
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
