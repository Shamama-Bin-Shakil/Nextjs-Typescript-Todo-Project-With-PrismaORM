"use client";
import { ReactNode, createContext, useEffect, useState, useContext } from "react";

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
    fetch(`https://prismatodo.vercel.app/api/auth/me`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setUser(data.success));
  }, []);

 

  return (
    <ContextProvider.Provider value={{ todo, user, setUser }}>
      {children}
    </ContextProvider.Provider>
  );
};


export const Button = () => {
  const data = useContext(ContextProvider)
  async function Logout() {
    alert("logout");
      const response = await fetch(`https://prismatodo.vercel.app/api/auth/logout`, {
        method: "GET"
      })
      const result = await response.json();
      if(result) {
        data?.setUser(false);
      }
  }
  return <button onClick={Logout}>Logout</button>;
};

export default Context;