import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";


function App() {
const {currentUser, isLoading, fetchUserInfo} = useUserStore();

const {chatId} = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid || "")
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);


  // console.log(currentUser);
  
if(isLoading) return <div className="loading p-7 text-4xl rounded-lg bg-chatscreen2">Loading...</div>

  return (
    <div className="w-[80vw] max-w-[1550px] h-[90vh] bg-chatscreen2 rounded-xl flex">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
