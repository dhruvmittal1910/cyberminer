import React from "react"
import "./LoginPage.css"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function SignIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        console.log(data)
        // Here you can add your signin logic
        await axios.post("http://localhost:3333/signin", {
            data: data
        }).then((res) => {
            navigate("/admin")
            console.log(res)
        })
            .catch(err => console.log(err))

        // Reset the form
        setUsername('');
        setPassword('');


    };

    const redirectTo = () => {
        navigate("/login")
    }

    return (
        <div className="login-container">
            <form className="login-form" >
                <h2>Signin</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit} type="submit">Sign In</button>
                <p>If already have an account </p>
                <button onClick={redirectTo}>
                    Login
                </button>

            </form>
        </div>
    )
}

export default SignIn