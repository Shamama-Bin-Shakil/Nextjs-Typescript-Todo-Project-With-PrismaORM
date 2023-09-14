"use client";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

export type ChildrenProp = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
};
export type User = {
  id: string;
  name: string;
  email: string;
};

export type PassValue = {
  todo: Todo[];
  user: {};
  setUser: any;
};

export const ContextProvider = createContext<PassValue | null>(null);

const Context = ({ children }: ChildrenProp) => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [user, setUser] = useState(false);

  useEffect(() => {
    fetch(`/api/auth/me`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.success));
  }, [user]);

  return (
    <ContextProvider.Provider value={{ todo, user, setUser }}>
      {children}
    </ContextProvider.Provider>
  );
};

export const Button = () => {
  const router = useRouter();
  const data = useContext(ContextProvider);
  function Logout() {
    alert("logout");
    const result: any = localStorage.setItem("token", "");
    data?.setUser(false);
    router.push("/login");
  }
  return <button onClick={Logout}>Logout</button>;
};

export default Context;
