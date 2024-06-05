import { User } from "../../interfaces/auth";

export interface UserSlice {
    user: User | null,
    setUser: (user:User) => void
}

export const createUserSlice = (set: any): UserSlice => ({

    user: null,
    setUser: (user) => set({ user }),

})