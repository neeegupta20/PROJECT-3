import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import AccountNav from "./AccountNav.jsx";

export default function PlacesPage(){
    
    const [places,SetPlaces]=useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:3000/places',{withCredentials:true}).then(({data})=>{
            SetPlaces(data);
        })
    },[])
    
    return(
        
        <div>
            <AccountNav/>
            <div className="text-center">
                    <Link className={'inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full text-center'} to={'/your-account/accommodations/add'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        Add a New Accommodation
                    </Link>
            </div>
            <div className="mt-4">
                {places.length>0 && places.map(place=>(
                    <Link to={'/your-account/accommodations/'+place._id} className="relative cursor-pointer flex gap-4 bg-gray-200 p-4 rounded-2xl mt-8">
                        <div className="flex w-32 h-32 bg-gray-500 shrink-0">
                            {place.photos.length>0 &&(
                                <img src={'http://localhost:3000/uploads/'+place.photos[0]} alt="CANNOT DISPLAY"></img>
                            )}
                        </div>
                        <div className="mx-2">
                            <h1>{place.title}</h1>
                            <p className="mt-2 text-sm">{place.description}</p>
                            <div className="mt-8 flex gap-4">
                                <h3 className="bg-gray-400 p-2 rounded-xl">{place.address}</h3>
                                <h3 className="bg-primary p-2 rounded-xl absolute bottom-6 right-10">₹ {place.price}</h3>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
        </div>
    )
}