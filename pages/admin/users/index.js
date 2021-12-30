import React from "react";
import { useRef } from "react";

// custom modules
import PageLayout from "../../../components/layout/index";
export default function UserAdmin() {
  // Input references
  const userNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const avatorRef = useRef();

  //   Post function
  const sideEffect = async (data) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  };

  // Submit handler function
  const submitHandler = (e) => {
    e.preventDefault();

    const userName = userNameRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const age = ageRef.current.value;
    const avator = avatorRef.current.value;


    // TODO:
    const calcAge = (birth_date) => {
      // 365.25 * 24 * 60 * 60 * 100
      // leap year == 3.15576e + 10
      // may not be perfect in hours
      const diffrence = Math.floor(
        new Date() - new Date(birth_date) / 3.15576e10
      );
      const age =
        new Date().getUTCFullYear() - new Date(diffrence).getUTCFullYear();
      return age;
    };

    const newUser = {
      userName,
      firstName,
      lastName,
      age: calcAge(age),
      avator,
    };
    sideEffect(newUser);
  };

  return (
    <PageLayout>
      <h1>Create New User</h1>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" ref={userNameRef} id="username" />
        </div>
        <div className="input">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            ref={firstNameRef}
          />
        </div>
        <div className="input">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" name="lastname" id="lastname" ref={lastNameRef} />
        </div>
        <div className="input">
          <label htmlFor="age">Birth Date</label>
          <input type="date" name="age" id="age" ref={ageRef} />
        </div>
        <div className="input">
          <label htmlFor="avator">Profile Picture</label>
          <input type="file" name="avator" id="avator" ref={avatorRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </PageLayout>
  );
}
