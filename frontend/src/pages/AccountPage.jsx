import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link,Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "./AccountNav.jsx";
export default function AccountPage(){
    const [isloggedout,Setisloggedout]=useState(null);
    const {ready,user,setUser}=useContext(UserContext)
    let {subpage}=useParams();
    
    if(subpage===undefined){
        subpage='profile'
    }

    async function logout(){
        await axios.post('http://localhost:3000/logout')
        Setisloggedout('/')
        setUser(null);
    }
    
    if(!ready){
        return(
            <div>Loading...</div>
        )
    }

    if(ready&&!user&&!isloggedout){
        return(
            <Navigate to={'/login'}/>
        )
    }
    if(isloggedout){
        return(
            <Navigate to={isloggedout}/>
        )
     }
    return(
        <div>
            <AccountNav/>
            {subpage==='profile' && (
            <div className="text-center mx-auto max-w-lg">
                Logged in as {user.name}
                <button  onClick={logout} className="primary mt-4 max-w-sm">
                    Logout
                </button>
            </div>
            )}
            {subpage==='accommodations'&&(
                <div>
                    <PlacesPage/>
                </div>
            )} 
        </div>
    )
}