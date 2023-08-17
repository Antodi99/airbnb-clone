import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

export default function AccountPage() {
    const { user, setUser, ready } = useContext(UserContext)

    const navigate = useNavigate()

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }

    if (!ready) {
        return 'Loading...'
    }

    async function logout() {
        await axios.post('/logout')
        navigate('/')
        setUser(undefined)
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    function linkClasses(type: string) {
        let classes = 'py-2 px-6'
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full'
        }
        return classes
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user?.name} ({user?.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}
