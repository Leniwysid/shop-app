import React, { createContext, useState } from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { update, ref, get, child, getDatabase } from "firebase/database";
import { database } from "../../config/firebase";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dbRef = ref(getDatabase());

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/shop");

        const dt = new Date();
        update(ref(database, "users/" + user.uid), {
          last_login: dt,
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <div className="signIn">
      <div>
        <h1> Sign In </h1>
        <button onClick={signInWithGoogle} className="login-with-google-btn">
          Sign in with Google Account
        </button>
      </div>
      <p className="orTag"> OR </p>

      <div className="withPassword">
        <input
          id="email-address"
          type="email"
          placeholder="e-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          id="password"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={onLogin}>Log in</button>
      </div>
    </div>
  );
};
