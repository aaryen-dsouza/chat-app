import React, {useState, useEffect } from "react";
import userContext from "./UserContext";
import { onAuthStateChanged, User } from "firebase/auth";
import {auth} from "../firebaseConfig";

const UserContextProvider : React.FC<{children:React.ReactNode}> = ({children}) => {
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const unsubscribe  = onAuthStateChanged(auth, (user) => {
    setUser(user);
  })

  return () => unsubscribe()
}, [])


return (
    <userContext.Provider value={{user}}>
        { children }
    </userContext.Provider>
)

}

export default UserContextProvider;