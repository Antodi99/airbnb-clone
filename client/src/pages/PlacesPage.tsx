import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';

export type Place = {
  _id: string;
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

export default function PlacesPage() {
  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data)
    })
  }, [])
  
  return (
    <div className='px-8 max-w-5xl'>
      <AccountNav />
      <div className='text-center'>
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className='mt-4'>
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/' + place._id} className='flex mt-4 cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
            <div className='flex w-32 h-32 bg-gray-300 grow shrink-0'>
              <PlaceImg place={place} className={''} index={0} />
            </div>
            <div className='grow-0 shrink'>
              <h2 className='text-xl'>{place?.title}</h2>
              <p className='text-sm mt-2'>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
