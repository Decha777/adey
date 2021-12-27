import React from "react";
import PageLayout from "../../components/layout";

import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const submitHandler = () => {
    router.push("/");
  };
  return (
    <PageLayout>
      <h1>Login Page</h1>
      <form action="">
        <label htmlFor="username"></label>
        <input type="text" name="username" id="username" />
      </form>
      <button onClick={submitHandler}>login</button>
    </PageLayout>
  );
}
