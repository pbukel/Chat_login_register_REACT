import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogetUser } from "../features/users";

function Header() {
  const logedUser = useSelector((state) => state.users.value.loggedUser);
  const nav = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    dispatch(setLogetUser(null));
    nav("/");
  }

  return (
    <div>
      {!logedUser ? (
        <div className="header">
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="header">
          <Link to="/profile">Profile</Link>
          <Link to="/allusers">All Users</Link>
          <Link to="/conversations">Conversations</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Header;
