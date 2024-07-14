import { useEffect, useState } from "react";
import Perks from "./PerksLabel.jsx";
import PhotoUploader from "./PhotosUploader.jsx";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav.jsx";

export default function PlaceForm(){

    const [title,setTitle]=useState('')
    const [address,setAddress]=useState('')
    const [description,setDescription]=useState([])
    const [presentPhotos,setPresentPhotos]=useState([])
    const [perks,setPerks]=useState([])
    const [checkin,Setcheckin]=useState('')
    const [checkout,Setcheckout]=useState('')
    const [maxguest,Setmaxguest]=useState(1)
    const [price,SetPrice]=useState(0)
    const [redirect,SetRedirect]=useState(false)
    const {id}=useParams();

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('http://localhost:3000/places/'+id,{withCredentials:true}).then(response=>{
            const {data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setDescription(data.description);
            setPerks(data.perks);
            Setcheckin(data.checkin);
            Setcheckout(data.checkout)
            Setmaxguest(data.maxguest)
            setPresentPhotos(data.photos)
            SetPrice(data.price)
        })

    },[id])


    async function savePlace(ev){
        ev.preventDefault();
        
        const data={title,address,
            description,presentPhotos,
            perks,checkin,
            checkout,maxguest,price}

        if(id){
            await axios.put('http://localhost:3000/newaccommodation',{id,...data},{withCredentials:true});
            SetRedirect(true);
        } else{
            await axios.post('http://localhost:3000/newaccommodation',data,{withCredentials:true});
            SetRedirect(true);
        }
    }
    
    if(redirect){
        return <Navigate to={'/your-account/accommodations'}/>
    }
    
    return(
        <>
            <AccountNav/>
            <form onSubmit={savePlace}>
            <h2 className="m-2 text-md">
                A SHORT AND CATCHY TITLE FOR YOUR PLACE
            </h2>
            <input value={title} onChange={ev=>setTitle(ev.target.value)} className="m-2" type='text' placeholder="A TITLE FOR YOUR PLACE"></input>
            <h2 className="m-2 text-md">
                COMPLETE ADDRESS
            </h2>
            <input value={address} onChange={ev=>setAddress(ev.target.value)} className="m-2" type='text' placeholder="ADDRESS"></input>
            <h2 className="m-2 text-md">
                ADD ATTRACTIVE PHOTOS
             </h2>
             <div className="mb-8">
                <PhotoUploader presentPhotos={presentPhotos} onChange={setPresentPhotos}/>
             </div>
            <h2 className="m-2 text-md">
                DESCRIPTION OF YOUR PLACE
            </h2>
            <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
            <h2 className="m-2 text-md">
                PERKS
            </h2>
            <Perks selected={perks} onChange={setPerks}/>
            <h2 className="m-2 text-md">
                CHECK-IN AND CHECK-OUT TIME
            </h2>
            <div className="inline-flex">
                <input value={checkin} onChange={ev=>Setcheckin(ev.target.value)} className="m-2" type='text' placeholder="CHECK-IN 14:00"></input>
                <input value={checkout} onChange={ev=>Setcheckout(ev.target.value)} className="m-2" type='text' placeholder="CHECK-OUT 12:00"></input>
            </div>
            <h2 className="p-2">
                MAXIMUM GUESTS
            </h2>
            <input value={maxguest} onChange={ev=>Setmaxguest(ev.target.value)} className="p-2" type="number"></input>
            <h2 className="m-2 text-md">
                PRICE PER NIGHT
            </h2>
            <input value={price} onChange={ev=>SetPrice(ev.target.value)} className="m-2" type="number" placeholder="₹ ₹ ₹"></input>
            <div className="flex justify-center">
            <button className="mt-4 mb-2 flex bg-primary rounded-xl p-3">
                    SUBMIT
                </button>
            </div>
        </form>
        </>
    )
}