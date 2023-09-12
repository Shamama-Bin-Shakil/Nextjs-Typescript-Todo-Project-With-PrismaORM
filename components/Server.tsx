"use client";
import { TodoProps } from "@/app/page";
import "@/style/Todo.scss";
import { useRouter } from "next/navigation";
const ListTodo = (todo: TodoProps) => {
  const router = useRouter()

  async function deleteTodo(id: string) {
    // alert("welcome" + id)
    const response = await fetch(`http://localhost:3000/api/task/deletetask?id=${id}`, {method: "GET"});
    const result = await response.json();
    console.log(result);
    if(result){
      router.refresh();
    }
  }

  async function changeComplete(id: string) {
    const response = await fetch(`http://localhost:3000/api/task/changecomplete?id=${id}`, {method: "POST", body: JSON.stringify({iscomplete: !todo.complete})});
    const result = await response.json();
    console.log(result);
    if(result){
      router.refresh();
    }
  }


  return (
    <>
      <div className="todoBox">
        <div className="detail">
          <h3>{todo.title}</h3>
          <p>{todo.text}</p>
        </div>
        <div className="operation">
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={e=>changeComplete(todo.id)}
            className="checkboxTodo"
          />
          <button onClick={()=>deleteTodo(todo.id)}>DELETE</button>
        </div>
      </div>
    </>
  );
};

export { ListTodo };
