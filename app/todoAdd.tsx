"use client";
import "@/style/Form.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const TodoAdd = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const FormSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(title === "" || text === "") return

    const response = await fetch("http://localhost:3000/api/newtodo", {
      method: "POST",
      body: JSON.stringify({ title, text }),
    });
    const result = await response.json();
    if (result) {
      Swal.fire({
        title: 'Success!',
        text: 'Todo Add Successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      router.refresh();
      setTitle("");
      setText("");
    }else {
      Swal.fire({
        title: 'Error!',
        text: result.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={FormSubmitHandler}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />

        <label htmlFor="text">Text:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="text"
          onKeyDown={e=> e.key === "Enter" ? FormSubmitHandler : null}
        />
        <button type="submit" value="Submit">Submit</button>
      </form>
    </div>
  );
};

export default TodoAdd;
