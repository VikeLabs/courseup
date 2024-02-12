'use client';

import { useState } from 'react';
import { Header } from 'components/common/header';
import classNames from 'classnames';

export default function Content({ children }: any): React.ReactNode {
  const [blurBackground, setBlurBackground] = useState(false);

  return (
    <>
      <Header blurBackground={blurBackground} setBlurBackground={setBlurBackground} />
      <div className={classNames('pointer-events-none transition-all', { 'blur-md': blurBackground })}>{children}</div>
    </>
  );
}
