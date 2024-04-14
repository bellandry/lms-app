import Link from "next/link"

const Logo = () => {
  return (
    <div>
      <Link 
        className="text-md bg-gray-900 rounded-md p-1 font-semibold flex items-center justify-center"
        href="/">
        <span className="text-white mx-2">Laclass</span>
        <span className="bg-white rounded w-12 h-8 items-center flex justify-center text-gray-950">Learn</span>
      </Link>
    </div>
  )
}

export default Logo