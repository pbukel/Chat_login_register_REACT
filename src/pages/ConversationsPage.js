import React from "react";
import { useSelector } from "react-redux";
import ConversationComp from "../components/ConversationComp";

function ConversationsPage() {
  const logedUserChats = useSelector(
    (state) => state.users.value.loggedUser.chats
  );
  return (
    <div className="conv_block">
      {logedUserChats.map((x, i) => (
        <ConversationComp key={i} item={x} />
      ))}
    </div>
  );
}

export default ConversationsPage;
