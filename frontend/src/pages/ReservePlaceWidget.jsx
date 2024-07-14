import { useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios"
import { Navigate } from 'react-router-dom'

export default function ReservePlaceWidget({place}){

    const [checkin,SetCheckin]=useState('')
    const [checkout,SetCheckout]=useState('')
    const [guest,SetGuest]=useState(1)
    const [bookerName,SetBookerName]=useState('')
    const [bookerNumber,SetBookerNumber]=useState('')
    const [redirect,SetRedirect]=useState(false);

    let numberOfNights=0;
    if(checkin && checkout){
        numberOfNights=differenceInCalendarDays(new Date(checkout),new Date(checkin))
    }

    async function MakeBooking(){
        const data={checkin,checkout,bookerName,bookerNumber,guest,
            place:place._id,
            price:numberOfNights*place.price}
        await axios.post('http://localhost:3000/book',data,{withCredentials:true})
        SetRedirect(true);
    }
    if(redirect){
        return <Navigate to={'/your-account/bookings/'}/>
    }

    return(
        <div className="border shadow-primary shadow-md shadow-inner bg-white p-2 ">
            <h1 className="text-center font-mono text-3xl p-2">₹ {place.price}</h1>
            <div className="flex gap-4 m-4">
                <div>
                    <h3 className="p-2">Check-IN Date</h3>
                    <input value={checkin} onChange={ev=>SetCheckin(ev.target.value)} type="date"></input>
                </div>
                <div>
                    <h3 className="p-2">Check-Out Date</h3>
                    <input value={checkout} onChange={ev=>SetCheckout(ev.target.value)} type="date"></input>
                </div>
                <div>
                    <h3 className="p-2">Max Guests</h3>
                    <input value={guest} onChange={ev=>SetGuest(ev.target.value)} type="number"></input>
                </div>
            </div>
            {numberOfNights>0 && (
                    <div className="p-2 flex gap-2">
                        <input value={bookerName} placeholder="Name" onChange={ev=>SetBookerName(ev.target.value)} type="text" ></input>
                        <input value={bookerNumber} placeholder="Phone Number" onChange={ev=>SetBookerNumber(ev.target.value)} type="tel" ></input>
                    </div>
                )}
            <button onClick={MakeBooking} className="primary my-2">
                Reserve
                {numberOfNights>0 && ( 
                    <span> for ₹ {numberOfNights*place.price}</span>
                )}
            </button>
        </div>
    )
}