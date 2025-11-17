import { Link } from "react-router";

const FooterLink = ({name, path}) => {
    return (
        <li className="text-white-shade/60 hover:text-white-shade/80 duration-200">
            <Link to={path}>
                {name}
            </Link>
        </li>
    )
};

export default FooterLink;