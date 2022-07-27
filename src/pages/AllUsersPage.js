import React from "react";
import SingleUserCard from "../components/SingleUserCard";
import { useSelector } from "react-redux";

function AllUsersPage() {
  const users = useSelector((state) => state.users.value.users);
  return (
    <div className="allusers">
      {users.map((x, i) => (
        <SingleUserCard key={i} user={x} index={i} />
      ))}
    </div>
  );
}

export default AllUsersPage;
