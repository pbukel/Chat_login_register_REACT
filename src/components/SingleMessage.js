import React from "react";
import { useSelector } from "react-redux";

function SingleMessage({ mess }) {
  const logedUser = useSelector((state) => state.users.value.loggedUser);
  const styling = {
    background: mess.id === logedUser.id ? "white" : "blue",
    display: "flex",
    justifyContent: mess.id === logedUser.id ? "end" : "start",
  };
  return (
    <div style={styling} className="one_mess">
      <h1>{mess.text}</h1>
    </div>
  );
}

export default SingleMessage;
