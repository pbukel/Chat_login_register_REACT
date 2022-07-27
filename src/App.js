import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import mainContext from "./context/mainContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import AllUsersPage from "./pages/AllUsersPage";
import ConversationsPage from "./pages/ConversationsPage";
import SingleUserPage from "./pages/SingleUserPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const [getMessages, setMessages] = useState();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [msIndex, setMsgIndex] = useState();
  const [chatinguser, setChatingUser] = useState();
  return (
    <mainContext.Provider
      value={{
        getMessages,
        setMessages,
        modal,
        setModal,
        modal2,
        setModal2,
        msIndex,
        setMsgIndex,
        chatinguser,
        setChatingUser,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Header />
          <div className="routes">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/user/:username" element={<SingleUserPage />} />
              <Route path="/allusers" element={<AllUsersPage />} />
              <Route path="/conversations" element={<ConversationsPage />} />
              <Route
                path="/chat"
                element={
                  <ChatPage index={msIndex} chating_user={chatinguser} />
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </mainContext.Provider>
  );
}

export default App;
