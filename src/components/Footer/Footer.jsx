import { FaRegCopyright } from "react-icons/fa6";
import useThemeStore from "../../stores/ThemeStore";
import Logo from "../Logo/Logo";
import FooterLink from "./FooterLink";
import footerLinkData from "../../data/footerLinkData";

const Footer = () => {
    const {theme} = useThemeStore();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${theme === "dark" ? "dark" : ""} bg-dark-bg py-18`}>
            <div className="container text-white flex flex-col gap-8 items-center md:flex-row md:justify-between">
                <div className="flex flex-col items-center gap-3 md:items-start">
                    <Logo 
                        iconWidth={2} 
                        iconHeight={2} 
                        iconSize={1.1} 
                        logoTextSize={1}
                    />

                    <p className="text-white-shade/60 text-sm">
                        Inventory and profit tracking for modern businesses.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <ul className="flex items-center gap-3 text-sm ">
                        {
                            footerLinkData.map((l) => {
                                return (
                                    <FooterLink 
                                        key={l.id}
                                        {...l}
                                    />
                                )
                            })
                        }
                    </ul>

                    <p className="flex items-center gap-2 text-sm text-white-shade/60">
                        <FaRegCopyright /> {currentYear} Stockify. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;