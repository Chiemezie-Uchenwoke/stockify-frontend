import { useEffect } from "react";

const AlertMessage = ({type, title, message, onClose}) => {

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => onClose(), 3000);

            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    const styles = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-blue-500 text-white",
    }


    return (
        <div 
            className={`w-[95%] max-w-70 mx-auto transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-16 md:left-auto md:translate-0 md:top-auto md:right-4 md:bottom-4 ${styles[type]} py-8 px-4 rounded-2xl shadow-lg z-20 flex flex-col gap-2 ${message ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} `}
        >
            {
                title && 
                <h2 className="font-bold">
                    {title}
                </h2>
            }

            <p className="text-sm">
                {message}
            </p>
        </div>
    )
};

export default AlertMessage;