import mongoose from 'mongoose'
const { Schema } = mongoose

type Booking = {
    place: string,
    checkIn: string,
    checkOut: string,
    numberOfGuests: number,
    name: string,
    phone: string,
    price: number
}

const bookingSchema = new Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    price: Number
})

export const BookingModel = mongoose.model<Booking>('Booking', bookingSchema)
