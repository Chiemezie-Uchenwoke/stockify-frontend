import useThemeStore from "../../../stores/ThemeStore";

const ProductsView = () => {
    const {theme} = useThemeStore();

    return (
        <div className={`${theme === "dark" ? "dark" : ""} `}>
            ffgghh
        </div>
    )
};

export default ProductsView;