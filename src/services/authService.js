import fetchWithAuth from "../utils/fetchWithAuth";
const apiBaseUrl = import.meta.env.VITE_STOCKIFY_BACKEND_URL;

const signUp = async (formData) => {
    try {
        const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `Registration failed: ${response.status}`,
            }
        }

        return data;

    } catch(err) {
        console.error("Error creating account: ", err);
        throw err;
    }
}

const login = async (formData) => {
    try {
        const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `Sign in failed: ${response.status}`,
            }
        }

        return data;

    } catch (err) {
        console.error("Unable to sign in: ", err);
        throw err;
    }
}

const signOut = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Unable to logout",
            }
        }

        return data;

    } catch(err) {
        console.error("Error logging out: ", err);
        throw err;
    }
}

const refreshAuthToken = async () => {
    try {
        const response = await fetch (`${apiBaseUrl}/api/auth/refresh`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        
        if (!response.ok) {
            return {
                success: false,
                message: data.message
            }
        }

        return {
            status: response.status,
            ...data
        }

    } catch (err) {
        console.error("Error refreshing auth token: ", err);
        throw err;
    }
}

const getAuthenticatedtUser = async () => {
    try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/auth/me`, {
            method: "GET",
        });

        const data = await response.json();

        return data;
    } catch(err){
        console.error("Error fetching authenticated user: ", err);
        throw err;
    }
}

export {signUp, login, signOut, refreshAuthToken, getAuthenticatedtUser};