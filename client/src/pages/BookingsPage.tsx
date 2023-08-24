import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Place } from "./PlacesPage";
import { Link } from "react-router-dom";
import BookingDate from "../BookingDate";

export type Booking = {
  _id: string;
  place: Place,
  user: string,
  checkIn: string,
  checkOut: string,
  numberOfGuests: number,
  name: string,
  phone: string,
  price: number
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    axios.get('/bookings').then(resp => {
      setBookings(resp.data)
    })
  }, [])

  return (
    <div className="px-8 max-w-5xl w-full">
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
            <div className="w-48">
              <PlaceImg place={booking.place} index={0} className={""} />
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{booking.place.title}</h2>
              <div className="text-lg">
                <BookingDate booking={booking} className={'text-gray-500 mb-2 mt-2'} />
                <div className="flex gap-1 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  Total price: ${booking.price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
