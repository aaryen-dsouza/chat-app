// import { useState } from 'react'
// import UserContextProvider from './context/UserContextProvider'
// import Register from './pages/Register'

import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

function App() {
  const user: boolean = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);
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
