import { toast } from "react-toastify";
import { auth } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
function UserInfo() {
  const { currentUser } = useUserStore();

  const optionClickHandler = () => {
    auth.signOut();
    toast.success("You have successfully Logged out")
  };

  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          className="w-[50px] h-[50px] rounded-[50%] object-cover"
          src={currentUser?.avatar || "./avatar.png"}
          alt=""
        />
        <h2 className="text-xl	font-bold">{currentUser?.username}</h2>
      </div>
      <div className="flex gap-5">
        <Menu as="div" className="relative">
          <MenuButton>
            <img
              className="w-5 h-5 cursor-pointer"
              src="./more.png"
              alt=""
            />
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-35 origin-top-right rounded-md bg-searchBar shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <p className="block px-4 py-1 text-sm text-white data-[focus]:bg-searchBar data-[focus]:text-slate-200" onClick={optionClickHandler}>
                    Logout
                  </p>
                </MenuItem>
              </div>
            </MenuItems>
          </MenuButton>
        </Menu>
        <img
          className="w-5 h-5 cursor-pointer hidden"
          src="./video.png"
          alt=""
        />
        <img className="w-5 h-5 cursor-pointer" src="./edit.png" alt="" />
      </div>
    </div>
  );
}

export default UserInfo;
