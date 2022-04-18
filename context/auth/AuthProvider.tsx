import { useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import Cookies from "js-cookie";
import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
  const { reload } = useRouter();

  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("AuthProvider: useEffect: data?.user", { user: data?.user });
      dispatch({ type: "Auth - Login", payload: data?.user as IUser });
    }
  }, [data, status]);



  // const checkToken = async () => {
  //   if (!Cookies.get("token")) return;

  //   try {
  //     const { data } = await tesloApi.get("/user/validate-token");
  //     const { token, user } = data;
  //     Cookies.set("token", token);
  //     dispatch({ type: "Auth - Login", payload: user });
  //   } catch (error) {
  //     Cookies.remove("token");
  //     dispatch({ type: "Auth - Logout" });
  //   }
  // };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("city");
    Cookies.remove("zip");
    Cookies.remove("country");
    Cookies.remove("phone");
    signOut();
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Error al registrar usuario",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        login,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
