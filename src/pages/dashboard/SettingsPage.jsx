import { useEffect, useState } from "react";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { FiMoon } from "react-icons/fi";
import { PiSunLight } from "react-icons/pi";
import { updateProfileName } from "../../services/authService";
import useAuthStore from "../../stores/authStore";
import useThemeStore from "../../stores/ThemeStore";

const SettingsPage = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { user, fetchCurrentUser } = useAuthStore();
    const [fullname, setFullname] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });

    useEffect(() => {
        setFullname(user?.fullname || "");
    }, [user]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ type: "", title: "", message: "" });

        const response = await updateProfileName(fullname.trim());
        if (!response.success) {
            setAlert({
                type: "error",
                title: "Settings",
                message: response.message,
            });
            setLoading(false);
            return;
        }

        await fetchCurrentUser();
        setAlert({
            type: "success",
            title: "Settings",
            message: response.message || "Profile updated successfully.",
        });
        setLoading(false);
    };

    return (
        <section className={`${theme === "dark" ? "dark" : ""} flex flex-col gap-6`}>
            <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4">
                <h2 className="text-base font-semibold text-black/90 dark:text-white-shade">Account</h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-black/10 dark:border-white-shade/10 p-3">
                        <p className="text-black/60 dark:text-white-shade/70">Email</p>
                        <p className="mt-1 text-black/90 dark:text-white-shade break-all">{user?.email || "N/A"}</p>
                    </div>
                    <div className="rounded-lg border border-black/10 dark:border-white-shade/10 p-3">
                        <p className="text-black/60 dark:text-white-shade/70">Role</p>
                        <p className="mt-1 text-black/90 dark:text-white-shade">{user?.role || "User"}</p>
                    </div>
                </div>
            </article>

            <form onSubmit={handleProfileUpdate} className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 flex flex-col gap-3">
                <h2 className="text-base font-semibold text-black/90 dark:text-white-shade">Profile</h2>
                <label className="text-xs text-black/60 dark:text-white-shade/70">Full Name</label>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="border border-black/15 dark:border-white-shade/20 rounded-lg px-3 py-2 text-sm dark:text-white-shade outline-none"
                    placeholder="Enter your full name"
                    required
                />
                <button type="submit" disabled={loading} className="w-fit rounded-lg bg-pri-col hover:bg-pri-hover text-white-shade text-sm font-medium px-4 py-2 disabled:bg-pri-col/50 cursor-pointer">
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>

            <article className="rounded-xl border border-black/10 dark:border-white-shade/10 bg-light-surface dark:bg-dark-surface p-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-semibold text-black/90 dark:text-white-shade">Appearance</h2>
                    <p className="text-xs text-black/60 dark:text-white-shade/70 mt-1">Switch between light and dark mode.</p>
                </div>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="cursor-pointer select-none text-light-text-primary dark:text-white-shade text-xl "
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <PiSunLight /> : <FiMoon />}
                </button>
            </article>

            <AlertMessage
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={() => setAlert({ type: "", title: "", message: "" })}
            />
        </section>
    );
};

export default SettingsPage;
