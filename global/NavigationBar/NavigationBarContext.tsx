"use client";

import { createContext, useContext, useState } from "react";

interface NavigationBarContextInterface {
    visible: boolean,
    setVisible: (value: boolean) => void
}

const NavigationBarContext = createContext<NavigationBarContextInterface | null>(null);

export function NavigationBarProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState<boolean>(true);

  return <NavigationBarContext.Provider value={{ visible, setVisible }}>{children}</NavigationBarContext.Provider>;
}

export function useNavigationBar() {
  return useContext(NavigationBarContext);
}