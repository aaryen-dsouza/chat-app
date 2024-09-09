import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";


function App() {
const {currentUser, isLoading, fetchUserInfo} = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid || "")
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);


  console.log(currentUser);
  
if(isLoading) return <div className="loading p-7 text-4xl rounded-lg bg-chatscreen">Loading...</div>

  return (
    <div className="w-[80vw] h-[90vh] bg-chatscreen backdropFilterSat rounded-xl border-2 border-solid border-slate-50/[.125] flex">
      {currentUser ? (
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
