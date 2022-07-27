import React from "react";

import { useContext } from "react";
import mainContext from "../context/mainContext";
import SingleMessage from "../components/SingleMessage";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMsg } from "../features/users";
import { updateUser } from "../features/users";
import { userChatUpdate } from "../features/users";
import { useNavigate } from "react-router-dom";
import { addChatifEmplty } from "../features/users";

function ChatPage({ index, chating_user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const allusers = useSelector((state) => state.users.value.users);
  const logedUser = useSelector((state) => state.users.value.loggedUser);
  const inMessage = useRef();
  const { getMessages, setMessages } = useContext(mainContext);
  let objIndex = allusers.findIndex((obj) => obj.id === logedUser.id);
  // console.log(objIndex);
  const updatedUser = {
    user: logedUser,
    index: objIndex,
  };
  console.log(logedUser);

  ///adding chat to other user database

  let checkifchatexist = chating_user.chats.find((x) => x.id === logedUser.id);
  const selectedUserIndex = allusers.findIndex((x) => x.id === chating_user.id);
  const selectedUserChatIndex = chating_user.chats.findIndex(
    (x) => x.id === logedUser.id
  );
  function addMessage() {
    console.log(index, chating_user);
    const newmees = {
      id: logedUser.id,
      text: inMessage.current.value,
    };
    const newArr = [...getMessages, newmees];
    // add mesage to state, to see updates
    setMessages(newArr);
    const object = {
      array: newArr,
      index: index,
    };
    // add messsages to loged user database
    dispatch(addMsg(object));

    ///updating CHAT array into  other user
    if (checkifchatexist) {
      const data = {
        array: newArr,
        userIndex: selectedUserIndex,
        messageIndex: selectedUserChatIndex,
      };
      dispatch(userChatUpdate(data));
    } else {
      const newData = {
        userIndex: selectedUserIndex,
        data: {
          id: logedUser.id,
          name: logedUser.username,
          messages: newArr,
        },
      };
      dispatch(addChatifEmplty(newData));
    }
  }

  function closeModal(obj) {
    dispatch(updateUser(obj));

    setTimeout(nav("/user/" + chating_user.username), 2000);
  }
  return (
    <div className="modal">
      <div className="insideModal">
        <div className="hower" onClick={() => closeModal(updatedUser)}>
          X
        </div>
        <div className="messages">
          {getMessages.map((x, i) => (
            <SingleMessage key={i} mess={x} />
          ))}
        </div>
        <div className="sending">
          <input ref={inMessage} type="text" placeholder="message" />
          <button onClick={addMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
