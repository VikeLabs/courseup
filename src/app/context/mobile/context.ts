import { createContext, Dispatch, SetStateAction } from 'react';

export type Mobile = {
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
};

export const MobileContext = createContext<Mobile | undefined>(undefined);
