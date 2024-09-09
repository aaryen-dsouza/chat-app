import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

interface User {
  username: string;
  email: string;
  avatar: string;
  id: string;
  blocked: string[];
}

interface ChatItem {
  receiverId: string;
  chatId: string;
  lastMessage: string;
  updatedAt: number;
  user: User;
}

function ChatList() {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [addMode, setAddMode] = useState<boolean>(false);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser!.id),
      async (res) => {
        const items = res.data()?.chats || [];

        const promises = items.map(async (item: ChatItem) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  // console.log(chats);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-5 p-5 border-b-2 border-slate-800">
        <div className="flex-1 bg-searchBar flex items-center gap-5 rounded-lg p-2.5">
          <img className="w-5 h-5" src="./search.png" alt="" />
          <input
            className="bg-transparent border-none outline-none text-white flex-1"
            type="text"
            placeholder="Search"
          />
        </div>
        <img
          className="w-9 h-9 bg-searchBar p-2.5 rounded-lg cursor-pointer"
          src={addMode ? "./minus.png" : "./plus.png"}
          onClick={() => setAddMode((prev) => !prev)}
          alt=""
        />
      </div>
      {chats.map((chat) => (
        <div
          className="flex items-center gap-5 p-3 cursor-pointer border-b-2 border-slate-800"
          key={chat.chatId}
        >
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={chat.user.avatar || "./avatar.png"}
            alt=""
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{chat.user.username}</span>
            <p className="text-sm font-normal text-textSub">
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
      {addMode && <AddUser setAddMode={setAddMode} />}
    </div>
  );
}

export default ChatList;
