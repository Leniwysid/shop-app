import "./register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { set, ref } from "firebase/database";

export const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        set(ref(database, "users/" + user.uid), {
          username: username,
          email: email,
        });

        alert("User created!");
        navigate("/shop");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
        // ..
      });
  };

  return (
    <div className="registerForm">
      <h1> Register Here </h1>
      <input
        type="text"
        value={username}
        placeholder="Display name"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      ></input>
      {/* <input type="password" placeholder="Confirm Password" required></input> */}
      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};
