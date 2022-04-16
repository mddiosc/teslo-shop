import { createContext } from "react";
import { IUser } from "../../interfaces";

export interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  //Methods
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (name: string, email: string, password: string) => Promise<{
    hasError: boolean;
    message?: string;
}>
}

export const AuthContext = createContext({} as ContextProps);
