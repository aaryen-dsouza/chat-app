import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

interface Message {
  senderId: string | undefined;
  text: string;
  img?: string;
  createdAt: Timestamp;
}

interface Chat {
  messages: Message[];
}

interface ChatData {
  chatId: string;
  lastMessage: string;
  isSeen: boolean;
  updatedAt: number;
}

interface UserChatsData {
  chats: ChatData[];
}

interface ChatProps {
  setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDetailOpen: boolean;
}

// const updateUserStatus = async (uid: string, status: string) => {
//   const userRef = doc(db, "users", uid);
//   await updateDoc(userRef, {
//     status,
//     lastSeen: serverTimestamp(),
//   });
// };

function Chat({ setIsDetailOpen, isDetailOpen }: ChatProps) {
  const [openEmoji, setEmojiOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | undefined>(undefined);
  const [text, setText] = useState("");
  const [img, setImg] = useState<{
    file: File | null;
    url: string;
  }>({
    file: null,
    url: "",
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const [otherUserStatus, setOtherUserStatus] = useState(user?.status);

  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleImageLoad = () => scrollToBottom();

  const handleEmoji = (e: EmojiClickData) => {
    // console.log(e);

    setText((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  useEffect(() => {
    if (!chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      const chatData = res.data() as Chat | undefined;
      setChat(chatData);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleMessageSend = async (): Promise<void> => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      if (chatId) {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            senderId: currentUser?.id,
            text,
            createdAt: new Date(),
            ...(imgUrl ? { img: imgUrl } : {}),
          }),
        });
      }

      const userIds = [currentUser?.id, user!.id];

      userIds.forEach(async (id) => {
        if (id) {
          const userChatsRef = doc(db, "userChats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data() as UserChatsData;

            const chatIndex = userChatsData.chats.findIndex(
              (c) => c.chatId === chatId
            );

            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen =
              id === currentUser!.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, { chats: userChatsData.chats });
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }

    setImg({
      file: null,
      url: "",
    });

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.trim()) {
      e.preventDefault();
      handleMessageSend();
    }
  };

  const handleImg: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const infoDetailHandler = (): void => {
    setIsDetailOpen((prev: boolean) => !prev);
  };

  // console.log(chat);

  const formatDate = (timestamp: Timestamp) => {
    const messageDate = timestamp.toDate();
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const isToday =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

      const isYesterday =
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear();

      if(isToday) return "Today";
      else if(isYesterday) return "Yesterday"
      else if(messageDate.getFullYear === today.getFullYear) return messageDate.toLocaleDateString("en-US", {
      month: "long", // "January"
      day: "numeric", // "10"
    });
      else return messageDate.toLocaleDateString("en-US", {
        month: "long", // "January"
        day: "numeric", // "10"
        year: "numeric", // "2024"
      });
  };

  const isDifferentDay = (
    currentMessage: Message,
    previousMessage?: Message
  ) => {
    if (!previousMessage) return true;
    const currentDate = currentMessage.createdAt.toDate();
    const previousDate = previousMessage.createdAt.toDate();
    return (
      currentDate.getFullYear() !== previousDate.getFullYear() ||
      currentDate.getMonth() !== previousDate.getMonth() ||
      currentDate.getDate() !== previousDate.getDate()
    );
  };

  useEffect(() => {
    const userRef = doc(db, "users", user?.id as string);
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setOtherUserStatus(docSnapshot.data().status);
        console.log(docSnapshot.data().status);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, user?.status]);
  

  return (
    <div className="chatFlex border-l-2 border-r-2 border-none h-full w-[50%] flex flex-col">
      <div className="top px-4 pt-5 pb-3 flex items-center justify-between border-b-2 border-none">
        <div className="user flex items-center gap-5">
          <img
            className="w-[45px] h-[45px] rounded-full object-cover"
            src={user?.avatar || "./avatar.png"}
            alt=""
          />
          <div className="texts flex flex-col gap-0.5">
            <span className="text-lg font-bold">{user?.username} {<span className="text-xs font-light text-gray-200 ml-2" >{otherUserStatus}</span>
            // otherUserStatus === "active" ? <span className="inline-block mr-1 w-2 h-2 rounded-full border-green-500 bg-green-500 cursor-pointer"></span> : otherUserStatus === "Offline" ? <span className="inline-block mr-1 w-2 h-2 rounded-full border-gray-500 bg-gray-500"></span> : <span className="inline-block w-2 h-2 rounded-full mr-1  border-yellow-400 bg-yellow-400"></span>
            }</span>
            <p className="text-xs font-normal text-gray-400">{user?.about} </p>
          </div>
        </div>
        <div className="icons flex gap-5">
          <img className="w-5 h-5 hidden" src="./phone.png" alt="" />
          <img className="w-5 h-5 hidden" src="./video.png" alt="" />
          <img
            className="w-5 h-5 cursor-pointer"
            src="./info.png"
            onClick={infoDetailHandler}
            alt=""
          />
        </div>
      </div>
      <div className="center p-5 flex-1 overflow-y-auto flex flex-col gap-2">
        {chat?.messages.map((message, index) => {
          const previousMessage = chat?.messages[index - 1];
          const showDateSeparator = isDifferentDay(message, previousMessage);

          return (
            <div key={message?.createdAt.nanoseconds}>
              <div className="flex justify-center">
                {showDateSeparator && (
                  <p className="rounded-xl addUserBDF my-5 text-sm px-3 py-1">
                    {formatDate(message.createdAt)}
                  </p>
                )}
              </div>

              <div
                className={`${
                  message.senderId === currentUser?.id
                    ? "message own"
                    : "message"
                } flex gap-5`}
                key={message?.createdAt.nanoseconds}
              >
                <div className="texts flex-1 flex flex-col gap-1.5">
                  {/* <img className="w-full h-[300px] rounded-lg gap-1.5 object-cover" src="https://images.pexels.com/photos/27383302/pexels-photo-27383302/free-photo-of-a-lamp-with-a-wooden-base-and-a-lampshade.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" /> */}
                  {/* <img
              className="w-full h-[300px] rounded-lg object-cover"
              src="https://images.pexels.com/photos/27906198/pexels-photo-27906198/free-photo-of-portrait-white-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            /> */}
                  {message.img && (
                    <img
                      className="max-w-[380px] max-h-[244px] rounded-lg object-cover"
                      onLoad={handleImageLoad}
                      src={message.img}
                    />
                  )}
                  <p className="rounded-lg sm:max-w-[60%] max-w-fit">
                    {message.text}{" "}
                    <span className="text-xxs text-slate-200 mt-3 ml-3 float-end">
                      {message.createdAt &&
                        message.createdAt.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img
                className="max-w-[380px] max-h-[244px] rounded-lg object-cover"
                onLoad={handleImageLoad}
                src={img.url}
                alt=""
              />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom px-5 py-2 flex items-center justify-between border-t-2 border-none gap-5 mt-auto">
        <div className="icons flex gap-5">
          <label htmlFor="file">
            <img className="w-5 h-5 cursor-pointer" src="./img.png" alt="" />
          </label>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={handleImg}
          />
          <img
            className="w-5 h-5 cursor-pointer hidden"
            src="./camera.png"
            alt=""
          />
          <img
            className="w-5 h-5 cursor-pointer hidden"
            src="./mic.png"
            alt=""
          />
        </div>
        <input
          className="flex-1 bg-searchBar border-none outline-none text-white p-4 text-base rounded-lg disabled:cursor-not-allowed"
          type="text"
          autoFocus
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji relative">
          <img
            className="w-5 h-5 cursor-pointer"
            src="./emoji.png"
            alt=""
            onClick={() => setEmojiOpen((prev) => !prev)}
          />
          <div
            className={`picker absolute bottom-[50px] ${
              isDetailOpen ? "left-0" : "right-0"
            } `}
          >
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendButton bg-sendBtn text-white px-5 py-1.5 border-none rounded cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed hidden"
          onClick={handleMessageSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
