import { createContext, useState } from 'react';

export const SidebarContext = createContext<{ isOpen: boolean; setIsOpen?: any }>({ isOpen: false });

export const SidebarProvider = ({ children }: { children: JSX.Element[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>;
};
