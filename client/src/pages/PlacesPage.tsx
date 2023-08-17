import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';

export default function PlacesPage() {
  const { action } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

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

  async function addPhotoByLink(e: { preventDefault: () => void; }) {
    e.preventDefault()
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
    setAddedPhotos((prev) => {
      return [...prev, filename]
    })
    setPhotoLink('')
  }


  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput('Title', 'Title for you place. Should be short and catchy as in advertisement')}
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title, for example: My lovely apt' />
            {preInput('Address', 'Address of this place')}
            <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='address' />
            {preInput('Photos', 'Photos of this place')}
            <div className='flex gap-2'>
              <input value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                type='text'
                placeholder={'Add using a link .jpg'} />
              <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid gap-2 grid-cols-3 md:rid-cols-4 lg:grid-cols-6'>
              {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div>
                  <img className='rounded-2xl' src={'http://localhost:4000/uploads/' + link} />
                </div>
              ))}
              <button className='flex items-center justify-center gap-1 border bg-transparent rounded-2xl p- text-2xl text-gray-600'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
              </button>
            </div>
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
      )}
    </div>
  )
}
