import { create } from "zustand";
import { signOut } from "../services/authService";
import { getAuthenticatedtUser } from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsLoading: (value) => set({ isLoading: value }),

  logout: async () => {
    try {
        await signOut();   
        set({ user: null, isAuthenticated: false, isLoading: false });
    
    } catch (e) {
        console.error("Logout service failed:", e);
        set({isLoading: false});
    }
    
  },

  fetchCurrentUser: async () => {
    set({ isLoading: true });
    try {
        const authenticatedUser = await getAuthenticatedtUser();

        if (authenticatedUser?.success) {
          set({user: authenticatedUser.user, isAuthenticated: true});
        } else {
          set({user: null, isAuthenticated: false});
        }

    } catch(err){
        console.error(err);
        set({ user: null, isAuthenticated: false });
    } finally {
        set({ isLoading: false });
    }
  }

}));

export default useAuthStore;
