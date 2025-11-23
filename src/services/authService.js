
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

    } catch(err) {
        console.error("Error logging out: ", err);
        throw err;
    }
}

export {signUp, login, signOut};