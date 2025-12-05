import { create } from "zustand";
import { signOut } from "../services/authService";
import { getAuthenticatedUser } from "../services/authService";

const useAuthStore = create((set, get) => ({
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
    const { user, isAuthenticated } = get();

    if (!user && !isAuthenticated) {
        set({ isLoading: true });
    }

    try {
        const authenticatedUser = await getAuthenticatedUser();

        if (authenticatedUser?.success) {
            set({
                user: authenticatedUser.user,
                isAuthenticated: true,
            });
            return authenticatedUser.user;
        } else {
            set({
                user: null,
                isAuthenticated: false,
            });
        }

    } catch (err) {
        console.error(err);
        set({
            user: null,
            isAuthenticated: false,
        });
    } finally {
        set({ isLoading: false });
    }
}


}));

export default useAuthStore;
