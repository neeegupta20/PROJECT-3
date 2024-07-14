import { useState } from 'react'
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom'
export function RegisterPage(){
    
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [redirect,setRedirect]=useState(false);

    async function registerUser(ev){
        ev.preventDefault();
        await axios.post('http://localhost:3000/register',{
            name,email,password
        });
        alert("REGISTERATION SUCCESSFUL.")
        setRedirect(true)
    }
    if(redirect){
        return <Navigate to={'/login'}/>
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32 border rounded-md p-10">
                <h1 className="text-4xl text-center p-5">REGISTER</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input className="shadow-md shadow-300 py-1" type="text" placeholder="NAME"
                        value={name} onChange={ev=>setName(ev.target.value)}/>
                    <input className="shadow-md shadow-300 py-1" type="email" placeholder="EMAIL ADDRESS"
                     value={email} onChange={ev=>setEmail(ev.target.value)}/>
                    <input className="shadow-md shadow-300 py-1" type="password" placeholder="PASSWORD"
                     value={password} onChange={ev=>setPassword(ev.target.value)}/>
                    <button className="primary">Register</button>
                    <div className="py-3 text-center text-gray-500">
                        Already Registered? <Link to={'/login'} className="underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}