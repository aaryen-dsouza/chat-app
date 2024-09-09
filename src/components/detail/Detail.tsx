import { auth } from "../../lib/firebase";

function Detail() {
  return (
    <div className="detailFlex">
      <div className="user px-7 py-5 flex flex-col items-center gap-3 border-b-2 border-slate-800">
        <img className="w-[100px] h-[100px] rounded-full object-cover" src="./avatar.png" alt="" />
        <h2 className="text-xl font-bold">Aaryen D</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info p-5 flex flex-col gap-5">
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Chat Settings</span>
            <img className="w-[30px] h-[30px] p-2 rounded-full bg-searchBar cursor-pointer" src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Privacy & Help</span>
            <img className="w-[30px] h-[30px] p-2 rounded-full bg-searchBar cursor-pointer" src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Shared Photos</span>
            <img className="w-[30px] h-[30px] p-2 rounded-full bg-searchBar cursor-pointer" src="./arrowDown.png" alt="" />
          </div>
          <div className="photos flex flex-col gap-5 mt-5">
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex items-center gap-5">
              <img className="w-[40px] h-[40px] rounded object-cover" src="https://images.pexels.com/photos/21967688/pexels-photo-21967688/free-photo-of-portrait-of-a-pretty-brunette-wearing-a-black-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
              <span className="text-xs text-gray-300 font-light">photo_2024_08.png</span>
              </div>
              <img src="./download.png" alt="" className="w-[30px] h-[30px] p-2 rounded bg-searchBar cursor-pointer" />
            </div>
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex items-center gap-5">
              <img className="w-[40px] h-[40px] rounded object-cover" src="https://images.pexels.com/photos/21967688/pexels-photo-21967688/free-photo-of-portrait-of-a-pretty-brunette-wearing-a-black-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
              <span className="text-xs text-gray-300 font-light">photo_2024_08.png</span>
              </div>
              <img src="./download.png" alt="" className="w-[30px] h-[30px] p-2 rounded bg-searchBar cursor-pointer"  />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Shared Files</span>
            <img className="w-[30px] h-[30px] p-2 rounded-full bg-searchBar cursor-pointer" src="./arrowUp.png" alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3.5">
      <button className="py-1.5 w-3/5 bg-red-500 hover:bg-red-800 text-white border-none rounded cursor-pointer">Block User</button>
      <button className="py-1.5 w-3/5 bg-blue-500 hover:bg-blue-800 text-white border-none rounded cursor-pointer" onClick={() => auth.signOut()}>Logout</button>
      </div>
        
    </div>
  );
}

export default Detail;
