import React, { useState } from "react";
import { toast } from "react-toastify";

interface avatarInterface {
  file: null | React.ChangeEvent<HTMLInputElement>;
  url: null | string;
}

function Login() {
  const [avatar, setAvatar] = useState<avatarInterface>({
    file: null,
    url: "",
  });

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Hello")
  }

  return (
    <div className="login w-full h-full flex items-center gap-[100px]">
      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2 className="font-bold text-2xl">Welcome back</h2>
        <form
          className="flex flex-col items-center justify-center gap-5"
          action=""
          onSubmit={(handleLogin)}
        >
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="px-8 py-3 border-none outline-none bg-chatscreen text-white rounded"
            type="email"
            placeholder="Email or Username"
            name="email"
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="px-8 py-3 border-none outline-none bg-chatscreen text-white rounded"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="px-8 py-2 border-none bg-blue-500 text-white rounded cursor-pointer font-medium">Login</button>
        </form>
      </div>
      <div className="seperator h-[80%] w-[0.5px] bg-slate-500"></div>
      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2 className="font-bold text-2xl">Create an account</h2>
        <form
          className="flex flex-col items-center justify-center gap-5"
          action=""
        >
          <label
            className="w-full flex items-center justify-evenly cursor-pointer underline"
            htmlFor="file"
          >
            <img
              src={avatar.url || "./avatar.png"}
              alt=""
              className="w-[50px] h-[50px] rounded-lg object-cover opacity-60"
            />
            Upload an image
          </label>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={handleAvatar}
          />
          <input
            className="px-8 py-3 border-none outline-none bg-chatscreen text-white rounded"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="px-8 py-3 border-none outline-none bg-chatscreen text-white rounded"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="px-8 py-3 border-none outline-none bg-chatscreen text-white rounded"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="px-8 py-2 border-none bg-blue-500 text-white rounded cursor-pointer font-medium">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
