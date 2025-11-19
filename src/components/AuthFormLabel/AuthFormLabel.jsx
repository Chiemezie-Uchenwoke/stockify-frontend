const AuthFormLabel = ({children, htmlFor}) => {
    return (
        <label 
            htmlFor={htmlFor}
            className="sign-in-form-label"
        >
            {children}
        </label>
    )
}

export default AuthFormLabel