import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage(){
    
    const [places,SetPlaces]=useState([]);
    useEffect(()=>{
      axios.get('http://localhost:3000/placesonhome').then(response=>{
        SetPlaces([...response.data]);
      })
    },[])
    return(
      <div className="mt-8 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 grid-rows-3">
        {places.length>0 && places.map(place=>(
          <Link to={'/accommodation/'+place._id} className="border-2 py-4 px-6 rounded-lg shadow-xl shadow-inner shadow-gray-300">
            <div className="bg-gray-500 mb-3 flex rounded-2xl">
              {place.photos?.[0] &&(
                <img className="rounded-2xl" src={'http://localhost:3000/uploads/'+place.photos[0]} alt="CANNOT DISPLAY"></img>
              )}
            </div>
            <h2 className="text-sm text-gray-500 truncate">{place.title}</h2>
            <h3 className="text-sm mt-2">{place.address}</h3>
            <h3 className="text-sm mt-2 font-bold">₹ {place.price} per night </h3>
          </Link>
        ))}
      </div>
    )
}