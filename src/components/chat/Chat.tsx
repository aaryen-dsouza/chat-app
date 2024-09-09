import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

interface Message {
  text: string;
  img?: string;
  createdAt: number;
}

interface Chat {
  messages: Message[];
}

function Chat() {
  const [openEmoji, setEmojiOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | undefined>(undefined);
  const [text, setText] = useState("");

  const { chatId } = useChatStore();

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e: EmojiClickData) => {
    console.log(e);

    setText((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  useEffect(() => {

    if (!chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      const chatData = res.data() as Chat | undefined;
      setChat(chatData);
    })

    return () => {
      unSub();
    }
  }, [chatId]);

  console.log(chat);
  

  return (
    <div className="chatFlex border-l-2 border-r-2 border-slate-800 h-full flex flex-col">
      <div className="top px-4 py-2 flex items-center justify-between border-b-2 border-slate-800">
        <div className="user flex items-center gap-5">
          <img
            className="w-[60px] h-[60px] rounded-full object-cover"
            src="./avatar.png"
            alt=""
          />
          <div className="texts flex flex-col gap-0.5">
            <span className="text-lg font-bold">Aaryen D</span>
            <p className="text-xs font-normal text-gray-400">
              Lorem ipsum dolor sit.
            </p>
          </div>
        </div>
        <div className="icons flex gap-5">
          <img className="w-5 h-5" src="./phone.png" alt="" />
          <img className="w-5 h-5" src="./video.png" alt="" />
          <img className="w-5 h-5" src="./info.png" alt="" />
        </div>
      </div>
      <div className="center p-5 flex-1 overflow-y-auto flex flex-col gap-5">
        {chat?.messages.map((message)=> (

        
        <div className="message own max-w-[70%] flex gap-5" key={message?.createdAt}>
          <div className="texts flex-1 flex flex-col gap-1.5">
            {/* <img className="w-full h-[300px] rounded-lg gap-1.5 object-cover" src="https://images.pexels.com/photos/27383302/pexels-photo-27383302/free-photo-of-a-lamp-with-a-wooden-base-and-a-lampshade.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" /> */}
            {/* <img
              className="w-full h-[300px] rounded-lg object-cover"
              src="https://images.pexels.com/photos/27906198/pexels-photo-27906198/free-photo-of-portrait-white-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            /> */}
            {message.img && <img src={message.img} className="w-full h-[300px] rounded-lg object-cover" />}
            <p className="rounded-lg">
              {message.text}
            </p>
            {/* <span className="text-xs">1 min ago</span> */}
          </div>
        </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom px-5 py-2 flex items-center justify-between border-t-2 border-slate-800 gap-5 mt-auto">
        <div className="icons flex gap-5">
          <img className="w-5 h-5 cursor-pointer" src="./img.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="./camera.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="./mic.png" alt="" />
        </div>
        <input
          className="flex-1 bg-searchBar border-none outline-none text-white p-4 text-base rounded-lg"
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji relative">
          <img
            className="w-5 h-5 cursor-pointer"
            src="./emoji.png"
            alt=""
            onClick={() => setEmojiOpen((prev) => !prev)}
          />
          <div className="picker absolute bottom-[50px] left-0">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton bg-sendBtn text-white px-5 py-1.5 border-none rounded cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
