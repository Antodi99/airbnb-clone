import mongoose from 'mongoose'
const { Schema } = mongoose

type User = {
    name: string
    email: string
    password: string
    _id: string
}

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
})

export const UserModel = mongoose.model<User>('User', UserSchema)
