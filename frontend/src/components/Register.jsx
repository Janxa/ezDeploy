function Register() {
    return (
    <form className="flex flex-col">
        <label for="username">Username: </label>
        <input type="text" name="username" id="username_input" />
        <label for="email">Email: </label>
        <input type="email" name="email" id="email_input" />
        <label for="password">Password: </label>
        <input type="password" name="password" id="password_input" />
    </form> );
}

export default Register;