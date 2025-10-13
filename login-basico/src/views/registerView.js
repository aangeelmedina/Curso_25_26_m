
export function renderRegister(){
    return `
        <form id="registerForm">
            <label>Username:</label>
            <input type="text" name="usernameRegister" required></input>
            <label>Password:</label>
            <input type="password" name="passwordRegister" required></input>
            <button type="submit">register</button>
        </form>

        <p id="mensajeRegister"></p>
    `
}
