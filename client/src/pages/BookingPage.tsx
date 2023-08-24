import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Booking } from "./BookingsPage"
import AddressLink from "../AddressLink"
import PlaceGallery from "../PlaceGallery"
import BookingDate from "../BookingDate"

export default function BookingPage() {
    const { id } = useParams()
    const [booking, setBooking] = useState<Booking>()

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(resp => {
                const foundBooking = resp.data.find(({ _id }: Booking) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id])

    if (!booking) {
        return ''
    }

    return (
        <div className="my-8 px-8 max-w-5xl w-full">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block" place={booking.place} />
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">You booking information</h2>
                    <BookingDate booking={booking} className={''} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div >
    )
}
