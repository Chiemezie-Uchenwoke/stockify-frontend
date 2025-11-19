const AuthTextInput = ({id, type="text", placeholder, value, onChange}) => {
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            className="sign-in-form-input"
            id={id}
            value={value}
            onChange={onChange}
        />
    )
};

export default AuthTextInput;