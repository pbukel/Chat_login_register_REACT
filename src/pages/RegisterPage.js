import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/users";

function RegisterPage() {
  const allusers = useSelector((state) => state.users.value.users);
  const dispatch = useDispatch();
  const [getError, setError] = useState(null);
  const [getStyles, setStyles] = useState([
    "1px solid black",
    "1px solid black",
    "1px solid black",
  ]);
  const usernameRef = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();
  const nav = useNavigate();

  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;

  function registerUser() {
    const user = {
      photo:
        "https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=612x612&w=0&h=D6OBNUY7ZxQTAHNVtL9mm2wbHb_dP6ogIsCCWCqiYQg=",
      username: usernameRef.current.value,
      id: Date.now(),
      pass: passOneRef.current.value,
      pass2: passTwoRef.current.value,
      chats: [],
    };
    let styles = [...getStyles];

    if (user.username.length < 4 || user.username.length > 20) {
      styles[0] = "2px solid red";
      setStyles(styles);
      return setError("Bad username");
    }

    if (allusers.find((x) => x.username === user.username)) {
      styles[0] = "2px solid red";
      setStyles(styles);
      return setError("Username already exists...");
    }
    if (user.pass !== user.pass2) {
      styles[2] = "2px solid red";
      setStyles(styles);
      return setError("password do not match");
    }

    if (user.pass.length < 4 || user.pass.length > 20) {
      styles[1] = "2px solid red";
      setStyles(styles);
      return setError("Password too short");
    }

    if (!re.test(user.pass)) {
      styles[1] = "2px solid red";
      setStyles(styles);
      return setError(
        "It must be min 4 letter password, with at least a symbol, upper and lower case letters and a number"
      );
    }
    setStyles([
      "1px solid black",
      "1px solid black",
      "1px solid black",
      "1px solid black",
    ]);

    setError(null);
    nav("/");
    dispatch(addUser(user));
    console.log(allusers);
  }

  return (
    <div className="register">
      <input
        style={{ border: getStyles[0] }}
        ref={usernameRef}
        type="text"
        placeholder="username"
      />
      <input
        style={{ border: getStyles[1] }}
        ref={passOneRef}
        type="text"
        placeholder="pass 1"
      />
      <input
        style={{ border: getStyles[2] }}
        ref={passTwoRef}
        type="text"
        placeholder="pass 2"
      />
      {getError && <h1>{getError}</h1>}

      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default RegisterPage;
