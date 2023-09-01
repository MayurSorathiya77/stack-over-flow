import React from 'react'
import { useState } from 'react';
import Googlelogo from './google-logo.png'
import Fackbooklogo from './facebook-logo.png'
import Githublogo from './github-logo.png'
import './CSS/index.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../../firebase'
import { useNavigate } from "react-router-dom"



function Index() {
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const history = useNavigate();

    const handleSignInGoogle = () =>{

        signInWithPopup(auth,provider).then((res)=>{
            
        })
    }
    const handleRegister = (e)=>{
        e.preventDefault();
        setError("")
        setLoading(true)
        if(email === "" || password === "" || username === "")
        {
            setError('Required field is missing')
            setLoading(false)
        }
        else
        {
            createUserWithEmailAndPassword(auth,email,password).then((res)=>{
                setLoading(false)
                history.push('/');
            }).catch((error)=>{
                console.log(error.code)
                setError(error.message)
                setLoading(false)
            })
        }
        
    }
    const handleSignIn = (e)=>{
        e.preventDefault();
        setError("")
        setLoading(true)
        if(email === "" || password === "" )
        {
            setError('Required field is missing')
            setLoading(false)
        }
        else
        {
            signInWithEmailAndPassword(auth,email,password).then((res)=>{
                console.log(res)
                history.push('/');
                setLoading(false)
            }).catch((error)=>{
                console.log(error.code)
                setError(error.message)
                setLoading(false)
            })
        }
        
    }
    return (
        <div className='auth'>
            <div className='auth-container'>
                <p>Add Another way to log in using any of the following services.</p>
                <div className='singn-options'>
                    <div  onClick={handleSignInGoogle} className='single-option'>
                    <img src={Googlelogo}/>
                        <p>Login with  Google</p>
                    </div>
                </div>

                <div className='singn-options'>
                    <div className='single-option'>
                    <img src={Fackbooklogo}/>
                        <p style={{fontSize : "14px"}}>Login with Fackbook</p>
                    </div>
                </div>
                <div className='singn-options'>
                    <div className='single-option'>
                    <img src={Githublogo}/>
                        <p>Login with Github</p>
                    </div>
                </div>
                <div className='auth-login '>
                    <div className='auth-login-container'>
                        {
                            register ? (<>

                                <div className='input-field'>

                                    <p>User Name</p>
                                    <input value={username} onChange={(e)=> setUsername(e.target.value)} type='text' />
                                    

                                </div>
                                <div className='input-field'>

                                    <p>Email</p>
                                    <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} />

                                </div>
                                <div className='input-field'>

                                    <p>Password </p>
                                    <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} />

                                </div>
                                <button className='register-button' onClick={handleRegister} disabled={loading}>{ loading ?"Register In...":"Registered"}</button>
                            </>)
                                :
                                (<>
                                    <div className='input-field'>

                                        <p>Email</p>
                                        <input type='text' value={email} onChange={(e)=> setEmail(e.target.value)}/>

                                    </div>
                                    <div className='input-field'>

                                        <p>Password </p>
                                        <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>

                                    </div>
                                    <button className='Login-button' onClick={handleSignIn} disabled={loading} >{ loading ?"Sigining In...":"Login"}</button>

                                </>)
                        } 

                        <p className='register-p' onClick={()=>setRegister(!register)}>{register?"Login":"Register"}</p>
                    </div>
                </div>
                {
                   error !== "" && (<p style={{color:"red" ,fontSize:"14px"}}>{error}</p>)
                }
            </div>

        </div>
    )
}

export default Index
