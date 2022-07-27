import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import mainContext from "../context/mainContext";
import { useNavigate } from "react-router-dom";
import { addChatsforlogedUserifEmplty } from "../features/users";

function SingleUserPage() {
  const {
    setMessages,

    setMsgIndex,

    setChatingUser,
  } = useContext(mainContext);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { username } = useParams();
  const alluseriai = useSelector((state) => state.users.value.users);
  const logedUser = useSelector((state) => state.users.value.loggedUser);
  const selected_user = alluseriai.filter((x) => x.username === username);
  const allMymessage = logedUser.chats.filter(
    (x) => x.id === selected_user[0].id
  );
  const msgIndex = logedUser.chats.findIndex(
    (x) => x.id === selected_user[0].id
  );

  function startChat() {
    if (allMymessage.length > 0) {
      console.log(allMymessage);
      setMessages(allMymessage[0].messages);
      setMsgIndex(msgIndex);
    } else {
      const newData = {
        data: {
          id: selected_user[0].id,
          name: selected_user[0].username,
          messages: [],
        },
      };
      console.log(selected_user);
      dispatch(addChatsforlogedUserifEmplty(newData));
      setMessages([]);
      setMsgIndex(0);
    }

    setChatingUser(selected_user[0]);
    console.log(selected_user[0]);
    nav("/chat");
  }

  return (
    <div className="selected_user">
      <img src={selected_user[0].photo} alt="" />
      <h1>{selected_user[0].username}</h1>
      <button onClick={startChat}>START CHATTING</button>
    </div>
  );
}

export default SingleUserPage;
