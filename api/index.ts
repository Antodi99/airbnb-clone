import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import imageDownloader from 'image-downloader'
import { UserModel } from './models/User'
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'gasdasfdsfgdfkgodf'
const dbConnectionString = "mongodb://admin:secret@localhost:27017/airbnb_clone";

async function main() {
    app.use(express.json());
    app.use(cookieParser())
    app.use('/uploads', express.static(__dirname + '/uploads'))
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:5173',
    }))

    await mongoose.connect(dbConnectionString)
    console.log('Connected to DB')

    app.post('/register', async (req, res) => {
        const { name, email, password } = req.body
        try {
            const userDoc = await UserModel.create({
                name,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
            })
            res.status(200).json(userDoc)
        } catch (e) {
            res.status(422).json(e)
        }
    })

    app.post('/login', async (req, res) => {
        const { email, password } = req.body
        const userDoc = await UserModel.findOne({ email })
        if (!userDoc) {
            return res.status(404).json({ message: 'Not Found' })
        }

        const passOk = bcrypt.compareSync(password, userDoc.password!)
        if (!passOk) {
            return res.status(422).json({ message: 'Incorrect Password' })
        }

        jwt.sign({
            email: userDoc.email,
            id: userDoc._id,
        }, jwtSecret, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json(userDoc)
        })
    }
    )

    app.get('/profile', (req, res) => {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const user = await UserModel.findById((userData as any)?.id)
            if (!user) {
                return res.status(404).json({ message: 'Not Found' })
            }
            res.json({ id: user.id, email: user.email, name: user.name })
        })
    })

    app.post('/logout', (req, res) => {
        res.cookie('token', '').status(204).send()
    })

    app.post('/upload-by-link', async (req, res) => {
        const { link } = req.body
        const newName = 'photo' + Date.now() + '.jpg'

        await imageDownloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName
        })
        res.json(newName)
    })

    app.listen(4000)
}

main()
