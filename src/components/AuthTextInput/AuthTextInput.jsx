const AuthTextInput = ({id, type="text", placeholder, value, onChange, onBlur}) => {

    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            className="sign-in-form-input"
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
};

export default AuthTextInput;