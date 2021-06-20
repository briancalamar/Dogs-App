import './Style/NavBar.css'
import { connect } from "react-redux"
import { resetInfo, search } from "../reducer/actions"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FaSearch } from 'react-icons/fa'

function CardDog({ search, resetInfo }) {
    const [input, setInput] = useState('');
    const history = useHistory()


    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleClick() {
        resetInfo()
    }

    function handleSubmit(e) {
        e.preventDefault();
        resetInfo()
        search(input)
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
                    src="/home/brian/Documentos/Henry/PI-Dogs-FT13/dog.png"
                    alt="Logo"
                />
                {/* <h2> Dogs App </h2> */}
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

function mapDispatchToProps(dispatch) {
    return {
        search: (name) => dispatch(search(name)),
        resetInfo: () => dispatch(resetInfo())
    }
}

export default connect(null, mapDispatchToProps)(CardDog)

