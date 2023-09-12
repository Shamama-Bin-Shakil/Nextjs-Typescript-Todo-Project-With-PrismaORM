"use client"
import { ContextProvider } from "@/components/Client";
import "@/style/Form.scss";
import { redirect } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {

  const data = useContext(ContextProvider)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const FormSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if(result.success === true) {
      Swal.fire({
        title: 'Success!',
        text: 'Logged in',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      data?.setUser(result.success)
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
