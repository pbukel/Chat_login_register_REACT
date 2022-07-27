import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogetUser } from "../features/users";

function LoginPage() {
  const allusers = useSelector((state) => state.users.value.users);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const userRef = useRef();
  const passRef = useRef();

  function loginUser() {
    setError(null);
    const user = {
      username: userRef.current.value,
      pass: passRef.current.value,
    };

    const myUser = allusers.find(
      (x) => x.username === user.username && x.pass === user.pass
    );

    if (!myUser) return setError("bad user credentials");

    dispatch(setLogetUser(myUser));
    nav("/profile");
  }
  return (
    <div>
      <input ref={userRef} type="text" placeholder="username" />
      <input ref={passRef} type="text" placeholder="password" />

      <button onClick={loginUser}>Login</button>
      {error && <h3>{error}</h3>}
    </div>
  );
}

export default LoginPage;
