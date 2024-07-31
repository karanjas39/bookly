"use client";

import { getAllGneres } from "@/utils/genre";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthType = {
  authorized: boolean;
  user: userType;
  genres: genretype;
  setUser: Dispatch<SetStateAction<userType>>;
  setAuthorized: Dispatch<SetStateAction<boolean>>;
};

type userType = {
  name: string;
  email: string;
  verified: boolean;
  createdAt: string;
};

type genretype = {
  id: string;
  name: string;
}[];

const AuthContext = createContext<AuthType>({
  authorized: false,
  user: {
    name: "",
    email: "",
    verified: false,
    createdAt: "",
  },
  genres: [],
  setAuthorized: () => {},
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
  const [genre, setGenre] = useState<genretype>([]);

  useEffect(() => {
    if (!genre.length) {
      (async () => {
        const { success, data } = await getAllGneres();
        if (success && data.allGenres) {
          setGenre(data.allGenres);
        }
      })();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authorized, setAuthorized, user, setUser, genres: genre }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  //   if (!context) return null;
  return context;
}
