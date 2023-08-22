import { useEffect, useState } from "react"
import Perks from "../Perks"
import PhotosUploader from "../PhotosUploader"
import axios from "axios"
import AccountNav from "../AccountNav"
import { Navigate, useParams } from "react-router-dom"

export default function PlacesFormPage() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState<string[]>([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState<string[]>([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/places/' + id).then(resp => {
            const { data } = resp
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })
    }, [id])

    function inputHeader(text: string) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    function inputDescription(text: string) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header: string, description: string) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        }

        if (id) {
            await axios.put('/places', { id, ...placeData })
            setRedirect(true)
        } else {
            await axios.post('/places', placeData)
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for you place. Should be short and catchy as in advertisement')}
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title, for example: My lovely apt' />
                {preInput('Address', 'Address of this place')}
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='address' />
                {preInput('Photos', 'Photos of this place')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Description of this place')}
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                {preInput('Perks', 'Select all the perks of your place')}
                <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra info', 'House rules, etc')}
                <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
                {preInput('Check in&out times', 'Add check in and out times, remember to have some time for cleaning the room between guests')}
                <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type='text'
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)} placeholder='14' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type='text'
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)} placeholder='11' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type='number'
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.valueAsNumber)} />
                    </div>
                </div>
                <div>
                    <button className='primary my-4'>Save</button>
                </div>
            </form>
        </div>
    )
}
