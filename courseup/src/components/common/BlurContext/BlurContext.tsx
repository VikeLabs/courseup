import { Context, createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

export const BlurContext: Context<Blur> = createContext<Blur>({ blurBackground: false, setBlurBackground: () => {} });

interface Blur {
  blurBackground: Readonly<boolean>;
  setBlurBackground: Dispatch<SetStateAction<boolean>>;
}
