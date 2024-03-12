'use client';

import { useState } from 'react';
import { Header } from 'components/common/header';
import classNames from 'classnames';
import BlurContext from 'components/common/BlurContext';

export default function Content({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  const [blurBackground, setBlurBackground] = useState<boolean>(false);

  return (
    <>
      <Header blurBackground={blurBackground} setBlurBackground={setBlurBackground} />
      <BlurContext.Provider value={{ blurBackground: blurBackground, setBlurBackground: setBlurBackground }}>
        {blurBackground ? (
          <div className={classNames('pointer-events-none transition-all', { 'blur-md': blurBackground })}>
            {children}
          </div>
        ) : (
          <div>{children}</div>
        )}
      </BlurContext.Provider>
    </>
  );
}
