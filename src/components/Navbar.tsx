import { NavLink } from "react-router";


export default function Navbar() {
    const linkClass = ({ isActive } : {isActive: boolean}) =>
        isActive ? "text-cyan-950 underline" : "";

    return (
        <nav className="min-h-[80px] flex gap-4 text-2xl items-center justify-start pl-4 border-b border-gray-900">
                <NavLink className={linkClass} to="/">Home</NavLink>
                <NavLink className={linkClass} to="/create">Create</NavLink>
                <NavLink className={linkClass} to="/search">Search</NavLink>
                <NavLink className={linkClass} to="/history">History</NavLink>
        </nav>
    )
}