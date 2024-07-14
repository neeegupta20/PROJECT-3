import { Header } from "./Header";
import { Outlet } from 'react-router-dom'

export function Layout(){
    return(
        <div className="py-4 px-4 flex flex-col min-h-screen">
            <Header/>
            <Outlet/>
        </div>
    )
}