import { FiPackage } from "react-icons/fi";

const Logo = ({logoWidth, logoHeight, logoTextSize, logoSize}) => {
    return (
        <div className="flex items-center gap-2 cursor-pointer select-none">
            <div 
                className="h-auto bg-pri-col flex items-center justify-center rounded" 
                style={{width: `${logoWidth}rem`, height: `${logoHeight}rem`}}
            >
                <FiPackage style={{fontSize: `${logoSize}rem`}} />
            </div>

            <p 
                className="font-bold text-pri-col" 
                style={{fontSize: `${logoTextSize}rem`}}
            >
                Stockify
            </p>
        </div>
    )
}

export default Logo;