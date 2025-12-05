import { refreshAuthToken } from "../services/authService";
import useAuthStore from "../stores/authStore";

const fetchWithAuth = async (url, options={}) => {
    try {
        let response = await fetch(url, {
        ...options,
            credentials: "include",
        });

        if (response.status === 401 || response.status === 403) {
            const refreshToken = await refreshAuthToken();
            const {fetchCurrentUser, setUser, logout} = useAuthStore.getState();

            if (refreshToken?.success) {

                const user = await fetchCurrentUser();
                if (user) {
                    setUser(user);

                    response = await fetch(url, {
                        ...options,
                        credentials: "include",
                    });
                }

                return response;
            }

            logout(); 
            throw new Error("Session expired. User logged out.");
        }

        return response;
        
    } catch(err) {
        console.error("Error fetching with auth token: ", err);
        throw err;
    }
} 

export default fetchWithAuth;