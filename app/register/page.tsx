"use client"
import { ContextProvider } from "@/components/Client";
import "@/style/Form.scss";
import { redirect } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  const data = useContext(ContextProvider)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const FormSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    const result = await response.json();
    if(result.success === true) {
      data?.setUser(result.success)
      Swal.fire({
        title: 'Success!',
        text: 'Account Created Successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }else {
      Swal.fire({
        title: 'Error!',
        text: result.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  useEffect(() => {
    if (data?.user === true) {
      redirect("/");
    }
  }, [data]);

  return (
    <div className="formContainer">
      <form onSubmit={FormSubmitHandler}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default page;
