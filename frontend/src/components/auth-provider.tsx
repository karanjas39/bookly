"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type AuthType = {
  authorized: boolean;
  user: userType;
  setUser: Dispatch<SetStateAction<userType>>;
  setAuthorized: Dispatch<SetStateAction<boolean>>;
};

type userType = {
  name: string;
  email: string;
  verified: boolean;
  createdAt: string;
};

const AuthContext = createContext<AuthType>({
  authorized: false,
  setAuthorized: () => {},
  user: {
    name: "",
    email: "",
    verified: false,
    createdAt: "",
  },
  setUser: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<userType>({
    name: "",
    email: "",
    verified: false,
    createdAt: "",
  });

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  //   if (!context) return null;
  return context;
}
