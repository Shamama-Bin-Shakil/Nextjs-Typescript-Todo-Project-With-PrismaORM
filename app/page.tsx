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

const page = () => {
  const data = useContext(ContextProvider);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    if (data?.user === false) {
      redirect("/login");
    }

    fetch("http://localhost:3000/api/getTodo", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setTodo(data.userTodo));
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
              // deleteTodo={deleteTodo(i.id)}
              text={i.text}
              complete={i.complete}
            />
          ))}
      </div>
    </>
  );
};

export default page;
