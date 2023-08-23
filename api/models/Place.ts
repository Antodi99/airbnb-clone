import mongoose from 'mongoose'
const { Schema } = mongoose

type Place = {
    owner: string,
    title: string,
    address: string,
    photos: string[],
    description: string,
    perks: string[],
    extraInfo: string,
    checkIn: number,
    checkOut: number,
    maxGuests: number,
    price: number
}

const placeSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number
})

export const PlaceModel = mongoose.model<Place>('Place', placeSchema)
