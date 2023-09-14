"use client";
import { ListTodo } from "@/components/Server";
import "@/style/Form.scss";
import "@/style/Todo.scss";
import TodoAdd from "./todoAdd";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "@/components/Client";
import { redirect } from "next/navigation";

export interface TodoProps {
  id: string;
  key: number;
  title: string;
  text: string;
  complete: boolean;
  // deleteTodo: (id: string) => void;
}

const Page = () => {
  const data = useContext(ContextProvider);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    if (data?.user === false) {
      redirect("/login");
    }

    fetch("/api/getTodo", {
      method: "GET",
      headers: { 'token': localStorage.getItem("token") || "" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data.userTodo);
        console.log(data);
      });
  }, [data]);

  return (
    <>
      <TodoAdd />
      <div className="todoContainer">
        {todo &&
          todo.map((i: TodoProps, index) => (
            <ListTodo
              key={index}
              id={i.id}
              title={i.title}
              text={i.text}
              complete={i.complete}
            />
          ))}
      </div>
    </>
  );
};

export default Page;
