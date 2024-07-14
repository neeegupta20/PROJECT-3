import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import ReservePlaceWidget from "./ReservePlaceWidget";
import PlaceInfoWidget from "./PlaceInfoWidget";

export default function PlacePage(){
    
    const{id}=useParams();
    const [place,SetPlace]=useState({});
    const [seeAllPhotos,SetseeAllPhotos]=useState(false);
    const [host,SetHost]=useState({});
    
    useEffect(()=>{
        axios.get('http://localhost:3000/loadplace/'+id).then(response=>{
            axios.get('http://localhost:3000/hostname/'+response.data.owner).then(response1=>{
            SetHost(response1.data)
            })
            SetPlace(response.data)
        })
    },[id])


    if(seeAllPhotos){
        return(
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-24 gap-4 grid">
                    <div>
                        <button onClick={()=>SetseeAllPhotos(false)} className="fixed bg-gray-300 flex gap-2 shadow-black shadow-md rounded-xl p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            Back to Accommodation
                        </button>
                    </div>
                    {place?.photos?.length>0 && place.photos.map(photo=>(
                        <div>
                            <img src={"http://localhost:3000/uploads/"+photo}></img>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return(
        <div className="mt-8 mb-8 bg-gray-100 p-4">
            <h1 className="text-2xl ">{place.title}</h1>
            <div className="mt-2 inline-flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <a target="_blank" href={'http://maps.google.com/?q='+place.address} className="text-xs block my-2 font-semibold underline">{place.address}</a>
            </div>
            <div className="relative">
                <div className="mt-4 gap-2 grid grid-cols-[2fr_1fr]">
                    <div>
                        {place.photos?.[0]&&(
                            <img className="rounded-2xl" src={'http://localhost:3000/uploads/'+place.photos[0]}></img>
                        )}
                    </div>
                    <div className="grid gap-2">
                        {place.photos?.[1]&&(
                        <img className="rounded-2xl" src={'http://localhost:3000/uploads/'+place.photos[1]}></img>
                        )}
                        {place.photos?.[2]&&(
                        <img className="rounded-2xl" src={'http://localhost:3000/uploads/'+place.photos[2]}></img>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 absolute bg-white shadow-gray-400 shadow-lg shadow-inner rounded-xl p-2 bottom-2 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <button onClick={()=>SetseeAllPhotos(true)}>Show More Photos</button>
                </div>
            </div>
            <p className="text-lg sm:font-serif my-8 mx-4">{place.description}</p>
            <div className="mt-4 grid grid-cols-[1fr_1.3fr] gap-4">
                <div>
                    <PlaceInfoWidget place={place} host={host}/>
                    <h3 className="text-sm bg-gray-300 px-4 py-2 border m-2 ">For More Info Contact Host at {host.email}</h3>
                </div>  
                <div>
                    <ReservePlaceWidget place={place}/>
                </div>            
            </div>
            <div>
                
            </div>
        </div>
    )
}