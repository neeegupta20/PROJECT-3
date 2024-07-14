import axios from "axios";
import { useContext, useState } from "react"
import {Navigate,Link} from "react-router-dom"
import { UserContext } from "../UserContext.jsx";
export default function LoginPage(){
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [redirect,setRedirect]=useState(false);
    const {setUser}=useContext(UserContext)
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        const response=await axios.post('http://localhost:3000/login',{email,password},{withCredentials:true})
        setUser(response.data)
        alert('LOGIN SUCCESSFUL.')
        setRedirect(true);
    };
    if(redirect){
        return <Navigate to={'/'}/>
    }
    
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32 border rounded-md p-10">
                <h1 className="text-4xl text-center p-5">SIGN IN</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input className="shadow-md shadow-300 py-1" type="email" 
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={ev=>setEmail(ev.target.value)}/>
                    <input className="shadow-md shadow-300 py-1" type="password" 
                    placeholder="PASSWORD"
                    value={password}
                    onChange={ev=>setPassword(ev.target.value)}/>
                    <button  className="primary">Login</button>
                    <div className="py-3 text-center text-gray-500">
                        Don't Have an Account? <Link to={'/register'} className="underline text-black">Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}