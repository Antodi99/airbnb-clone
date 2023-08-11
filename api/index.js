const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*',
}))

const url = "mongodb://admin:secret@localhost:27017/airbnb_clone";
mongoose.connect(url)
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.error(err)
    });

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.status(200).json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})

app.listen(4000)
