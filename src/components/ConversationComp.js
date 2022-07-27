import React from "react";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import mainContext from "../context/mainContext";
import { removeChats } from "../features/users";

function ConversationComp({ item }) {
  const dispatch = useDispatch();
  const {
    setMessages,

    setMsgIndex,
    setChatingUser,
  } = useContext(mainContext);
  const alluseriai = useSelector((state) => state.users.value.users);

  const selected_user = alluseriai.filter((x) => x.username === item.name);

  const logedUser = useSelector((state) => state.users.value.loggedUser);
  console.log(item);
  const allMymessage = logedUser.chats.filter(
    (x) => x.id === selected_user[0].id
  );
  const nav = useNavigate();

  function startChat() {
    setMessages(allMymessage[0].messages);
    setMsgIndex(msgIndex);
    setChatingUser(selected_user[0]);
    nav("/chat");
  }
  const msgIndex = logedUser.chats.findIndex((x) => x.id === item.id);

  function deleteConversation() {
    console.log(logedUser.chats);
    const filtered = logedUser.chats.filter((x) => x.id !== item.id);
    console.log(filtered);
    dispatch(removeChats(filtered));
  }

  return (
    <div className="conversation">
      <h1 onClick={startChat} className="hower">
        {item.name}({item.messages.length})
      </h1>
      <button onClick={deleteConversation}>DELETE</button>
    </div>
  );
}

export default ConversationComp;
