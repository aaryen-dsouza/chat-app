// import { useState } from 'react'
// import UserContextProvider from './context/UserContextProvider'
// import Register from './pages/Register'

import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

function App() {
  const user = false;

  return (
    <div className="w-[80vw] h-[90vh] bg-chatscreen backdropFilterSat rounded-xl border-2 border-solid border-slate-50/[.125] flex">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
