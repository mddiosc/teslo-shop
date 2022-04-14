import { createContext } from "react";

export interface ContextProps {
  isMenuOpen: boolean;

  //Methods
  toogleSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
