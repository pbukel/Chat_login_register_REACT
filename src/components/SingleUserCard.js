import React from "react";
import { useNavigate } from "react-router-dom";

function SingleUserCard({ user, index }) {
  const nav = useNavigate();
  function openUser(username) {
    nav("/user/" + username);
  }
  return (
    <div onClick={() => openUser(user.username)} className="singleUser">
      <img src={user.photo} alt="" />
      <h1>{user.username}</h1>
    </div>
  );
}

export default SingleUserCard;
