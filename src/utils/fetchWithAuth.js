import { refreshAuthToken } from "../services/authService";

const fetchWithAuth = async (url, options={}) => {
    try {
        let response = await fetch(url, {
        ...options,
            credentials: "include",
        });

        if (response.status === 401 || response.status === 403) {
            const refreshToken = await refreshAuthToken();

            if (refreshToken?.success) {
                response = await fetch(url, {
                    ...options,
                    credentials: "include",
                });

                return response;
            }
        }

        return response;
        
    } catch(err) {
        console.error("Error fetching with auth token: ", err);
        throw err;
    }
} 

export default fetchWithAuth;