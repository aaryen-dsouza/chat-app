import { User } from "firebase/auth";
import React from "react";

interface userObject {
    username: string,
    password: string
}



interface userContextInterface {
    user: User | null;
}

const userContext = React.createContext<userContextInterface | undefined>(undefined);

export default userContext;