import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import upload from "../../lib/upload";

interface avatarInterface {
  file: File | null;
  url: string | null;
}

// interface HTMLInputEvent extends Event {
//   target: HTMLInputElement & EventTarget;
// }

function Login() {
  const [avatar, setAvatar] = useState<avatarInterface>({
    file: null,
    url: "",
  });

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleAvatar: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoginLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
      toast.success("You have successfully Logged in");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    setRegisterLoading(true);
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);

    const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!");
    if (!avatar.file) return toast.warn("Please upload an avatar!");

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Select another username");
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        about: "Hey! I am on the chat app",
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });

      toast.success("Account has been created! You can login now!");
      
      form.reset();
      
      setAvatar({ file: null, url: "" });

    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="login w-full h-full flex items-center gap-[100px]">
      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2 className="font-bold text-2xl">Welcome back</h2>
        <form
          className="flex flex-col items-center justify-center gap-5"
          action=""
          onSubmit={handleLogin}
        >
          <input
            className="px-8 py-3 border-none outline-none bg-background text-white rounded"
            type="email"
            placeholder="Email or Username"
            name="email"
          />
          <input
            className="px-8 py-3 border-none outline-none bg-background text-white rounded"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            disabled={loginLoading}
            className="px-8 py-2 border-none bg-blue-500 text-white rounded cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loginLoading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
      <div className="seperator h-[80%] w-[0.5px] bg-slate-500"></div>
      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2 className="font-bold text-2xl">Create an account</h2>
        <form
          onSubmit={handleRegister}
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
            className="px-8 py-3 border-none outline-none bg-background text-white rounded"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="px-8 py-3 border-none outline-none bg-background text-white rounded"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="px-8 py-3 border-none outline-none bg-background text-white rounded"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            disabled={registerLoading}
            className="px-8 py-2 border-none bg-blue-500 text-white rounded cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {registerLoading ? "Loading" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
