import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 font-bold">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com"></input>
          <input type="password" placeholder="password"></input>
          <button className="primary">Login</button>
          <div className="text-center py-2 ">Don't have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link></div>
        </form>
      </div>
    </div>
  )
}
