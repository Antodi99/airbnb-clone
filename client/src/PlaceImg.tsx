import { Place } from "./pages/PlacesPage";

type PlaceImg = {
    place: Place
    index: number
    className: string
}

export default function PlaceImg({ place, index = 0, className = '' }: PlaceImg) {
    if (!place.photos?.length) {
        return ''
    }

    if (className === '') {
        className = 'w-full h-full spect-square object-cove'
    }

    return (
        <img className={className} src={'http://localhost:4000/uploads/' + place.photos[index]} />
    )
}
