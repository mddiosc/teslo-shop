import { useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
};

export const UIProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toogleSideMenu = () => {
    dispatch({ type: "UI - ToogleMenu" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Metodos
        toogleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
