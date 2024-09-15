import { create } from 'zustand'
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore';

interface User {
    username: string;
    email: string;
    avatar: string;
    about: string;
    id: string;
    blocked: string[];
  }
  
  interface UserStore {
    currentUser: User | null;
    isLoading: boolean;
    fetchUserInfo: (uid: string) => Promise<void>;
  }

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid: string) => {
    if(!uid) return set({currentUser: null, isLoading: false})
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                const userData = docSnap.data() as User;
                set({currentUser: userData, isLoading: false})
            } else {
                set({currentUser: null, isLoading: false})
            }
        } catch (error) {
            return set({currentUser: null, isLoading: false})
        }
  }
}))
