import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetInfo, search } from "../reducer/actions"
import { FaSearch } from 'react-icons/fa'
import logo from '../dog.png'
import './Style/NavBar.css'

export default function CardDog() {

    const [input, setInput] = useState('');
    const history = useHistory()
    const dispatch = useDispatch()

    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleClick() {
        dispatch(resetInfo())
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(resetInfo())
        dispatch(search(input))
        setInput("")
        history.push("/home")
    }

    return (
        <div className="navBar">
            <Link to="/home"
                onClick={handleClick}
                className="logo"
            >
                <img
                    src={logo}
                    alt="Logo"
                />
            </Link>
            <ul className="nav">
                <li>
                    <Link 
                    to="/home" 
                    onClick={handleClick}
                    className="nav-link"
                    > Home </Link>
                    <Link 
                    to="/createdog"
                    className="nav-link"
                    > Create Dog </Link>
                </li>
            </ul>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="  Search . . ."
                    className="nav-s"
                />
                <button type="submit" className="nav-bs"> <FaSearch /></button>
            </form>
        </div>
    )
}

