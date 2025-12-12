const AuthTextInput = ({id, type="text", placeholder, value, onChange, onBlur}) => {

    return (
        <input 
            type={type}
            placeholder={placeholder} 
            className="batchFormInput"
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
};

export default AuthTextInput;