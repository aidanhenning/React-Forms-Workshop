import { useState } from "react";

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        // Validate the form inputs
        if (username.length < 8) {
            setValidationError("Username must be at least 8 characters long.");
            return;
        }
        
        // Clear the validation error if the input is valid
        setValidationError(null);
        
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            setToken(result.token);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            {validationError && <p style={{ color: "red" }}>{validationError}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Username: <br /><input value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: <br /><input value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button style={{color: 'white'}}>Submit</button>
            </form>
        </div>
    )
}