import React from "react"
import { useState, useEffect } from "react"
import { login, register } from "../utils"
import '../App.css'
import { useNavigate } from "react-router-dom"
import { getCookie } from "../common"


const Login = (props) => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [loginResponse, setLoginResponse] = useState()
    const [registerResponse, setRegisterResponse] = useState()

    useEffect(() => {
        let cookie = getCookie("jwt-token")
        if (cookie !== false) {
            navigate('/')
        }
    })
    
    const loginHandler = async (event) => {
        event.preventDefault()
        setLoginResponse("Logging In...")
        console.log("ATTEMPTING LOGIN")
        let loginRes = await login(username, email, password)
        console.log("LOGIN CALL FINISHED")
        console.log(loginRes)
        if (loginRes?.message === "Success"){
            // console.log("before = ", props.userLoggedIn)
            // props.setUserLoggedIn(true)
            // console.log("after = ", props.userLoggedIn)
            // props.setUserLoggedIn(true)
            navigate('/')
            window.location.reload(false); //Reload page to refresh navbar
            
        } else {
            setLoginResponse("Login Failed", loginRes)
        }
    }

    const registerHandler = async (event) => {
        event.preventDefault()
        setRegisterResponse("Registering...")
        let registerRes = await register(username, email, password)
        if (registerRes.message === "Successfully registered"){
            setRegisterResponse(registerRes.message)
        } else if (registerRes === 'Validation error') {
            setRegisterResponse("This user already exists, please log in")
        } else {
            setRegisterResponse(registerRes)
        }
    }

    return (
        <div className="Home" style={{height: '100vh'}}>
            <div className="LoginBox">
                <h2>Login User</h2>
                <form onSubmit={loginHandler} className="LoginForm">
                    <label className="LoginLabel">Username</label><div>
                        <input onChange={(event) => setUsername(event.target.value)}  placeholder="Please Enter Username" className="Textbox" required></input>
                    </div>
                    
                    <label className="LoginLabel">Email</label>
                    <div>
                        <input onChange={(event) => setEmail(event.target.value)}  placeholder="Please Enter Email" className="Textbox" required ></input>
                    </div>
                   
                    <label className="LoginLabel">Password  </label>
                    <div>
                        <input type='password' onChange={(event) => setPassword(event.target.value)}   placeholder="Please Enter Password" className="Textbox" required></input>
                  </div>
             
                   
                    <button type='submit'>Login</button>
                    <p>{loginResponse}</p>
                </form>
                <br></br>
                
            </div>
            <div className="RegisterBox">
                <h2> Register User</h2>
                <form onSubmit={registerHandler} className="RegisterForm">
                    <label className="RegisterLabel">Username &nbsp;   </label>
                    <div>
                        <input onChange={(e) => {setUsername(e.target.value)}}  placeholder="Please Enter Username" className="Textbox" required></input>
                  </div>
                  
                    <label className="RegisterLabel">Email &nbsp; </label><div>
                        <input  onChange={(e) => {setEmail(e.target.value)}}   placeholder="Please Enter Email" className="Textbox" required></input>
                    </div>
                   
                    <label className="RegisterLabel">Password &nbsp;  </label>
                    <div>
                        <input type='password'  onChange={(e) => {setPassword(e.target.value)}}  placeholder="Please Enter Password" className="Textbox"  required></input>
                   </div>
               
                   
                    <button type='submit'>Register</button>
                    <p>{registerResponse}</p>
                </form>
                <br></br>
                
            </div>
        </div>
    )

}

export default Login