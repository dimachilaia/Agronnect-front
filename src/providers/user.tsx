import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface IUser {
  id: number;
  name: string;
  last_name: string;
  user_types: string;
  country: string;
  email: string;
  phone: string | null;
  about: string | null;
  crops_expertise: string[] | null;
  specialties: string[] | null;
  work_experience: string[] | null;
  resume: string | null;
  avatar: string | null;
  local_path: string | null;
  crops: string[];
  specs: string[];
  cv_name: string | null;
  time_zone: string | null;
  locale: string;
  iban: string | null;
}

interface UserContextInterface {
  user: IUser | null;
  isLoggedIn: boolean;
  setUser: (user: IUser | null) => void;
  token: string;
}

interface Props {
  children: React.ReactNode;
}

const UserStateContext = createContext<UserContextInterface | undefined>(
  undefined
);

function UserProvider(props: Props) {
  const { children } = props;
  const [user, setUser] = useState<UserContextInterface["user"]>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        axios
          .get("https://api.agronnect.dev/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUser(res.data);
          });
        setToken(token);
      } catch {
        setUser(null);
        setToken("");
      }
    } else {
      setUser(null);
      setToken("");
    }
  }, []);

  return (
    <UserStateContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user?.id,
        token,
      }}
    >
      {children}
    </UserStateContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
