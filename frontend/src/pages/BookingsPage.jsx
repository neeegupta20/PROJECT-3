import { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";

export default function BookingsPage(){
    
    const [bookings,Setbookings]=useState({});

    useEffect(()=>{
        axios.get('http://localhost:3000/getbookings',{withCredentials:true}).then(response=>{
            Setbookings(response.data);
        })
    },[])

    return(
        <div>
            <AccountNav/>
            <div className="m-4">
                {bookings?.length>0 && bookings.map(booking=>(
                    <Link to={'/accommodation/'+booking.place._id} className="cursor-pointer flex gap-4 bg-gray-200 p-4 rounded-2xl mt-4 relative">
                        <div className="flex w-32 h-32 bg-gray-500 shrink-0">
                            {booking.place.photos.length>0 &&(
                                <img src={'http://localhost:3000/uploads/'+booking.place.photos[0]} alt="CANNOT DISPLAY"></img>
                            )}
                        </div>
                        <div className="mx-2">
                            <h1 className="text-xl m-2">{booking.place.title}</h1>
                            <div className="flex gap-2 my-3 mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                                </svg>
                                <h3 className="text-md">{format(new Date(booking.checkin),'dd-MM-yyyy')}</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                                </svg>
                                <h3 className="text:md">{format(new Date(booking.checkout),'dd-MM-yyyy')}</h3>
                            </div>
                            <div className="flex gap-2 my-4 mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                                <h3 className="text-md">{differenceInCalendarDays(new Date(booking.checkout),new Date(booking.checkin))} Nights</h3>
                            </div>
                            <h2 className="absolute text-lg bg-primary px-6 py-2 rounded-xl bottom-6 right-6">₹ {booking.price}</h2>
                        </div>
                        
                    </Link>
                ))}
                {bookings?.length===0 &&(
                    <div className="text-gray-500 text-2xl flex justify-center">
                        No Bookings Made Yet
                    </div>
                )}
            </div>
        </div>
    
    )
}