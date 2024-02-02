import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

export function MiscHeaderButtons(): JSX.Element {
  return (
    <div className="flex">
      <button className="btn btn-circle btn-ghost">
        <AiFillGithub size="36" />
      </button>
      {/* <IconButton
        aria-label="toggle dark mode"
        isRound
        icon={mode(<MoonIcon fontSize="1.3em" />, <SunIcon fontSize="1.3em" />)}
        size="sm"
        onClick={toggleColorMode}
        colorScheme={mode('purple', 'orange')}
      /> */}
    </div>
  );
}
