import { useState } from "react"
import AddUser from "./addUser/AddUser";

function ChatList() {
const [addMode, setAddMode] = useState<boolean>(true);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-5 p-5 border-b-2 border-slate-800">
        <div className="flex-1 bg-searchBar flex items-center gap-5 rounded-lg p-2.5">
          <img className="w-5 h-5" src="./search.png" alt="" />
          <input className='bg-transparent border-none outline-none text-white flex-1' type="text" placeholder='Search' />
        </div>
        <img className="w-9 h-9 bg-searchBar p-2.5 rounded-lg cursor-pointer" src={addMode ? "./minus.png" : "./plus.png"} onClick={() => setAddMode((prev) => !prev)} alt="" />
      </div>
      <div className="flex items-center gap-5 p-3 cursor-pointer border-b-2 border-slate-800">
        <img className="w-[50px] h-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Aaryen D</span>
          <p className="text-sm font-normal text-textSub">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-3 cursor-pointer border-b-2 border-slate-800">
        <img className="w-[50px] h-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Aaryen D</span>
          <p className="text-sm font-normal text-textSub">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-3 cursor-pointer border-b-2 border-slate-800">
        <img className="w-[50px] h-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Aaryen D</span>
          <p className="text-sm font-normal text-textSub">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-3 cursor-pointer border-b-2 border-slate-800">
        <img className="w-[50px] h-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Aaryen D</span>
          <p className="text-sm font-normal text-textSub">Hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  )
}

export default ChatList