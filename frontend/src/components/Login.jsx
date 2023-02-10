function Login() {
    return (
    <form action="" className="flex flex-col">
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
    </form> );
}

export default Login;