import React from "react"
import "./LoginPage.css"
import { useEffect, useState } from 'react';
import axios from "axios"
// import { useNavigate,Link } from "react-router-dom";
import { useLocation,useNavigate,Link } from 'react-router-dom';

function LoginPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can add your login logic
        const data={
            username:username,
            password:password
        }

        try{
            await axios.post("http://localhost:3333/login",{
                data:data
        }).then((res)=>{
            if(res.data=="Success"){
                navigate("/admin")
            }else{
                alert("Wrong Password")
            }
        }).catch(err=>{
            alert("wrong details")
            console.log(err)
        })

        }catch(e){
            console.log(e)
        }


        console.log('Username:', username);
        console.log('Password:', password);
        // Reset the form
        setUsername('');
        setPassword('');

    };
    const redirectTo=()=>{
        navigate("/signUp")
    }

    return (
        <div className="login-container">
            <form className="login-form" action="POST" >
                <h2>Login</h2>
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
                <button onClick={handleSubmit} type="submit">Login</button>
                <p>If dont have an account </p>
                <button onClick={redirectTo}>
                    SignUp
                </button>
                
            </form>
            

        </div>
    )
}

export default LoginPage